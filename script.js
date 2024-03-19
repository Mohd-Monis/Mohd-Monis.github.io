class Boid {
    x;
    y;
    r;
    vx;
    vy;
    boid;
    move() {
        let x_n = 0;
        let avg_x = 0;
        let y_n = 0;
        let avg_y = 0;
        let angle_sum = 0;
        let angle_n = 0;
        for (let nearby of Boid.neighbours) {
            if (Math.abs(nearby.x - this.x) <= this.r) {
                avg_x += (nearby.x - this.x);
                angle_sum+= nearby.angle;
                angle_n++;
                x_n++;
            } //cohesion
            console.log(Math.abs(nearby.x - this.x));
            if (Math.abs(nearby.x - this.x) <= (this.r / 2)) {
                if(Math.abs(nearby.x - this.x)){
                    avg_x -= (nearby.x - this.x) * (30);
                    x_n += 3;
                }

            } //repulsion
            if (Math.abs(nearby.y - this.y) <= this.r) {
                avg_y += nearby.y - this.y;
                angle_sum+= nearby.angle;
                angle_n++;
                y_n++;
            } //cohesion
            if (Math.abs(nearby.y - this.y) <= this.r / 2) {
                if(Math.abs(nearby.y - this.y)){
                    avg_y -= (nearby.y - this.y) *(30);
                    y_n += 3;

                }
            } //repulsion
        }
        let update_angle = angle_sum/angle_n;
        if(this.lead){
            this.angle+= 0.01;
        }
        this.angle = (this.angle*3 + update_angle)/4;//alignment
        this.ax /= 1.2;
        this.ay/=1.2;
        this.ax = Math.min(this.ax,4);
        this.ax += avg_x/(x_n*10)
        this.ay += avg_y/(y_n*10)
        if(this.ax < 0){
            this.ax = Math.max(this.ax,-4);
        }
        this.ay = Math.min(this.ay,4);
        if(this.ay < 0){
            this.ay = Math.max(this.ay,-4);
        }
        this.vx =  Math.min(Math.cos(this.angle)*4,2);
        if(this.vx < 0){
            this.vx = Math.max(this.vx,-2);
        }
        this.vy = Math.min(Math.sin(this.angle)*4,2);
        if(this.vy < 0){
            this.vy = Math.max(this.vy,-2);
        }
        this.vx += this.ax;
        this.vy += this.ay;
        this.x += this.vx;
        this.y += this.vy;
        if(this.x < -200) {
            this.x = 1370;
        }
        else if(this.x > 1400){
            this.x = -170;
        }
        if(this.y < -100) {
            this.y = 800;
        }
        else if(this.y > 870){
            this.y = -70;
        }
        this.boid.style.left = this.x + "px";
        this.boid.style.top = this.y + "px";
        setTimeout(() => {
            this.move();
        },20);
    }
    constructor(x, y, r, lead) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = 0;
        this.vy = 0;
        this.ax = 0;//accelaration vector
        this.ay = 0;//accelaration vector
        this.lead = lead
        this.angle = (Math.random()*314)% 4;
        Boid.neighbours.push(this);
        this.boid = document.createElement("div");
        let body = document.querySelector(".blackbox");
        body.appendChild(this.boid);
        this.boid.classList.add("boid");
        this.boid.style.position = "relative";
        this.boid.style.left = this.x + "px";
        this.boid.style.top = this.y + "px";
        this.move();
    }

}



Boid.neighbours = []
for(let j = 10; j <= 690; j+= 100){
    for(let i = 10; i <= 1200; i+= 100){
        if(j < 80 || j > 230){
            let boid =  new Boid(i+500,j,400,1)
        }
        else{
            console.log("lead");
            let boid = new Boid(i,j,400);
        }
    }

}
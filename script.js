class Boid {
    x;
    y;
    r;
    vx;
    vy;
    boid;
    move() {
        let avg_x = 0;
        let n = 0;
        let avg_y = 0;
        let angle_sum = 0;
        let angle_n = 0;
        for (let nearby of Boid.neighbours) {
            let dx = nearby.x - this.x;
            let dy = nearby.y - this.y;
            let dist = Math.sqrt(dx * dx + dy * dy);
            if (!dist) continue;
            if (dist <= this.r) {
                angle_sum += nearby.angle;
                angle_n++;//alignment

                // x_changes
                avg_x += (100 / dist) * (dx / dist);
                //y_changes
                avg_y += (100 / dist) * (dy /dist);
                n++;
            }//cohesion

            if (dist <= this.r / 1.6) {
                avg_x -= (1000/dist)*(1000/dist) * (dx / (dist));
                avg_y -= (10000 / dist)*(1000/dist)*(dy / (dist));
                n++;
            } //repulsion

        }
        if (this.lead) {
            this.angle += 0.01;
        }
        if(n){
            let update_angle = angle_sum / angle_n;
            
            this.angle = (this.angle + update_angle*3) / 4;//alignment
            this.ax += avg_x / (n)
            this.ay += avg_y / (n)
            this.ax = Math.min(this.ax, 3);
            if (this.ax < 0) {
                this.ax = Math.max(this.ax, -3);
            }
            this.ay = Math.min(this.ay, 3);
            if (this.ay < 0) {
                this.ay = Math.max(this.ay, -3);
            }
        }
        this.vx = Math.min(Math.sin(this.angle) * 4, 2);
        if (this.vx < 0) {
            this.vx = Math.max(this.vx, -2);
        }
        this.vy = Math.min(Math.cos(this.angle) * 4, 2);
        if (this.vy < 0) {
            this.vy = Math.max(this.vy, -2);
        }
        this.vx += this.ax;
        this.vy += this.ay;
        if(this.vx > 4) this.vx = 4;
        if(this.vx < -4) this.vx = -4;
        if(this.vy > 4) this.vy= 4;
        if(this.vy< -4) this.vy = -4;
        console.log(this.vx);
        if(this.vx == 0) this.vx = 1;
        this.boid.style.transform = "rotate(" + 50*Math.atan(this.vy/this.vx) + "deg)";
        this.x += this.vx;
        this.y += this.vy;
        // if(this.x < 0 || this.x > 1200 || this.y < 0 || this.y > 700){
        //     this.boid.style.display = "none";
        //     // let boid = new Boid(10,Math.random()*1000,this.r,this.lead);
        // }
        // this.boid.style.display = "none"
        // if(this.x > 800){
        //     this.boid.style.display = "none";
        // }
        // if(this.y > 500){
        //     this.boid.style.display = "none";
        // }
        if (this.x < -10) {
            this.x = 1000;
        }
        else if (this.x > 1030) {
            this.x = 0;
        }
        if (this.y < -10) {
            this.y = 600;
        }
        else if (this.y > 630) {
            this.y = 0;
        }
        this.boid.style.left = this.x + "px";
        this.boid.style.top = this.y + "px";
        setTimeout(() => {
            this.move();
        }, 1);
    }
    constructor(x, y, r, lead) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.vx = Math.random()*2;
        this.vy = Math.random()*2;
        this.ax = 0;//accelaration vector
        this.ay = 0;//accelaration vector
        this.lead = lead
        this.angle = (Math.random() * 314);
        Boid.neighbours.push(this);
        this.boid = document.createElement("div");
        let body = document.querySelector(".blackbox");
        body.appendChild(this.boid);
        this.boid.classList.add("boid");
        this.boid.style.position = "relative";
        this.boid.style.left = this.x + "px";
        this.boid.style.top = this.y + "px";
        let colors = ["red","blue","violet","pink","green"];
        let ix = Math.floor(Math.random()*colors.length);
        this.boid.classList.add(colors[ix]);
        this.move();
    }

}

Boid.neighbours = []
for(let j = 10; j <= 600; j+= 40){
    for(let i = 10; i <= 1000; i+= 40){
        if(j < 80 || j > 230){
            let boid =  new Boid(i,j,80)
        }
        else{
            console.log("lead");
            let boid = new Boid(i,j,100,1);
        }
    }

}
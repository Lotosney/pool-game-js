const BALL_ORIGIN =new Vector2(25,25);
const BALL_DIAMETER=38;

function Ball(position, color){
    this.position = position;
    this.velocity = new Vector2();
    this.moving = false;
    this.sprite = getBallSpriteByColor(color);
    this.visible = true;

}
Ball.prototype.update = function(delta){
    this.position.addTo(this.velocity.mult(delta));
    this.velocity=this.velocity.mult(0.98);

    if(this.velocity.length()<5){
        this.velocity=new Vector2();
        this.moving=false;
    }
}

Ball.prototype.draw = function(){
    Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN)
}
Ball.prototype.shoot=function(power, rotation){
    this.velocity=new Vector2(power*Math.cos(rotation), power* Math.sin(rotation))
    this.moving=true;
}

Ball.prototype.collideWith = function (ball) {
    //find a normal vector
    const normal = this.position.substract(ball.position);

    //find a distance
    const dist = normal.length();

    if (dist > BALL_DIAMETER) {
      return;
    }

    //find minimum translation distance
    const mtd = normal.mult((BALL_DIAMETER - dist)/dist);

    //push-pull the ball apart
    this.position = this.position.add(mtd.mult(1/2));
    ball.position = ball.position.substract(mtd.mult(1/2));

    //find unit normal vector
    const Unormal = normal.mult(1/normal.length());

    //find unit tangent vector
    const Utangent = new Vector2 (-Unormal.y , Unormal.x);

    //project velocities onto the unit normal and unit tangent vectors
    const v1n = Unormal.dot(this.velocity);
    const v1t = Utangent.dot(this.velocity);
    const v2n = Unormal.dot(ball.velocity);
    const v2t = Utangent.dot(ball.velocity);

    //find new normal velocity
    let v1nTag = v2n;
    let v2nTag = v1n;

    //convert the scalar normal and the tangential velocities into vectors
    v1nTag = Unormal.mult(v1nTag);
    const v1tTag = Utangent.mult(v1t);
    v2nTag = Unormal.mult(v2nTag);
    const v2tTag = Utangent.mult(v2t);

    //update the velocities
    this.velocity = v1nTag.add(v1tTag);
    ball.velocity = v2nTag.add(v2tTag);

    this.moving = true;
    ball.moving = true;

}





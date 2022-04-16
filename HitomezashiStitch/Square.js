class Square
{
  constructor(x, y, width, height)
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sides = [0, 0, 0, 0] //left top right bottom
    this.colour = false;
  }

  display()
  {
    let x = this.x * sWidth;
    let y = this.y * sHeight;
    
    noStroke();
    if (this.colour) {
      fill(100, 210, 100);
    } 
    else {
      fill(245, 120, 20);
    }
    rect(x, y, this.width, this.height);
    
    
    stroke(0);
    //fill(0);
    textSize(32);
    //text(this.x + "," + this.y, x + this.width / 4, y + this.height / 2);

    if (this.sides[0]) line(x, y, x, y + sHeight); // left
    if (this.sides[1]) line(x, y, x + sWidth, y); // top
    if (this.sides[2]) line(x + sWidth, y, x + sWidth, y + sWidth); // right
    if (this.sides[3]) line(x, y + sWidth, x + sWidth, y + sWidth); // bottom
  }
}
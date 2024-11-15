let bgColor = {
  r: Number,
  g: Number,
  b: Number,
};

let myCv;

function setup() {
  myCv = createCanvas(800, 800);
  bgColor.r = Math.round(random(255));
  bgColor.g = Math.round(random(255));
  bgColor.b = Math.round(random(255));
}

function draw() {
  background(bgColor.r, bgColor.g, bgColor.b);

  textSize(30);
  text(`Background Color: ${bgColor.r} ${bgColor.g} ${bgColor.b}`, 10, 50);
}

function keyPressed() {
  if (key === "d") {
    console.log("Canvas Saved!");
    let image64 = myCv.canvas.toDataURL();
    console.log(image64);

    socket.emit("image_save", image64);
  }
}

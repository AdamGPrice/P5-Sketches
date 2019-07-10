let nn;
let model;

let res = 25;
let cols;
let rows;

let xs;
let training = false;

const train_xs = tf.tensor2d([
  [0, 0],
  [1, 0],
  [0, 1],
  [1, 1]
]);

const train_ys = tf.tensor2d([
  [0],
  [1],
  [1],
  [0]
]);


function setup() {
  createCanvas(400, 400)
  //frameRate(30);
  cols = width / res;
  rows = height / res;

  //Create the input data
  let inputs = [];
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      inputs.push([x1, x2]);
    }
  }

  xs = tf.tensor2d(inputs);


  model = tf.sequential();
  //Create Hidden layer
  let hidden = tf.layers.dense({
    inputShape: [2],
    units: 4,
    activation: 'sigmoid'
  });
  //Create output layer
  let output = tf.layers.dense({
    units: 1,
    activation: 'sigmoid'
  });
  //ADD LAYERS TO MODEL
  model.add(hidden);
  model.add(output);

  const optimizer = tf.train.sgd(0.8);
  model.compile({
    optimizer: optimizer,
    loss: 'meanSquaredError'
  });

  //setTimeout(train, 1);
}


function train() {
  trainModel().then(result => {
    console.log(result.history.loss[0]);
    //setTimeout(trakn, 1);
    training = false;
  });
}

function trainModel() {
  return model.fit(train_xs, train_ys, {
    shuffle: true,
    epochs: 10
  });
}


function draw() {
  background(0);

  if (training != true) {
    training = true;
    train();
  }

  tf.tidy(() => {
    let ys = model.predict(xs)
    let y_values = ys.dataSync();

    let index = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        let br = y_values[index] * 255
        fill(br);
        rect(i * res, j * res, res, res);
        fill(255 - br);
        textAlign(CENTER, CENTER);
        text(nf(y_values[index], 1, 2), i * res + res / 2, j * res + res / 2)
        index++;
      }
    }
  });
}
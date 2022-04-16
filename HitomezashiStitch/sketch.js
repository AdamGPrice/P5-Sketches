const size = 20
let rows = size;
let cols = size;
let sWidth;
let sHeight;

let rowValues = [];
let colValues = [];

let squares = [];

function setup() {
    createCanvas(800, 800);
    background(200);
    fill(0);

    sWidth = width / cols;
    sHeight = height / rows;

    for (i = 0; i < rows; i++)
    {
        rowValues.push(Math.floor(Math.random() * 2));    
    }

    for (i = 0; i < cols; i++)
    {
        colValues.push(Math.floor(Math.random() * 2));    
    }

    for (i = 0; i < cols; i++)
    {
        squares[i] = [];
        for (j = 0; j < rows; j++)
        {
            squares[i][j] = new Square(i, j, sWidth, sHeight);
        }
    }

    for (i = 1; i < rows; i++)
    {
        startIndex = rowValues[i];

        for (j = startIndex; j < cols; j +=2)
        {
            //console.log(i, j);
            squares[i][j].sides[0] = 1;
            squares[i - 1][j].sides[2] = 1;
        }
    }

    //console.log("==============");

    for (j = 1; j < cols; j++)
    {
        startIndex = colValues[j];

        for (i = startIndex; i < rows; i +=2)
        {
            //console.log(i, j);
            squares[i][j].sides[1] = 1;
            squares[i][j - 1].sides[3] = 1;
        }
    }

    let nextColour = true;
    for (j = 0; j < rows; j++)
    {
        for (i = 0; i < cols; i++)
        {
            //console.log(i, j);
            let square = squares[i][j];
            if (i == 0 && j >= 1)
            {
                //console.log(squares[i][j - 1]);
                if (squares[i][j - 1].sides[3]) {
                    nextColour = !squares[i][j - 1].colour;
                }
                else {
                    nextColour = squares[i][j - 1].colour;
                }
            }
            square.colour = nextColour;

            if (square.sides[2]) {
                nextColour = !nextColour;
            }
        }
    }

    for (i = 0; i < cols; i++)
    {
        for (j = 0; j < rows; j++)
        {
            let square = squares[i][j];
            square.display();

        }
    }
    //console.log(squares);
}

function draw() {

    /*
    for (i = 1; i < rows; i++)
    {
        startIndex = rowValues[i];

        for (j = startIndex; j < cols; j+=2)
        {
            let x = j * sWidth;
            let y = i * sHeight;
            line(x, y, x + sWidth, y);
        }
    }

    for (i = 1; i < cols; i++)
    {
        startIndex = colValues[i];

        for (j = startIndex; j < cols; j+=2)
        {
            let x = i * sWidth;
            let y = j * sHeight;
            line(x, y, x, y + sHeight);
        }
    }
    */
}
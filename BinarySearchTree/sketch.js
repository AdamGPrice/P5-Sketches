let tree

function setup() 
{
  createCanvas(800, 800);
  tree = new Tree();
  for (let i = 0; i < 10; i++) 
  {
      tree.insert(floor(random(0,50)));
  }
  console.log(tree);
  tree.traverse();

  console.log(tree.search(10));
}
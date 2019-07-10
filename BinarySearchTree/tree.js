class Tree {
    constructor() 
    {
        this.root = null;
    }

    insert(val) 
    {
        let node = new Node(val);
        if (this.root == null) 
        {
            this.root = node;
        } 
        else 
        {
            this.root.add(node);
        }
    }

    traverse()
    {
        this.root.visit();
    }

    search(val)
    {
        return this.root.search(val);
    }
}
class Node {
    constructor(value) 
    {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    add(node) 
    {
        if (node.value < this.value) 
        {
            if (this.left == null) 
            {
                this.left = node;
            } 
            else 
            {
                this.left.add(node);
            }
        } 
        else 
        {
            if (this.right == null) 
            {
                this.right = node;
            } 
            else 
            {
                this.right.add(node);
            }
        }
    }

    visit()
    {
        if (this.left != null) {
            this.left.visit();
        }
        console.log(this.value);
        if (this.right != null) {
            this.right.visit();
        }
    }

    search(val)
    {
        if (this.value == val) {
            return this;
        } else if (val < this.value && this.left != null) {
            return this.left.search(val);
        } else if (val >= this.value && this.right != null) {
            return this.right.search(val);
        }
        return null;
    }
}
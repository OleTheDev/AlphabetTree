const express = require('express');
const app = express();
const port = 3000;

class Node {
    constructor(value) {
        //Define vars for right & left so we know where to go
        this.right = null;
        this.left = null;
        this.value = value;
    }
}

class AlphabetTree {
    constructor() {
        //Root starts as null
        this.treeRoot = null;
    }

    newNode(value) {
        //make sure it's a string as we are creating it for the Alphabet
        if (typeof value != 'string') {
            console.log("We only accept strings!");
        } else if (!this.treeRoot) { //if root is not null we will create a root and if not we will move forward and add a new node
            this.treeRoot = new Node(value); //creates a root
        } else {
            this.addNode(this.treeRoot, value); //adds a node
        }
    }
    
    addNode(node, value) {
        //So we know if we wanna go right or left
        if (node.value < value) {
            //check if right is null or not
            if (!node.right) {
                node.right = new Node(value);
            } else {
                this.addNode(node.right, value); //if right is not null we will pick the other side
            }
        } else {
            //Just as explained above just with left
            if (!node.left) {
                node.left = new Node(value);
            } else {
                this.addNode(node.left, value);
            }
        }
    }
}

//Create the tree
let tree = new AlphabetTree();

//just to return the tree if you want to
app.get('/', (req, res) => {
    res.send(tree);
    console.log(tree);
})

//You can create an node if you want
app.get('/create/:node', (req, res) => {
    tree.newNode(req.params.node);
    res.send(req.params.node);
})

//start the app and create the nodes aswell then log it
app.listen(port,() =>{
    console.log('App started');
    tree.newNode('i');
    tree.newNode('b');
    tree.newNode('j');
    tree.newNode(1);
    tree.newNode('q');
    tree.newNode('a');
    console.log(tree);
})
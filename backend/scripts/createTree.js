const fs = require('fs');

let dataToInsert;

function csvToTrie() {

  fs.readFile("data.csv", 'utf8', function (err, data) {
    if (err) {
      console.log(err);
    } else {
      dataToInsert = data.split('\n');

      for (let i = 1; i < dataToInsert.length; i++) {
        // console.log(`i is as --- ${i}`,dataToInsert[i]);
        let fullname = dataToInsert[i].split(",");
        // console.log("fullname is as --- ", fullname);

        for (let j = 0; j < fullname.length; j++) {
          let word = fullname[j].toLowerCase();
          // console.log("word is as --- ", word);

          for (let k = 0; k < word.length - 2; k++) {
            let substringOfWord = word.substring(k, word.length);
            // console.log("sustring is as --- ", substringOfWord);
            trie.insert(substringOfWord, i);
          }

        }

      }
      console.log("csv loaded");
    }
  });

}

/**
 * 
 * @param {String} key We store single character in each node. key is nothing but the character 
 * which we want to store in node. 
 */
function TrieNode(key) {
  // the "key" value will be the character in sequence
  this.key = key;
  // we keep a reference to parent
  this.parent = null;
  // for storing the parents which belongs to the node
  this.realParents = [];
  // we have hash of children
  this.children = {};
  // check to see if the node is at the end
  this.end = false;
}

/**
 * @function getRealParents Method to get real parents which belongs to the node. One node can have multiple parents.
 */
TrieNode.prototype.getRealParents = function () {
  var node = this;
  return node.realParents;
};

/**
 * @function insert Method for inserting the word in the tree.
 * @param {String} word The word which we want to insert in the Trie Data Structure.
 * @param {*} realParent This is reference to row where original data(name, middle, surname) is stored.
 * 
 */
Trie.prototype.insert = function (word, realParent) {

  var node = this.root; // starting the master root 

  // for every character in the word
  for (var i = 0; i < word.length; i++) {

    // check to see if character node exists in children.
    if (!node.children[word[i]]) {
      // if it doesn't exist, we then create it.
      node.children[word[i]] = new TrieNode(word[i]);

      // we also assign the parent to the child node.
      node.children[word[i]].parent = node;
    }

    // proceed to the next depth in the trie.
    node = node.children[word[i]];

    // finally, we check to see if it's the last word.
    if (i == word.length - 1) {
      //push parent to list
      node.realParents.push(realParent);
      // if it is, we set the end flag to true.
      node.end = true;
    }
  }
};

/**
 * 
 * @param {String} prefix This is prefix which we will receive from the frontend to search
 */
Trie.prototype.find = function (prefix) {
  var node = this.root;
  var output = [];

  // for every character in the prefix
  for (var i = 0; i < prefix.length; i++) {
    // make sure prefix actually has words
    if (node.children[prefix[i]]) {
      node = node.children[prefix[i]];
    } else {
      /* if there's no data available for that prefix then return empty.
      This makes it exact search function which can be improved.
      */
      return output;
    }
  }

  // recursively find all words in the current node
  findAllWords(node, output);
  for (let p = 0; p < output.length; p++) {
    output[p] = dataToInsert[output[p]].split(",").join(" ");
  }
  return output;
};

/**
 * @function findAllWords recursive function to find all words in the given node.
 * @param {Node} node 
 * @param {Array} arr 
 */
function findAllWords(node, arr) {
  // base case, if node is at a word, push to output
  if (node.end) {
    let parents = node.getRealParents();
    for (let m = 0; m < parents.length; m++) {
      arr.push(parents[m]);
    }
  }

  // iterate through each children, call recursive findAllWords
  for (let child in node.children) {
    findAllWords(node.children[child], arr);
  }
}

// we implement Trie with just a simple root with null value.
function Trie() {
  this.root = new TrieNode(null);
}

function search(prefix) {
  return trie.find(prefix);
}

var trie = new Trie();

csvToTrie();

module.exports = {
  search
};
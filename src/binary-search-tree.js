const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/


// npm run test ./test/binary-search-tree.test.js
class Node{
    constructor(data) {
      this.data = data;
      this.left = null;
      this.right = null;
    }
  }
module.exports = class BinarySearchTree {
  
  constructor() {
    this.BSTroot = null;
  }
  
  root() {
    return this.BSTroot;
  }

  add(data) {
    //заносим в корень значение, которое вернет функция
    this.BSTroot = addWithin(this.BSTroot, data);

    //addWhithin будет обновлять узлы, пока мы не дойдем до вакантного места, которое станет либо левым либо правым потомком

    function addWithin(node, data) {
      //если нет узла, то там свободное место, куда мы добавляем новый узел
      if (!node) {
        return new Node(data);
      }

      //если такой узел уже сущ-т и значения совпадают с тем элементом, который уже сущ-т, то 
      //возвращаем узел. т.о. в дереве только уникальные зн-я
      if (node.data === data) {
        return node;
      }

      //если зн-е меньше, то левый потомок будет иметь зн-е ф-ции, если больше, то соответсвенно правый
      if(data < node.data) {
        node.left = addWithin(node.left, data)
      }
      else{
        node.right = addWithin(node.right, data)
      }

      return node;
    }
  }

  has( data ) {
    //передаем то, что мы ищем
    return (this.searchWhithin(this.BSTroot, data) != null); 
  }
  searchWhithin(root, data) {
    if (root === null) return null;

    else if (data < root.data) {
     return this.searchWhithin(root.left, data);
    }
    else if (data > root.data) {
      return this.searchWhithin(root.right, data);
    }
    else 
    return root;
  }
  
  find( data) {
    return findNode(this.BSTroot, data);
    
    function findNode(node, data) {
      if(!node) {
        return null;
      }

      if (node.data === data) {
        return node;
      }

      return data < node.data ? 
      findNode(node.left, data) :
      findNode(node.right, data)
    }

  }
  
  remove(data) {
    this.BSTroot = this.removeNode(this.BSTroot, data);
    return this;
  }

 removeNode(root, data) {
      if (!root) {
        return null;
      }

      //определям в какую сторону пойти, там просим удалить из поддерева искомый элемент 
      // в новое дерево положить новое значение 
      else if (data < root.data) {
        root.left = this.removeNode(root.left, data);
      }
      else if (data > root.data) {
        root.right = this.removeNode(root.right, data);
      }
      //значение равно тому, что находится в узле, тогда проверяем:
      else {
        //если нет ни левого. ни правого потомка, то его можно удалять
        if (!root.left && !root.right) {
          root = null;
        }

        //если нет левого потомка, то вмещаем правое поддерево и возвращаем обновленный узел в кач-ве рез-та 
        else if(!root.left) {
          root = root.right;
        }
        else if(!root.right) {
          root = root.left;
        }

        else {
          let newNode = this.minNode(root.right);
          root.data = newNode.data;
          root.right = this.removeNode(root.right, newNode.data);
        }

      }

      // //есть оба поддерева, тогда ищем минимальное в правом поддереве и начинаем с корня правого поддерева
      // let minFromRight = root.right; 

      // while (minFromRight.left) {
      //   //сдвигаем ук-ль пока есть элемент, как только нашли мин, то помещаем в значение удаляемого узла
      //   minFromRight = minFromRight.left;
      // }
      // root.data = minFromRight.data; 

      // root.right = removeNode(root.right, minFromRight.data)
      return root;
    }


  min() {
    if(!this.BSTroot) {
      return
    }
    let node = this.BSTroot 
    while(node.left) {
      node= node.left;
    }
    return node.data
  }
  minNode(node = this.BSTroot) {
    if(node.left === null) {
      return node
    } else {
      return this.minNode(node.left)
    }
  }


  max() {
    if(!this.BSTroot) {
      return
    }
    let node = this.BSTroot 
    while(node.right) {
      node= node.right;
    }
    return node.data
   }

}

// npm test ./test/binary-search-tree.test.js
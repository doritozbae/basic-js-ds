const { NotImplementedError } = require('../extensions/index.js');

// const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/


// npm run test ./test/binary-search-tree.test.js
class Node{
    constructor(data) {
      this.value = data;
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
    return searchWhithin(this.BSTroot, data); 

    function searchWhithin(node, data) {
      if (!node) {
        return false; 
      }
      if (node.data === data) {
        return true;
      }

      //узел есть, но зн-е не равняется искомому, если оно меньше - ищем его в левом узле, больше - в правом
      return data < node.data ? 
      searchWhithin(node.left, data) :
      searchWhithin(node.right, data)
    }
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
    this.BSTroot = removeNode(this.BSTroot, data);

    
    function removeNode(node, data) {
      if (!node) {
        return null;
      }

      //определям в какую сторону пойти, там просим удалить из поддерева искомый элемент 
      // в новое дерево положить новое значение 
      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      }
      else if (node.value < data) {
        node.left = removeNode(node.left, data);
        return node;
      }
      //значение равно тому, что находится в узле, тогда проверяем:
      else {
        //если нет ни левого. ни правого потомка, то его можно удалять
        if (!node.left && !node.right) {
          return null;
        }

        //если нет левого потомка, то вмещаем правое поддерево и возвращаем обновленный узел в кач-ве рез-та 
        if(!node.left) {
          node = node.right;
          return node;
        }
        if(!node.right) {
          node = node.left;
          return node;
        }
      }

      //есть оба поддерева, тогда ищем минимальное в правом поддереве и начинаем с корня правого поддерева
      let minFromRight = node.right; 

      while (minFromRight.left) {
        //сдвигаем ук-ль пока есть элемент, как только нашли мин, то помещаем в значение удаляемого узла
        minFromRight = minFromRight.left;
      }
      node.data = minFromRight.data; 

      node.right = removeNode(node.right, minFromRight.data)
      return node;
    }
  }


  min() {
    // return this.minNode().data;

    if(!this.BSTroot) {
      return
    }

    let node = this.BSTroot 
    while(node.left) {
      node= node.left;
    }
    return node.data
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
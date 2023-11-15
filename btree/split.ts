import { createInternal, createLeaf } from "@init";
import { BTree, InternalNode, LeafNode } from "@interface";

const ORDER = 3;
/**
 * Splits a node in a B-tree.
 *
 * @param {BTree} tree - The B-tree to split a node in.
 * @param {InternalNode} node - The node to split.
 * @param {number} index - The index of the node in its parent's children array.
 */
const splitNode = (tree: BTree, node: InternalNode, index: number): void => {
  const newInternalNode = createInternal(node.parent);

  const middleIndex = Math.floor(node.keys.length / 2);
  const newKey = node.keys[middleIndex];

  newInternalNode.keys = node.keys.slice(middleIndex + 1);
  newInternalNode.children = node.children.slice(middleIndex + 1);
  newInternalNode.children.forEach((child) => (child.parent = newInternalNode));

  node.keys = node.keys.slice(0, middleIndex + 1);
  node.children = node.children.slice(0, middleIndex);

  if (!node.parent) {
    // If splitting the root, create a new root
    const newRoot = createInternal(null);
    newRoot.keys = [newKey];
    newRoot.children = [node, newInternalNode];

    node.parent = newRoot;
    newInternalNode.parent = newRoot;

    tree.root = newRoot;
  } else {
    // Otherwise, insert the new key and child in the parent
    const parentIndex = node.parent.keys.findIndex((k) => k > newKey);

    node.parent.keys.splice(parentIndex, 0, newKey);
    node.parent.children.splice(parentIndex + 1, 0, newInternalNode);
    newInternalNode.parent = node.parent;

    if (node.parent.keys.length > ORDER - 1) {
      console.log("Splitting Node - Parent keys:", node.parent.keys);
      // If splitting propogates to the parent, recursively split
      splitNode(tree, node.parent, parentIndex);
    }
  }
};

/**
 * Splits a leaf node in a BTree.
 *
 * @param {BTree} tree - The BTree to split the leaf in.
 * @param {LeafNode} leaf - The leaf node to split.
 */
const splitLeaf = (tree: BTree, leaf: LeafNode): void => {
  const newLeaf = createLeaf(leaf.parent);

  const middleIndex = Math.floor(leaf.keys.length / 2);
  const newKey = leaf.keys[middleIndex];

  newLeaf.keys = leaf.keys.slice(middleIndex);
  newLeaf.values = leaf.values.slice(middleIndex);
  leaf.keys = leaf.keys.splice(0, middleIndex);
  leaf.values = leaf.values.splice(0, middleIndex);

  newLeaf.next = leaf.next;
  leaf.next = newLeaf;

  if (!leaf.parent) {
    // If splitting the root, create a new root
    const newRoot = createInternal(null);
    newRoot.keys = [newKey];
    newRoot.children = [leaf, newLeaf];

    leaf.parent = newRoot;
    newLeaf.parent = newRoot;

    tree.root = newRoot;
  } else {
    // Otherwise, inster the new key and leaf in the parent
    const parentIndex = leaf.parent.keys.findIndex((k) => k > newKey);
    leaf.parent.keys.splice(parentIndex, 0, newKey);
    leaf.parent.children.splice(parentIndex + 1, 0, newLeaf);
    newLeaf.parent = leaf.parent;

    if (leaf.parent.keys.length > ORDER - 1) {
      console.log("Splitting Leaf - Parent keys:", leaf.parent.keys);
      // If splitting propogates to the parent, recursively split
      splitNode(tree, leaf.parent, parentIndex);
    }
  }
};

export { splitLeaf, splitNode };

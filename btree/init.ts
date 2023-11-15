import { BTree, InternalNode, LeafNode } from "@interface";

/**
 * Creates a leaf node with the given parent.
 *
 * @param {InternalNode | null} parent - The parent node of the leaf node.
 * @return {LeafNode} The newly created leaf node.
 */
const createLeaf = (parent: InternalNode | null): LeafNode => {
  return {
    keys: [],
    values: [],
    parent,
    next: null,
    isLeaf: true,
  };
};

/**
 * Creates an internal node with the given parent.
 *
 * @param {InternalNode | null} parent - The parent node.
 * @return {InternalNode} The newly created internal node.
 */
const createInternal = (parent: InternalNode | null): InternalNode => {
  return {
    keys: [],
    children: [],
    parent,
    isLeaf: false,
  };
};

/**
 * Creates a new B+ Tree.
 *
 * @return {BTree} The newly created BTree.
 */
const createTree = (): BTree => {
  return {
    root: null,
  };
};

export { createInternal, createLeaf, createTree };

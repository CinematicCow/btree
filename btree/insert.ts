import { findLeafNode } from "@find";
import { createLeaf } from "@init";
import { BTree, Key, LeafNode, Value } from "@interface";
import { splitLeaf } from "@split";

const ORDER = 3;

/**
 * Inserts a key-value pair into a B-tree.
 *
 * @param {BTree} tree - The B-tree to insert into.
 * @param {Key} key - The key to insert.
 * @param {Value} value - The value to insert.
 */
const insert = (tree: BTree, key: Key, value: Value): void => {
  if (!tree.root) {
    // If the tree is empty, create a new leaf node
    const newLeaf = createLeaf(null);
    newLeaf.keys = [key];
    newLeaf.values = [value];
    tree.root = newLeaf;
  } else {
    // Otherwise find the appropriate leaf node to insert
    const leafNode = findLeafNode(tree.root, key);

    // Insert the key and value into the leaf node
    insertIntoLeaf(leafNode, key, value);

    if (leafNode.keys.length > ORDER - 1) {
      // If the leaf node is full, split it
      splitLeaf(tree, leafNode);
    }
  }
};

/**
 * Inserts a key-value pair into a leaf node.
 *
 * @param {LeafNode} leaf - The leaf node where the key-value pair will be inserted.
 * @param {Key} key - The key to be inserted.
 * @param {Value} value - The value to be inserted.
 */
const insertIntoLeaf = (leaf: LeafNode, key: Key, value: Value): void => {
  const index = leaf.keys.findIndex((k) => k > key);

  leaf.keys.splice(index, 0, key);
  leaf.values.splice(index, 0, value);
};

export { insert, insertIntoLeaf };

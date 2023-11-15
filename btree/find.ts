import { BTree, InternalNode, Key, LeafNode, Node, Value } from "@interface";

/**
 * Finds the leaf node in a tree that corresponds to a given key.
 *
 * @param {Node} node - The root node of the tree.
 * @param {Key} key - The key to search for.
 * @return {LeafNode} - The leaf node corresponding to the given key.
 */
const findLeafNode = (node: Node, key: Key): LeafNode => {
  if (node?.isLeaf) {
    return node as LeafNode;
  } else {
    // Find the child to travsere to
    const childIndex = node.keys.findIndex((k) => k > key);

    // If the key is greater than all the keys in the current node, use the last child
    const nextChildIndex = childIndex == -1 ? node.keys.length : childIndex;

    return findLeafNode((node as InternalNode).children[childIndex], key);
  }
};

/**
 * Finds the value associated with the given key in the BTree.
 *
 * @param {BTree} tree - The BTree to search in.
 * @param {Key} key - The key to search for.
 * @return {Value | null} - The value associated with the key, or null if the key is not found.
 */
const find = (tree: BTree, key: Key): Value | null => {
  if (!tree.root) {
    return null;
  }

  const leafNode = findLeafNode(tree.root, key);
  const index = leafNode.keys.indexOf(key);

  if (index == -1) {
    return null;
  }

  return leafNode.values[index];
};

export { findLeafNode, find };

export type Key = number;
export type Value = string;

export interface LeafNode {
  keys: Array<Key>;
  values: Array<Value>;
  parent: InternalNode | null;
  next: LeafNode | null;
  isLeaf: boolean;
}

export interface InternalNode {
  keys: Array<Key>;
  children: Array<Node>;
  parent: InternalNode | null;
  isLeaf: boolean;
}

export type Node = LeafNode | InternalNode;

export interface BTree {
  root: Node | null;
}

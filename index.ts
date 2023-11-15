import { find } from "@find";
import { createTree } from "@init";
import { insert } from "@insert";
import { BTree, Key, Value } from "@interface";

const KVDB: BTree = createTree();

const insertKV = (key: Key, value: Value): void => {
  insert(KVDB, key, value);
};

const getValue = (key: Key): Value | null => {
  return find(KVDB, key);
};

// Example
insertKV(5, "Apple");
insertKV(3, "Banana");
insertKV(8, "Orange");
insertKV(1, "Grapes");
insertKV(7, "Mango");
insertKV(2, "Kiwi");
insertKV(6, "Guvava");
insertKV(4, "Strawberry");

console.assert(getValue(3) === "Banana");
console.assert(getValue(6) === "Guvava");
console.assert(getValue(4) === "Strawberry");
console.assert(getValue(1) === "Grapes");

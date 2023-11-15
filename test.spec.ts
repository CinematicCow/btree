import { find } from "@find";
import { createTree } from "@init";
import { insert } from "@insert";
import { BTree } from "@interface";
import { describe, beforeEach, test, expect } from "bun:test";

describe("B+ Tree test", () => {
  let tree: BTree;

  beforeEach(() => {
    tree = createTree();
  });

  test("insert and find", () => {
    // Insert key-value pairs
    insert(tree, 5, "red");
    insert(tree, 3, "blue");
    insert(tree, 7, "yellow");
    insert(tree, 1, "green");
    insert(tree, 4, "purple");

    // Find key-value pairs
    expect(find(tree, 5)).toBe("red");
    expect(find(tree, 3)).toBe("blue");
    expect(find(tree, 7)).toBe("yellow");
    expect(find(tree, 1)).toBe("green");
    expect(find(tree, 4)).toBe("purple");
  });
});

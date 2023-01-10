export function solve(input: Array<string>): [number, number] {
  return [part1(input), part2(input)];
}

export function part1(input: Array<string>): number {
  const tree = buildTreeFrom(input);

  const sizeOfTree = sizeOf(tree);
  let total = sizeOfTree < 100000 ? sizeOfTree : 0;
  forEachNode(tree, (node: Node) => {
    if (node.type == "folder") {
      const size = sizeOf(node);
      if (size < 100000) {
        total += size;
      }
    }
  });

  return total;
}

export function part2(input: Array<string>): number {
  const tree = buildTreeFrom(input);

  const sizeOfTree = sizeOf(tree);
  const available = 70000000 - sizeOfTree;
  const target = 30000000 - available;

  let current = sizeOfTree;
  forEachNode(tree, (node: Node) => {
    if (node.type == "folder") {
      const size = sizeOf(node);
      if (size >= target && size < current) {
        current = size;
      }
    }
  });

  return current;
}

type Node = {
  name: string;
  type: "folder" | "file";
  parent?: Node;
  children: Array<Node>;
  size: number;
};

function forEachNode(node: Node, func: Function) {
  func(node);
  if (node.hasOwnProperty("children")) {
    node.children.forEach((child) => {
      forEachNode(child, func);
    });
  }
}

export function sizeOf(node: Node): number {
  if (node.type == "file") {
    return node.size;
  } else {
    return node.children.reduce((acc, child) => {
      return acc + sizeOf(child);
    }, 0);
  }
}

export function buildTreeFrom(cmd: Array<string>): Node {
  const root = {
    name: "/",
    type: "folder",
    children: [],
    size: 0,
  } as Node;

  let cwd: Node = root;
  cmd.slice(1).forEach((line) => {
    cwd = handleCommand(line, cwd);
  });

  return root;
}

export function handleCommand(cmd: string, cwd: Node): Node {
  if (cmd.startsWith("$ cd")) {
    const target = cmd.split(" ")[2];
    cwd = cd(target, cwd);
  } else if (cmd.startsWith("$ ls")) {
    // do nothing
  } else if (cmd.startsWith("dir")) {
    cwd = dir(cmd, cwd);
  } else {
    cwd = file(cmd, cwd);
  }
  return cwd;
}

function cd(target: string, cwd: Node): Node {
  if (target == "..") {
    if (!cwd.parent) {
      throw new Error("Cannot cd .. from folder without parent");
    }
    cwd = cwd.parent;
  } else {
    let result = cwd.children.find((child) => {
      return child.name == target;
    });
    if (!result) {
      throw new Error("Cannot cd to folder that does not exist");
    }
    cwd = result;
  }
  return cwd;
}

function dir(cmd: string, cwd: Node): Node {
  cwd.children.push({
    name: cmd.split(" ")[1],
    type: "folder",
    children: [],
    parent: cwd,
    size: 0,
  });
  return cwd;
}

function file(cmd: string, cwd: Node): Node {
  cwd.children.push({
    name: cmd.split(" ")[1],
    type: "file",
    children: [],
    parent: cwd,
    size: parseInt(cmd.split(" ")[0]),
  });
  return cwd;
}

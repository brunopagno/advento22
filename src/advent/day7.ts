export function solve(input: Array<string>): [number, number] {
  return [part1(input), part2(input)];
}

function part1(input: Array<string>): number {
  const tree = buildTreeFrom(input);

  // printTree(tree);

  const sizeOfTree = sizeOf(tree);
  let total = sizeOfTree < 100000 ? sizeOfTree : 0;
  forEachNode(tree, (node: Node) => {
    if (node.hasOwnProperty("children")) {
      const size = sizeOf(node);
      if (size < 100000) {
        total += size;
      }
    }
  });

  return total;
}

function part2(input: Array<string>): number {
  const tree = buildTreeFrom(input);

  const sizeOfTree = sizeOf(tree);
  const available = 70000000 - sizeOfTree;
  const target = 30000000 - available;

  let current = available;
  forEachNode(tree, (node: Node) => {
    if (node.hasOwnProperty("children")) {
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
};

type DirNode = Node & {
  parent?: DirNode;
  children: Array<Node>;
};

type FileNode = Node & {
  size: number;
};

function forEachNode(node: Node, func: Function) {
  func(node);
  if (node.hasOwnProperty("children")) {
    (node as DirNode).children.forEach((child) => {
      forEachNode(child, func);
    });
  }
}

function sizeOf(node: Node): number {
  if (node.hasOwnProperty("size")) {
    return (node as FileNode).size;
  } else {
    return (node as DirNode).children.reduce((acc, child) => {
      return acc + sizeOf(child);
    }, 0);
  }
}

function buildTreeFrom(cmd: Array<string>): DirNode {
  const root = { name: "/", children: [] } as DirNode;

  let cwd: DirNode = root;
  cmd.slice(1).forEach((line) => {
    if (line.startsWith("$ cd")) {
      const target = line.split(" ")[2];
      if (target == "..") {
        cwd = cwd.parent as DirNode;
      } else {
        cwd = cwd.children.find((child) => {
          return child.name == target;
        }) as DirNode;
      }
    } else if (line.startsWith("$ ls")) {
      // do nothing I think
    } else if (line.startsWith("dir")) {
      cwd.children.push({
        name: line.split(" ")[1],
        children: [],
        parent: cwd,
      } as DirNode);
    } else {
      cwd.children.push({
        name: line.split(" ")[1],
        size: parseInt(line.split(" ")[0]),
      } as FileNode);
    }
  });

  return root;
}

function printTree(node: Node, indent: string = "") {
  if (node.hasOwnProperty("size")) {
    console.log(
      indent + (node as FileNode).name + " (" + (node as FileNode).size + ")"
    );
  } else {
    console.log(indent + (node as DirNode).name);
    (node as DirNode).children.forEach((child) => {
      printTree(child, indent + "  ");
    });
  }
}

export const flattenTree = (tree: any, flatten: any) => {
  tree.forEach((Node) => {
    flatten.push(Node);
    if (Node.children && Node.children.length > 0) {
      flatten = flattenTree(Node.children, flatten);
    }
    //delete Node.children;
  });

  return flatten;
};

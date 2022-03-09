export const renderTree = (list: any[], renderTreeOptions?: IRenderTreeOptions) => {
  const defaultOptions: IRenderTreeOptions = {
    keyProperty: 'id',
    parentProperty: 'parentId',
    childProperty: 'children',
    firstNodeValue: null,
  };
  const options: IRenderTreeOptions = {
    ...defaultOptions,
    ...renderTreeOptions,
  };
  const { keyProperty, parentProperty, childProperty, firstNodeValue } = options;
  const tree = [];
  const parents = list.filter((item) => item[parentProperty] === firstNodeValue);
  for (const parent of parents) {
    parent[childProperty] = findChildren(list, parent[keyProperty], options);
    tree.push(parent);
  }
  return tree;
};

const findChildren = (list, parentId, renderTreeOptions: IRenderTreeOptions) => {
  const { childProperty, parentProperty, keyProperty } = renderTreeOptions;
  const node = [];
  const sons = list.filter((item) => item[parentProperty] === parentId);
  for (const child of sons) {
    child[childProperty] = findChildren(list, child[keyProperty], renderTreeOptions);
    node.push(child);
  }
  return node;
};

interface IRenderTreeOptions {
  /**
   * @description primary key to be compared with parent
   * @default id
   */
  keyProperty?: string;
  /**
   * @description parent property to compare the primary key with
   * @default parentId
   */
  parentProperty?: string;
  /**
   * @description child property to contain the children items
   * @default children
   */
  childProperty?: string;

  /**
   * @description the value of the first node.
   * @default null
   *
   */
  firstNodeValue?: number | string;
}

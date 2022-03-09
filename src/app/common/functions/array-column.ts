import * as _ from 'lodash';

export const arrayColumn = (array: any, key: string) => {
  return _.sortBy(_.map(_.uniqBy(array, key), key));
};

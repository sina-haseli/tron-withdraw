import * as _ from 'lodash';

export const init = (target: any, source: any, fields: string[]) => {
  const newSource = _.pick(source, fields);
  _.assign(target, newSource);
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import _ from 'lodash';

export function isEmptyObj(obj: any) {
  if (obj.constructor === Object && _.isEmpty(obj)) {
    return true;
  }
  return false;
}

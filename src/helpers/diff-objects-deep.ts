/**
 * @see https://stackoverflow.com/questions/8572826/generic-deep-diff-between-two-objects
 */
export const diffObjectsDeep = {
  VALUE_CREATED: 'created',
  VALUE_UPDATED: 'updated',
  VALUE_DELETED: 'deleted',
  VALUE_UNCHANGED: 'unchanged',
  map(obj1?: Indexed, obj2?: Indexed): Nullable<Indexed> {
    if (this.isFunction(obj1) || this.isFunction(obj2)) {
      // throw new Error('Invalid argument. Function given, object expected.');
      return null;
    }
    if (this.isValue(obj1) || this.isValue(obj2)) {
      const type = this.compareValues(obj1, obj2);

      if (type === this.VALUE_UNCHANGED) {
        return null;
      }

      // eslint-disable-next-line consistent-return
      return {
        type,
        data: obj1 === undefined ? obj2 : obj1,
      };
    }

    const diff: Indexed = {};
    for (const key in obj1) {
      if (this.isFunction(obj1[key])) {
        continue;
      }

      let value2;
      if (obj2 && obj2[key] !== undefined) {
        value2 = obj2[key];
      }

      diff[key] = this.map(obj1[key], value2);
    }
    for (const key in obj2) {
      if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
        continue;
      }

      diff[key] = this.map(undefined, obj2[key]);
    }

    // eslint-disable-next-line consistent-return
    return diff;
  },
  compareValues(value1: unknown, value2: unknown) {
    if (value1 === value2) {
      return this.VALUE_UNCHANGED;
    }
    if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
      return this.VALUE_UNCHANGED;
    }
    if (value1 === undefined) {
      return this.VALUE_CREATED;
    }
    if (value2 === undefined) {
      return this.VALUE_DELETED;
    }
    return this.VALUE_UPDATED;
  },
  isFunction(x: unknown): x is Function {
    return Object.prototype.toString.call(x) === '[object Function]';
  },
  isArray(x: unknown): x is any[] {
    return Object.prototype.toString.call(x) === '[object Array]';
  },
  isDate(x: unknown): x is Date {
    return Object.prototype.toString.call(x) === '[object Date]';
  },
  isObject(x: unknown): x is Indexed {
    return Object.prototype.toString.call(x) === '[object Object]';
  },
  isValue(x: unknown) {
    return !this.isObject(x) && !this.isArray(x);
  },
};

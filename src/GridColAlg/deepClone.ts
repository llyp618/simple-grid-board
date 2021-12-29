const isObject = function (value: any) {
  return Object.prototype.toString.call(value) === '[object Object]';
};

const isArray = function (value: any) {
  return Object.prototype.toString.call(value) === '[object Array]';
};

const canClone = function (value: any) {
  return isObject(value) || isArray(value);
};

const cloneArray = function (value: any) {
  let array: any[] = [];
  value.forEach((item: any, index: any) => {
    if (canClone(item)) {
      array[index] = deepClone(item);
    } else {
      array[index] = item;
    }
  });
  return array;
};

const cloneObject = function (value: any) {
  let obj: any = {};
  for (let item in value) {
    if (canClone(value[item])) {
      obj[item] = deepClone(value[item]);
    } else {
      if (value.hasOwnProperty(item)) {
        obj[item] = value[item];
      }
    }
  }
  return obj;
};

const deepClone = function <T>(value: T): T {
  if (!canClone(value)) {
    return value;
  }
  if (isArray(value)) {
    return cloneArray(value) as unknown as T;
  } else if (isObject(value)) {
    return cloneObject(value) as T;
  }

  return undefined as unknown as T;
};

export default deepClone;

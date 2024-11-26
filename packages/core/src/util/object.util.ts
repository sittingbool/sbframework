export function mapIsEmpty(map: any | undefined): boolean {
    // object with string as keys has no strings or is no object
    return !map || typeof map !== 'object' || Object.keys(map).length < 1;
}

/**
 * clones your data to a new instance
 * @param data - the object, array or string to clone. other types will be returned as is
 * @param deep - should clone contents as well if object or array by level of this number value (1 = next level, 2 = next level and in that one, ...)
 */
export function clone<T = any>(data: T, deep = 1): T {
    switch (typeof data) {
        case 'string':
            return <any>('' + data);
        case 'object':
            if (data === null) return data;
            if (Array.isArray(data)) {
                if (deep > 0) return <any>data.map((item) => clone<any>(item, deep - 1));
                return <any>[].concat(data);
            }
            if (deep > 0) {
                const result: any = {};
                for (const k in data) {
                    result[k] = clone<any>(data[k], deep - 1);
                }
                return result;
            }
            return Object.assign({}, data);
        default:
            return data;
    }
}

/**
 * will return a new object by adding the prefix string to every single key. eg { name: 'Jim', age: 12 } plus prefix '_' => { _name: 'Jim', _age: 12 }
 * @param data
 * @param prefix
 */
export function prefixObjectKeys(data: any, prefix: string): any {
    if (mapIsEmpty(data)) return;
    const result: any = {};
    for (const key in data) {
        result[prefix + key] = data[key];
    }
    return result;
}

/**
 * a tyoe to describe a map as in Java
 */
export interface IMap<T = string> {
    [key: string]: T;
}

/**
 * a type to describe a map with any value
 */
export type IMapAny = IMap<any>;

export type ArrayItemSame = (left: any, right: any) => boolean;
const defaultArrayItemSame = (left: any, right: any) => {
    return JSON.stringify(left) === JSON.stringify(right);
};

export interface ArrayCompareResult {
    onlyInLeft: any[];
    changed: any[];
    same: any[];
    onlyInRight: any[];
}
//-----------------------------------------------------------------------------------------------------

export function arrayIsEmpty(arr: any[] | undefined): boolean {
    return !Array.isArray(arr) || arr.length < 1;
}

/**
 * Array comparator for full change detection
 * Compares two arrays for items that are the same, items that have updates, items that only exist in the one ot the other
 * @param left - the one array to be compared with right
 * @param right - the other array to be compared with left
 * @param comp - an optional function that returns true if the two given items are the same in both arrays, ignoring changes (e.g. compared by id), defaults to a comparison using JSON.stringify
 * @param fullComp - an optional function that returns true if the two given items are the same all data, defaults to a comparison using JSON.stringify if comp is a custom function, otherwise ignored
 */
export function compareArrays(
    left: any[],
    right: any[],
    comp?: ArrayItemSame,
    fullComp?: ArrayItemSame,
): ArrayCompareResult {
    let result: ArrayCompareResult = { onlyInLeft: [], changed: [], same: [], onlyInRight: [] };
    let sameInRight: any[] = [];
    let changedInRight: any[] = [];
    comp = comp || defaultArrayItemSame;
    fullComp = fullComp || defaultArrayItemSame;
    result.same = left.filter((item) => {
        for (let i = 0; i < right.length; i++) {
            if (comp(item, right[i]) && (comp === fullComp || fullComp(item, right[i]))) {
                sameInRight.push(right[i]);
                return true;
            }
        }
        return false;
    });
    if (comp !== fullComp) {
        result.changed = left.filter((item) => {
            for (let i = 0; i < right.length; i++) {
                if (result.same.indexOf(item) < 0 && comp(item, right[i])) {
                    changedInRight.push(right[i]);
                    return true;
                }
            }
            return false;
        });
    }
    result.onlyInLeft = left.filter((item) => result.same.indexOf(item) < 0 && result.changed.indexOf(item) < 0);
    result.onlyInRight = right.filter((item) => sameInRight.indexOf(item) < 0 && changedInRight.indexOf(item) < 0);
    return result;
}

/**
 * like array filter this function excepts a promised filter function to run async
 * @param array
 * @param filter
 */
export async function filterAsync(array: any[], filter: (item: any) => Promise<boolean>): Promise<any[]> {
    const retArray: any = [];
    for (const item of array) {
        if (await filter(item)) retArray.push(item);
    }
    return retArray;
}

/**
 * finds the closest value in the array to the given value
 * @param value - the value to find the closest value for
 * @param candidates - the array of candidates to find the closest value in
 */
export function findClosestValueTo(value: number, candidates: number[]): number {
    let closest = candidates[0];
    for (const candidate of candidates) {
        if (Math.abs(candidate - value) < Math.abs(closest - value)) closest = candidate;
    }
    return closest;
}

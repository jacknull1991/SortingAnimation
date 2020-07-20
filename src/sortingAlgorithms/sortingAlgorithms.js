export const mergeSort = array => {
    const animations = [];
    if (array.length <= 1) return array;
    const copy = array.slice();
    mergeSortHelper(array, 0, array.length - 1, copy, animations);
    return animations;
}

function mergeSortHelper(array, lo, hi, copy, animations) {
    if (lo === hi) return;
    const mid = Math.floor((lo + hi) / 2);
    mergeSortHelper(copy, lo, mid, array, animations);
    mergeSortHelper(copy, mid + 1, hi, array, animations);
    doMerge(array, lo, mid, hi, copy, animations);
}

// use a copy of the original array to do in-place swapping
// and add to animations
function doMerge(array, lo, mid, hi, copy, animations) {
    let k = lo, i = lo, j = mid + 1;
    while (i <= mid && j <= hi) {
        // Current indices we're comparing; add to animation to change their color
        animations.push([i, j]);
        // add to animations to revert their color
        animations.push([i, j]); 

        if (copy[i] <= copy[j]) {
            // overwrite the value at index k in the original array with the value at 
            // index i in the copy array so we don't mess up the two parts
            animations.push([k, copy[i]]);
            array[k++] = copy[i++];
        } else {
            // same as above
            animations.push([k, copy[j]]);
            array[k++] = copy[j++];
        }
    }

    while (i <= mid) {
        // push twice to change color and revert back
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, copy[i]]);
        array[k++] = copy[i++];
    }
    while (j <= hi) {
        // same as above
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, copy[j]]);
        array[k++] = copy[j++];
    }

}
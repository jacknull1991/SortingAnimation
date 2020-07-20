//============= Merge Sort ========================
export const mergeSort = array => {
    const animations = [];
    if (array.length <= 1) return animations;
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


//============= Quick Sort ========================
export const quickSort = array => {
    const animations = [];
    if (array.length <= 1) return animations;
    quickSortHelper(array, 0, array.length - 1, animations);
    // return array;
    return animations;
}

// not optimized for random pivoting
function quickSortHelper(array, lo, hi, animations) {
    if (lo >= hi) return;
    // partition
    const pivot = quickSortPartition(array, lo, hi, animations);
    // sort recursively
    quickSortHelper(array, lo, pivot - 1, animations);
    quickSortHelper(array, pivot + 1, hi, animations);
}

function quickSortPartition(array, lo, hi, animations) {
    const animation = [];
    let pivot = array[hi];
    let i = lo;
    // mark pivot for this iteration
    animation.push([hi, hi, array[hi], array[hi]]);

    for (let j = lo; j < hi; j++) {
        if (array[j] < pivot) {
            animation.push([i, j, array[i], array[j]]);
            animation.push([i, j, array[i], array[j]]);
            arraySwap(array, i, j);
            i++;
        }
    }
    // swap pivot to correct position
    animation.push([i, hi, array[i], array[hi]]);
    arraySwap(array, i, hi);
    animations.push(animation);
    return i;
}

//============= Bubble Sort =======================
export const bubbleSort = array => {
    const animations = [];
    if (array.length <= 1) return array;
    bubbleSortHelper(array, animations);
    return animations;
}

// naive implementation
function bubbleSortHelper(array, animations) {
    let len = array.length;
    let swapped;
    do {
        swapped = false;
        for (let i = 1; i < len; i++) {
            animations.push([i - 1, i, array[i-1], array[i]]);
            if (array[i - 1] > array[i]) {
                animations.push([i - 1, i, array[i-1], array[i]]);
                arraySwap(array, i - 1, i);
                swapped = true;
            } else {
                // do-nothing animation
                animations.push([i - 1, i, -1, -1]);
            }
        }
        len = len - 1;
    } while (swapped)
}


//==============Common Helper Functions============
function arraySwap(array, idx1, idx2) {
    const tmp = array[idx1];
    array[idx1] = array[idx2];
    array[idx2] = tmp;
}
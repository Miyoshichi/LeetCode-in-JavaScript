/**
 * @param {number[][]} intervals
 * @return {number}
 */

let eraseOverlapIntervals = intervals => {
    let left = 0, right = 1, nums = 0
    intervals.sort((a, b) => a[0] - b[0])
    while (right < intervals.length) {
        if (intervals[left][1] > intervals[right][1]) {
            nums += 1
        } else if (intervals[left][1] > intervals[right][0]) {
            [intervals[left], intervals[right]] = [intervals[right], intervals[left]]
            nums += 1
        }
        left += 1
        right += 1
    }
    return nums
}

// test
let nums1 = [[1, 2], [2, 3], [3, 4], [1, 3]]
let nums2 = [[1, 2], [1, 2], [1, 2]]
let nums3 = [[1, 2], [2, 3]]
console.log(eraseOverlapIntervals(nums1), eraseOverlapIntervals(nums2), eraseOverlapIntervals(nums3))
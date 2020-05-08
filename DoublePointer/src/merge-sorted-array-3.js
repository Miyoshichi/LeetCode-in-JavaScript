/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

const merge = (nums1, m, nums2, n) => {
    let p1 = m - 1
    let p2 = n - 1
    let p = m + n - 1

    while (p1 >= 0 && p2 >= 0) {
        if (nums2[p2] > nums1[p1]) {
            nums1[p] = nums2[p2]
            p2 -= 1
        } else {
            nums1[p] = nums1[p1]
            p1 -= 1
        }
        p -= 1
    }

    let nums2Res = nums2.splice(0, p2 + 1)
    nums1.splice(0, p2 + 1, ...nums2Res)
}

// test
let nums1 = [1, 2, 3, 0, 0, 0]
let m = 3
let nums2 = [1, 5, 6]
let n = 3
merge(nums1, m, nums2, n)
console.log(nums1)
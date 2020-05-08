/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

const merge = (nums1, m, nums2, n) => {
    const nums1Copy = nums1.splice(0, nums1.length, ...nums1)
    let p1 = 0
    let p2 = 0
    let p = 0

    while (p1 < m && p2 < n) {
        if (nums1Copy[p1] < nums2[p2]) {
            nums1[p] = nums1Copy[p1]
            p1 += 1
        } else {
            nums1[p] = nums2[p2]
            p2 += 1
        }
        p += 1
    }

    if (p1 < m) {
        let nums1Res = nums1Copy.slice(p1, m)
        nums1.splice(p, nums1Res.length, ...nums1Res)
    }
    if (p2 < n) {
        let nums2Res = nums2.slice(p2, n)
        nums1.splice(p, nums2Res.length, ...nums2Res)
    }
}

// test
let nums1 = [1, 2, 3, 0, 0, 0]
let m = 3
let nums2 = [2, 5, 6]
let n = 3
merge(nums1, m, nums2, n)
console.log(nums1)
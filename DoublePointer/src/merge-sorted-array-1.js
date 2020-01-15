/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

var merge = (nums1, m, nums2, n) => {
    let len = nums1.length
    let sum = m + n

    nums1.splice(m)
    nums2.splice(n)
    nums1.push.apply(nums1, nums2)
    nums1 = nums1.sort((a, b) => a - b)

    nums1.splice(sum)
    for (; sum < len; sum++) {
        nums1.splice(sum, 0, 0)
    }
}

// test
nums1 = [1, 2, 3, 0, 0, 0]
m = 3
nums2 = [2, 5, 6]
n = 3
merge(nums1, m, nums2, n)
console.log(nums1)
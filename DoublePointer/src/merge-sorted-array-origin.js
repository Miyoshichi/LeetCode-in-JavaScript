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

    for (let index2 = 0; index2 < n; index2++) {
        if (m > 0) {
            for (let index1 = m - 1 + index2; index1 >= 0; index1--) {
                if (nums2[index2] > nums1[index1]) {
                    nums1.splice(index1 + 1, 0, nums2[index2])
                    break
                }
            }
            if (nums2[index2] <= nums1[0]) {
                nums1.splice(0, 0, nums2[index2])
            }
        } else {
            nums1.splice(index2, 1, nums2[index2])
        }
    }

    nums1.splice(sum)
    for (; sum < len; sum++) {
        nums1.splice(sum, 0, 0)
    }
}

//test
nums1 = [1, 2, 3, 0, 0, 0]
m = 3
nums2 = [2, 5, 6]
n = 3
merge(nums1, m, nums2, n)
console.log(nums1)
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var findKthLargest = (nums, k) => {
    nums.sort((a, b) => b - a)
    return nums[k - 1]
}

// test
let [nums1, k1] = [[3,2,1,5,6,4], 2]
console.log(findKthLargest(nums1, k1))
let [nums2, k2] = [[3,2,3,1,2,4,5,5,6], 4]
console.log(findKthLargest(nums2, k2))
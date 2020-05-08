/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

const findKthLargest = (nums, k) => {
    let topK = nums.splice(0, k)
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > Math.min(...topK)) {
            let j = topK.indexOf(Math.min(...topK))
            topK[j] = nums[i]
        }
    }
    return Math.min(...topK)
}

// test
let [nums1, k1] = [[3,2,1,5,6,4], 2]
console.log(findKthLargest(nums1, k1))
let [nums2, k2] = [[3,2,3,1,2,4,5,5,6], 4]
console.log(findKthLargest(nums2, k2))
/**
 * @param {number[]} nums
 * @return {number}
 */

let maxSubArray = (nums) => {
    let max = []
    for (let i = 0; i < nums.length; i++) {
        let maxSum = Math.min(...nums)
        let currentSum = 0
        for (let j = i; j < nums.length; j++) {
            currentSum += nums[j]
            if (currentSum > maxSum) {
                maxSum = currentSum
            }
        }
        max.push(maxSum)
    }
    return Math.max(...max)
}

// test
let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
console.log(maxSubArray(nums))
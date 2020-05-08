/**
 * @param {number[]} nums
 * @return {number}
 */

const maxSubArray = (nums) => {
    let currSum = nums[0]
    let maxSum = currSum
    let resNums = nums.slice(1)
    resNums.forEach((item) => {
        currSum = Math.max(item, currSum + item)
        maxSum = Math.max(currSum, maxSum)
    })
    return maxSum
}

// test
let nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
console.log(maxSubArray(nums))
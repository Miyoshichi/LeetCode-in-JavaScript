/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

const sortColors = nums => {
    let p0 = 0, curr = 0, p2 = nums.length - 1
    for (;curr <= p2;) {
        if (nums[curr] === 0) {
            [nums[curr], nums[p0]] = [nums[p0], nums[curr]]
            p0 += 1
            curr += 1
        } else if (nums[curr] === 2) {
            [nums[curr], nums[p2]] = [nums[p2], nums[curr]]
            p2 -= 1
        } else {
            curr += 1
        }
    }
}

// test
let nums = [2, 0, 2, 1, 1, 0]
sortColors(nums)
console.log(nums)
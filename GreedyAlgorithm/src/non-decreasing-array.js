/**
 * @param {number[]} nums
 * @return {boolean}
 */

let checkPossibility = (nums) => {
    let changed = 0
    for (i = 1; i < nums.length && changed < 2; i++) {
        if (nums[i] < nums[i - 1]) {
            changed += 1
            if (nums[i] < nums[i - 2] && i > 1) {
                nums[i] = nums[i - 1]
            } else {
                nums[i - 1] = nums[i]
            }
        }
    }
    return changed <= 1
}

// test
let nums1 = [4, 2, 3]
let nums2 = [4, 2, 1]
console.log(checkPossibility(nums1))
console.log(checkPossibility(nums2))
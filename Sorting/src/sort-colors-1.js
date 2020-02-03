/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

var sortColors = nums => {
    const elementNum = {}
    const colors = []
    nums.forEach(element => {
        elementNum[element] ?
        elementNum[element] += 1 :
        elementNum[element] = 1})
    for (key in elementNum) {
        colors.push(key.repeat(elementNum[key]))
    }
    flag = colors.join('').split('')
    for (let i = 0; i < nums.length; i++) {
        nums.splice(i, 1, parseInt(flag[i]))
    }
}

// test
let nums = [2, 0, 2, 1, 1, 0]
sortColors(nums)
console.log(nums)
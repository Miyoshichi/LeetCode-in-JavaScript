/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */

const twoSum = (numbers, target) => {
    let lo = 0
    let hi = numbers.length - 1
    while (lo < hi) {
        if (numbers[lo] + numbers[hi] < target) {
            lo += 1
        } else if (numbers[lo] + numbers[hi] > target) {
            hi -= 1
        } else {
            return [lo + 1, hi + 1]
        }
    }
    return [-1, -1]
}

// test
let numbers = [2, 7, 11, 15]
let target = 9
console.log(twoSum(numbers, target))
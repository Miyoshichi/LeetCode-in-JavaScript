/**
 * @param {number} c
 * @return {boolean}
 */

const judgeSquareSum = c => {
    for (a = 0; a * a <= c; a++) {
        b = Math.sqrt(c - a * a)
        if (b == Math.floor(b)) {
            return true
        }
    }
    return false
}

// test
let c = 5
console.log(judgeSquareSum(c))
let c = 3
console.log(judgeSquareSum(c))

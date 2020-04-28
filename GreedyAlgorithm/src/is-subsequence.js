/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */

let isSubsequence = (s, t) => {
    let previous = -1
    let falseNum = 0
    let sArr = s.split('')
    sArr.forEach((element) => {
        let current = t.indexOf(element, previous + 1)
        if (current <= previous) {
            falseNum += 1
        }
        previous = current
    })
    if (falseNum > 0) {
        return false
    } else {
        return true
    }
}

// test
let s1 = 'abc'
let s2 = 'axc'
let t = 'ahbgdc'
console.log(isSubsequence(s1, t))
console.log(isSubsequence(s2, t))
/**
 * @param {string} s
 * @return {string}
 */

const reverseVowels = s => {
    const vowels = 'aiueoAIUEO'
    var lo = 0
    var hi = s.length - 1
    s = s.split('')
    while (lo < hi) {
        if (vowels.indexOf(s[lo]) == -1) {
            lo += 1
        } else {
            if (vowels.indexOf(s[hi]) == -1) {
                hi -= 1
            } else {
                [s[lo], s[hi]] = [s[hi], s[lo]]
                lo += 1
                hi -= 1
            }
        }
    }
    s = s.join('')
    return s
}

// test
let s = 'hello'
console.log(vowelsReversed(s))
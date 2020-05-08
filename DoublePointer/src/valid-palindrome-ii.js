/**
 * @param {string} s
 * @return {boolean}
 */

const validPalindrome = s => {

    const isPalindrome = (s, lo = 0, hi = s.length - 1) => {
        for (; lo < hi; lo++, hi--) {
            if (s[lo] != s[hi]) {
                let bool = false
                return {lo: lo, hi: hi, bool: bool}
            }
        }
        let bool = true
        return {lo: lo, hi: hi, bool: bool}
    }
    
    if (isPalindrome(s).bool) {
        return true
    } else {
        let [lo, hi] = [isPalindrome(s).lo, isPalindrome(s).hi]
        return isPalindrome(s, lo + 1, hi).bool || isPalindrome(s, lo, hi - 1).bool
    }

}

// test
let s = 'abva'
console.log(validPalindrome(s))
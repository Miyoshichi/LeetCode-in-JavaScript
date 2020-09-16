/**
 * @param {number} x
 * @return {number}
 */

const mySqrt = (x) => {
    let lo = 0, hi = x, ans = 0

    while (lo < hi && hi - lo > 1e-6) {
        let mid = lo + (hi -lo) / 2
        mid**2 > x ? hi = mid : lo = mid;
        ans = Math.floor(mid)
    }

    return ans = ((ans + 1)**2 <= x) ? ans + 1 : ans
}

//test
let x = 8
console.log(mySqrt(x))
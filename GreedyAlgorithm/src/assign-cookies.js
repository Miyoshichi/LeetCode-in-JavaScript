/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */

let findContentChildren = (g, s) => {
    let pg = g.length - 1, ps = s.length - 1, nums = 0
    g.sort((a, b) => a - b)
    s.sort((a, b) => a - b)
    while (pg >= 0 && ps >= 0) {
        if (s[ps] >= g[pg]) {
            nums += 1
            ps -= 1
        }
        pg -= 1
    }
    return nums
}

// test
let g1 = [1, 2, 3], s1 = [1, 1]
let g2 = [1, 2], s2 = [1, 2, 3]
console.log(findContentChildren(g1, s1))
console.log(findContentChildren(g2, s2))
/**
 * @param {string} s
 * @return {string}
 */

var frequencySort = s => {
    s = s.split('')
    const number = {}
    const frequency = []
    s.forEach(item => number[item] ? number[item] += 1 : number[item] = 1)
    for (let item in number) {
        frequency.push({
            chara: item,
            number: number[item]
        })
    }
    frequency.sort((a, b) => b.number - a.number)
    return frequency.map(item => (item.chara.repeat(item.number))).join('')
}

// test
let s = 'Aabb'
console.log(frequencySort(s))
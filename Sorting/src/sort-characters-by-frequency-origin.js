/**
 * @param {string} s
 * @return {string}
 */

const frequencySort = s => {
    const discreteS = s.split('').sort()
    discreteS.push(undefined)
    const frequency = []
    let j = 0

    for (let i = 1; i < discreteS.length; i++) {
        if (discreteS[i] !== discreteS[i - 1]) {
            for (let inner = 0; inner < i - j; inner++) {
                frequency.push(i - j)
            }
            j = i
        }
    }

    const sortedFrequency = frequency.slice().sort((a, b) => b - a)
    const sortedS = []

    for (let i = 0; i < sortedFrequency.length; i++) {
        let pos = frequency.indexOf(sortedFrequency[i])
        frequency[pos] = NaN
        sortedS.push(discreteS[pos])
    }

    return sortedS.join('')
}

// test
let s = 'Aabb'
console.log(frequencySort(s))
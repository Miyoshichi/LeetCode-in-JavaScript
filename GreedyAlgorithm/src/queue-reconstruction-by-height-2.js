/**
 * @param {number[][]} people
 * @return {number[][]}
 */

const reconstructQueue = people => {
    people.sort((a, b) => a[0] === b[0] ? a[1] - b[1] : b[0] - a[0])
    const queue = []
    for (const p of people) {
        queue.splice(p[1], 0, p)
    }
    return queue
}

// test
let people = [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]
console.log(reconstructQueue(people))
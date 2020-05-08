/**
 * @param {number[][]} people
 * @return {number[][]}
 */

const reconstructQueue = people => {
    const queue = []
    people.sort((a, b) => a[1] === b[1] ? a[0] - b[0] : a[1] - b[1])
    for (let i = 0; i < people.length; i++) {
        if (people[i][1] === 0) {
            queue.push(people[i])
        } else {
            let nums = 0
            let length = queue.length
            let j = 0
            for (; j < length; j++) {
                let pos = j
                if (people[i][1] === nums) {
                    if (queue[pos][0] < people[i][0]) {
                            pos += 1
                        } else {
                            queue.splice(pos, 0, people[i])
                            break
                        }
                } else {
                    if (queue[j][0] >= people[i][0]) {
                        nums += 1
                    }
                }
            }
            if (nums === people.length - 1 ||
                (nums === people[i][1] && j === length)) {
                queue.push(people[i])
            }
        }
    }
    return queue
}

// test
let people = [[7, 0], [4, 4], [7, 1], [5, 0], [6, 1], [5, 2]]
console.log(reconstructQueue(people))
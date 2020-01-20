/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

var topKFrequent = (nums, k) => {
    nums.sort((a, b) => a - b)
    nums.push(NaN)
    const frequency = [0]
    let j = 0

    for (let i = 1; i < nums.length; i++) {
        if (nums[i] !== nums[i - 1]) {
            frequency.push(i - j)
            j = i
        }
    }

    const topK = []
    let index = 0
    const topKthFrequent = frequency.slice()
    topKthFrequent.sort((a, b) => b - a).splice(k)

    for (let i = 0; i < frequency.length; i++) {
        index += frequency[i]
        if (topKthFrequent.indexOf(frequency[i]) > -1) {
            topK.push(nums[index - 1])
        }
    }

    return topK
}

// test
const [nums, k] = [[1,1,1,2,2,3], 2]
console.log(topKFrequent(nums, k))
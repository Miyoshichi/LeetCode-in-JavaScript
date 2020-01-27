# 排序

* [1. 数组中的第K个最大元素](#1-数组中的第K个最大元素)
* [2. 前K个高频元素](#2-前K个高频元素)

# 1.  数组中的第K个最大元素

[#215  数组中的第K个最大元素](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

在未排序的数组中找到第 k 个最大的元素。请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。  
示例 1:
```html
输入: [3,2,1,5,6,4] 和 k = 2
输出: 5
```
示例 2:
```html
输入: [3,2,3,1,2,4,5,5,6] 和 k = 4
输出: 4
```

## 排序

[解答](src/kth-largest-element-in-an-array-1.js)

```JavaScript
var findKthLargest = (nums, k) => {
    nums.sort((a, b) => b - a)
    return nums[k - 1]
}
```

对数组由大至小排序，第 k 个元素就是第 k 大的元素。  
时间复杂度：O(NlogN)；空间复杂度：O(1)。

## 堆排序

[解答](src/kth-largest-element-in-an-array-2.js)

```JavaScript
var findKthLargest = (nums, k) => {
    let topK = nums.splice(0, k)
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] > Math.min(...topK)) {
            let j = topK.indexOf(Math.min(...topK))
            topK[j] = nums[i]
        }
    }
    return Math.min(...topK)
}
```

需要找出第 k 大的元素，可以设置一个大小为 k 的堆数组，用于放置原数组中最大的两个数。遍历原数组中的元素，当遍历到的元素比堆数组里最小的元素大时，替换掉堆数组中最小的元素。当原数组被全部遍历后，堆数组中最小的数就是原数组中第 k 大的数。  
时间复杂度：O(Nlogk)；空间复杂度：O(K)。

# 2. 前K个高频元素

[#347 前K个高频元素](https://leetcode-cn.com/problems/top-k-frequent-elements/)

给定一个非空的整数数组，返回其中出现频率前 k 高的元素。  
示例 1:
```html
输入: nums = [1,1,1,2,2,3], k = 2
输出: [1,2]
```
示例 2:
```html
输入: nums = [1], k = 1
输出: [1]
```

[解答](src/top-k-frequent-elements.js)

```JavaScript
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
```

首先对输入数组排序，计算数组中每个元素出现的频率后，输出到一个新的数组内。然后将频率数组排序后选取前 k 大的元素，即代表原输入数组中前 k 个高频元素的频率。因为原输入数组已经是有序数组，因此根据这些频率数组照片中元素的位置，即可推导出所对应的原输入数组的元素。  
时间复杂度：O(NlogN)；空间复杂度：O(K)。

# 3. 根据字符出现频率排序

[#451 根据字符出现频率排序](https://leetcode-cn.com/problems/sort-characters-by-frequency/)

给定一个字符串，请将字符串里的字符按照出现的频率降序排列。  
示例 1:
```html
输入:
"tree"
输出:
"eert"
```
示例 2:
```html
输入:
"cccaaa"
输出:
"cccaaa"
```
示例 3:
```html
输入:
"Aabb"
输出:
"bbAa"
```

[解答](src/sort-characters-by-frequency.js)

```JavaScript
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
    return frequency.map(item => item.chara.repeat(item.number)).join('')
}
```

首先统计输入字符串中各个字母的出现次数，并保存为一个对象，对象中每个元素的两个值分别为字母及其出现的次数。将这个对象按照字母的出现次数排序后，将字母按照出现次数提取出来。  
时间复杂度：O(N)；空间复杂度O(2K)。
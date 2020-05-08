# 排序

* [1. 数组中的第K个最大元素](#1-数组中的第K个最大元素)
* [2. 前K个高频元素](#2-前K个高频元素)
* [3. 根据字符出现频率排序](#3-根据字符出现频率排序)
* [4. 颜色分类](#4-颜色分类)

# 1.  数组中的第K个最大元素

[#215  数组中的第K个最大元素（中等）](https://leetcode-cn.com/problems/kth-largest-element-in-an-array/)

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
const findKthLargest = (nums, k) => {
    nums.sort((a, b) => b - a)
    return nums[k - 1]
}
```

对数组由大至小排序，第 k 个元素就是第 k 大的元素。  
时间复杂度：O(NlogN)；空间复杂度：O(1)。

## 堆排序

[解答](src/kth-largest-element-in-an-array-2.js)

```JavaScript
const findKthLargest = (nums, k) => {
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

[#347 前K个高频元素（中等）](https://leetcode-cn.com/problems/top-k-frequent-elements/)

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
const topKFrequent = (nums, k) => {
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

[#451 根据字符出现频率排序（中等）](https://leetcode-cn.com/problems/sort-characters-by-frequency/)

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
const frequencySort = s => {
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

# 4. 颜色分类

[#75 颜色分类（中等）](https://leetcode-cn.com/problems/sort-colors/)

给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。  
此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。  
示例:
```html
输入: [2,0,2,1,1,0]
输出: [0,0,1,1,2,2]
```

## 两次扫描

[解答](src/sort-colors-1.js)

```JavaScript
const sortColors = nums => {
    const elementNum = {}
    const colors = []
    nums.forEach(element => {
        elementNum[element] ?
        elementNum[element] += 1 :
        elementNum[element] = 1})
    for (key in elementNum) {
        colors.push(key.repeat(elementNum[key]))
    }
    flag = colors.join('').split('')
    for (let i = 0; i < nums.length; i++) {
        nums.splice(i, 1, parseInt(flag[i]))
    }
}
```

首先遍历一遍输入的数组，分别计算出数组中0、1和2元素的个数，然后按照要求的顺序重写数组。  
时间复杂度：O(N)；空间复杂度：O(N)。

## 一次扫描

[解答](src/sort-colors-2.js)

```JavaScript
const sortColors = nums => {
    let p0 = 0, curr = 0, p2 = nums.length - 1
    for (;curr <= p2;) {
        if (nums[curr] === 0) {
            [nums[curr], nums[p0]] = [nums[p0], nums[curr]]
            p0 += 1
            curr += 1
        } else if (nums[curr] === 2) {
            [nums[curr], nums[p2]] = [nums[p2], nums[curr]]
            p2 -= 1
        } else {
            curr += 1
        }
    }
}
```

这题是被称为荷兰国旗问题，利用题目中只用了0、1和2代表三种颜色的特征，可以设置p0、curr、p2三个指针，分别指向0的最右边界、当前元素和2的最左边界。其中指向当前元素的curr指针沿着数组移动，当当前元素值为0时，则与p0指针指向的元素互换，同时这两个指针同时向右移动；当当前元素为1时，curr指针向右移动；当当前元素为2时，则与p2指针指向的元素互换，同时p2指针向左移动。  
时间复杂度：O(N)；空间复杂度O(1)。
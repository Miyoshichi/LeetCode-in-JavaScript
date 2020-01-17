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
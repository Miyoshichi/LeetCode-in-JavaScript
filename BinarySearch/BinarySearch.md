# 二分查找

* [1. x的平方根](#1-x的平方根)

# 1. x的平方根

[#69 x 的平方根（简单）](https://leetcode-cn.com/problems/sqrtx/)、

实现 int sqrt(int x) 函数。
计算并返回 x 的平方根，其中 x 是非负整数。
由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。
示例 1:
```html
输入: 4
输出: 2
```
示例 2:
```html
输入: 8
输出: 2
说明: 8 的平方根是 2.82842..., 
     由于返回类型是整数，小数部分将被舍去。
```

[解答](src/sqrtx.js)

```JavaScript
const mySqrt = (x) => {
    let lo = 0, hi = x, ans = 0

    while (lo < hi && hi - lo > 1e-6) {
        let mid = lo + (hi -lo) / 2
        mid**2 > x ? hi = mid : lo = mid;
        ans = Math.floor(mid)
    }

    return ans = ((ans + 1)**2 <= x) ? ans + 1 : ans
}
```

一个数 x 的算术平方根必然位于区间(0, x)中，因此可利用二分法，在范围 0 ~ x 中寻找。题目中要求保留算术平方根的整数部分，由于精度的原因，当出现解析解为正整数时，二分法求得的数值解 ans 可能为一个不大于解析解的小数，因此需要判断 ans 和 ans+1 中的哪一个才是正确的解。  
时间复杂度：O(logN)；空间复杂度：O(1)。
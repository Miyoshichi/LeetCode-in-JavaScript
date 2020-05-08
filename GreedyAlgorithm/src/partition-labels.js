/**
 * @param {string} S
 * @return {number[]}
 */
const partitionLabels = (S) => {
    const charactersInS = []
    const posInS = []
    const partitionNum = []
    const arrS = S.split('')
    
    arrS.forEach((item) => {
        if (charactersInS.indexOf(item) === -1) {
            charactersInS.push(item)
        }
    })

    charactersInS.forEach((item) => {
        const pos = []
        let current = S.indexOf(item)
        while (current > -1) {
            current = S.indexOf(item, current)
            if (current > -1) {
                pos.push(current)
                current += 1
            } else {
                break
            }
        }
        pos.length > 1 ? pos.splice(1, pos.length - 2) : pos.push(pos[0])
        posInS.push(pos)
    })

    let leftPos = 0
    let partied = 0
    for (let i = 1; i < posInS.length; i++) {
        let res = posInS.slice(0, i)
        if (posInS[i][0] > Math.max(...res.flat())) {
            let partition = posInS.slice(leftPos, i)
            let num = Math.max(...partition.flat())
                      - Math.min(...partition.flat()) + 1
            partitionNum.push(num)
            leftPos = i
            partied += num
        }
    }
    partitionNum.push(S.length - partied)
    
    return partitionNum
}

// test
let S = 'ababcbacadefegdehijhklij'
console.log(partitionLabels(S))
export const setThousandSign: (number: number | string) => string = function(number: number | string): string{
  if (!number) {
    if (number === 0) {
      return `${number}`
    }
    return '-'
  }
  const numberString = `${number}`
  const isNegative = numberString.startsWith('-')
  let numberList = (isNegative ? numberString.slice(1) : numberString).split('.')
  let list: string[] = []
  numberList[0]
    .split('')
    .reverse()
    .map(function(item: string, idx: number): boolean {
      if (idx && idx % 3 === 0) {
        item += ','
      }
      list.push(item)
      return false
    })
  numberList[0] = list.reverse().join('')
  const resultNumber = numberList.join('.')
  return isNegative ? `-${resultNumber}` : resultNumber
}

export default setThousandSign

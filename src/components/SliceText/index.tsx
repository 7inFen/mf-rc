import React from 'react'

interface IProps {
  text: string,
  length?: number,
  showTitle?: boolean
}

const getTextLength = (text = '', length = 0) => {
  let num = 0
  let lengthIdx = 0
  text.split('').forEach(t => {
    if (/[\u4e00-\u9fa5]/.test(t)) {
      num += 2
    } else {
      num += 1
    }
    if (length && num <= length) {
      lengthIdx += 1
    }
  })
  return [num, lengthIdx || text.length]
}

export default function SliceText(props: IProps) {
  // console.log(props)
  const { text = '', length = 0, showTitle = true } = props
  const [textLength, lengthIdx] = getTextLength(text, length)
  let resultText = text
  if (length && textLength > length) {
    resultText = `${text.slice(0, lengthIdx)}...`
  }
  return <span title={showTitle ? text : ''}>{resultText}</span>
}

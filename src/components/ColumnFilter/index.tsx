import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, Popover, Button } from 'antd'
// import Button from './Button'
import styled from 'styled-components'
import cx from 'classnames'
import storage from 'store'
// import { ColumnSuffixIcon } from '../styled/suffixIcon'
 
// let getItemValue = item => item.value || item.dataIndex || item.key
let getItemValue = item => item.key || item.value || item.dataIndex
 
const STORAGE_KEY = 'columnFilter'
 
const StyledFilterBtn = styled(Button)`
  /* padding: 0 !important;
  width: 40px !important;
  height: 40px !important;
  display: flex !important;
  justify-content: center;
  align-items: center;
  border: none !important;
  background: #014F89;
  &.hasFilter {
    background: #014F89 !important;
  } */
`
 
export default class CustomColumn extends Component {
  // static propTypes = {
  //   data: PropTypes.array,
  //   onChange: PropTypes.func,
  //   width: PropTypes.number,
  //   contentWidth: PropTypes.number,
  //   columnKey: PropTypes.string,
  // }
 
  constructor (props) {
    super(props)
    this.KEY = window.location.pathname
    this.state = {
      KEY: this.KEY,
      value: [],
      hideValue: [],
      columnKey: ''
    }
  }
 
  static getDerivedStateFromProps (nextProps, prevState) {
    const { data, onChange, columnKey } = nextProps
    const { columnKey: columnKeyInState, KEY } = prevState
    if (columnKey !== columnKeyInState) {
      const columnFilter = storage.get(STORAGE_KEY) || {}
      const hideValue = columnFilter[columnKey || KEY] || []
      const showedCol = []
      data.forEach(item => {
        if (item.unfilter || (!hideValue.includes(getItemValue(item)) && !item.hide)) {
          showedCol.push(item)
        }
      })
      const showedColValue = showedCol.map(item => getItemValue(item))
      // console.log(data, showedCol, hideValue)
 
      onChange(showedCol, showedColValue)
      return {
        value: showedColValue,
        hideValue,
        columnKey
      }
    }
    return null
  }
 
  componentDidMount = () => {
    // 初始化从storage读数据
    this.initColumns()
  }
 
  initColumns = () => {
    // console.log(this.props)
    const { data = [], onChange = () => { } } = this.props
    const columnFilter = storage.get(STORAGE_KEY) || {}
    const values = columnFilter[this.props.columnKey || this.KEY]
    let result = []
    if (values instanceof Array) {
      // storage中未被过滤的column
      result = data.filter(item => !values.includes(getItemValue(item)))
    } else {
      // 未被隐藏的column
      result = data.filter(item => !item.hide)
    }
    const defaultValue = []
    result.forEach(col => {
      if (!col.unfilter) {
        defaultValue.push(getItemValue(col))
      }
    })
    this.setState({
      value: defaultValue,
      hideValue: values instanceof Array ? values : []
    })
    onChange(result, defaultValue)
  }
 
  setStorage = values => {
    const columnFilter = storage.get(STORAGE_KEY) || {}
    columnFilter[this.props.columnKey || this.KEY] = values
    storage.set(STORAGE_KEY, columnFilter)
  }
 
  handleChange = value => {
    const { data = [] } = this.props
    const showedCol = []
    const hideValue = []
    data.forEach(item => {
      if (item.unfilter || value.includes(getItemValue(item))) {
        showedCol.push(item)
      } else {
        hideValue.push(getItemValue(item))
      }
    })
    this.setState({
      value,
      hideValue
    })
    // console.log(data, showedCol, hideValue, value)
    this.props.onChange(showedCol, value)
    this.setStorage(hideValue)
  }
 
  dropDownContent = () => {
    const { data = [] } = this.props
    const { value = [] } = this.state
 
    const showedList = data.filter(item => !item.unfilter)
    return (
      <Checkbox.Group
        onChange={this.handleChange}
        value={value}>
        {showedList.map((item, index) => {
          let value = getItemValue(item)
          let label = item.label || item.title
          let disabled = !!item.disabled
          return (
            <div key={value}>
              <Checkbox style={{ whiteSpace:'nowrap' }} value={value} disabled={disabled}>
                {label}
              </Checkbox>
            </div>
          )
        })}
      </Checkbox.Group>
    )
  }
 
  checkHasFilter = () => {
    const showedList = this.props.data.filter(item => !item.unfilter)
    const value = this.state.value
    return value.length < showedList.length
  }
 
  render () {
    const { children } = this.props
    return (
      <Popover
        // title='选择展示项'
        // placement='topRight'
        trigger='click'
        content={this.dropDownContent()}
        overlayClassName='column-filter'
      >
        {children || (
          <StyledFilterBtn
            // type='primary'
            className={
              cx({
                hasFilter: this.checkHasFilter()
              })
            }
          >
            Toggle
          </StyledFilterBtn>
        )}
      </Popover>
    )
  }
}
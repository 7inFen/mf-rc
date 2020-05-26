import React from 'react'
import { Checkbox, Popover, Button } from 'antd'
import cx from 'classnames'
import storage from 'store'

interface IComponentProps {
  data: IItem[],
  onChange: (list: IItem[], value: string[]) => void,
  columnKey?: string
}

interface IItem {
  dataIndex: string,
  key?: string,
  value?: string,
  unfilter?: boolean,
  hide?: boolean,
  [propName: string]: any
}

let getItemValue = (item: IItem): string => item.key || item.value || item.dataIndex
 
const STORAGE_KEY = 'columnFilter'

export default class CustomColumn extends React.Component<IComponentProps, any> {
  KEY: any
  constructor(props: IComponentProps) {
    super(props)
    this.KEY = window.location.pathname
    this.state = {
      KEY: this.KEY,
      value: [],
      hideValue: [],
      columnKey: ''
    }
  }
 
  static getDerivedStateFromProps(nextProps: IComponentProps, prevState: any) {
    const { data, onChange, columnKey } = nextProps
    const { columnKey: columnKeyInState, KEY } = prevState
    if (columnKey !== columnKeyInState) {
      const columnFilter = storage.get(STORAGE_KEY) || {}
      const hideValue = columnFilter[columnKey || KEY] || []
      const showedCol: IItem[] = []
      data.forEach((item: IItem): void => {
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
    const defaultValue: string[] = []
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
 
  setStorage = (values: string[]): void => {
    const columnFilter = storage.get(STORAGE_KEY) || {}
    columnFilter[this.props.columnKey || this.KEY] = values
    storage.set(STORAGE_KEY, columnFilter)
  }
 
  handleChange = (value: any[]): void => {
    const { data = [] } = this.props
    const showedCol: IItem[] = []
    const hideValue: string[] = []
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
    const renderElement: any = (
      children || (
        <Button
          type='primary'
          className={
            cx({
              hasFilter: this.checkHasFilter()
            })
          }
        >
          Toggle
        </Button>
      )
    )
    return (
      <Popover
        // title='选择展示项'
        // placement='topRight'
        trigger='click'
        content={this.dropDownContent()}
        overlayClassName='column-filter'
      >
        {renderElement}
      </Popover>
    )
  }
}
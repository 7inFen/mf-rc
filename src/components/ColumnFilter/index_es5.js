

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _antd = require("antd");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _classnames = _interopRequireDefault(require("classnames"));

var _store = _interopRequireDefault(require("store"));

let _ = t => t,
    _t;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// import { ColumnSuffixIcon } from '../styled/suffixIcon'
// let getItemValue = item => item.value || item.dataIndex || item.key
let getItemValue = item => item.key || item.value || item.dataIndex;

const STORAGE_KEY = 'columnFilter';
const StyledFilterBtn = (0, _styledComponents.default)(_antd.Button)(_t || (_t = _`
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
`));

class CustomColumnBtn extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "componentDidMount", () => {
      // 初始化从storage读数据
      this.initColumns();
    });

    _defineProperty(this, "initColumns", () => {
      // console.log(this.props)
      const {
        data = [],
        onChange = () => {}
      } = this.props;
      const columnFilter = _store.default.get(STORAGE_KEY) || {};
      const values = columnFilter[this.props.columnKey || this.KEY];
      let result = [];

      if (values instanceof Array) {
        // storage中未被过滤的column
        result = data.filter(item => !values.includes(getItemValue(item)));
      } else {
        // 未被隐藏的column
        result = data.filter(item => !item.hide);
      }

      const defaultValue = [];
      result.forEach(col => {
        if (!col.unfilter) {
          defaultValue.push(getItemValue(col));
        }
      });
      this.setState({
        value: defaultValue,
        hideValue: values instanceof Array ? values : []
      });
      onChange(result, defaultValue);
    });

    _defineProperty(this, "setStorage", values => {
      const columnFilter = _store.default.get(STORAGE_KEY) || {};
      columnFilter[this.props.columnKey || this.KEY] = values;

      _store.default.set(STORAGE_KEY, columnFilter);
    });

    _defineProperty(this, "handleChange", value => {
      const {
        data = []
      } = this.props;
      const showedCol = [];
      const hideValue = [];
      data.forEach(item => {
        if (item.unfilter || value.includes(getItemValue(item))) {
          showedCol.push(item);
        } else {
          hideValue.push(getItemValue(item));
        }
      });
      this.setState({
        value,
        hideValue
      }); // console.log(data, showedCol, hideValue, value)

      this.props.onChange(showedCol, value);
      this.setStorage(hideValue);
    });

    _defineProperty(this, "dropDownContent", () => {
      const {
        data = []
      } = this.props;
      const {
        value = []
      } = this.state;
      const showedList = data.filter(item => !item.unfilter);
      return /*#__PURE__*/_react.default.createElement(_antd.Checkbox.Group, {
        onChange: this.handleChange,
        value: value
      }, showedList.map((item, index) => {
        let value = getItemValue(item);
        let label = item.label || item.title;
        let disabled = !!item.disabled;
        return /*#__PURE__*/_react.default.createElement("div", {
          key: value
        }, /*#__PURE__*/_react.default.createElement(_antd.Checkbox, {
          style: {
            whiteSpace: 'nowrap'
          },
          value: value,
          disabled: disabled
        }, label));
      }));
    });

    _defineProperty(this, "checkHasFilter", () => {
      const showedList = this.props.data.filter(item => !item.unfilter);
      const value = this.state.value;
      return value.length < showedList.length;
    });

    this.KEY = window.location.pathname;
    this.state = {
      KEY: this.KEY,
      value: [],
      hideValue: [],
      columnKey: ''
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      data,
      onChange,
      columnKey
    } = nextProps;
    const {
      columnKey: columnKeyInState,
      KEY
    } = prevState;

    if (columnKey !== columnKeyInState) {
      const columnFilter = _store.default.get(STORAGE_KEY) || {};
      const hideValue = columnFilter[columnKey || KEY] || [];
      const showedCol = [];
      data.forEach(item => {
        if (item.unfilter || !hideValue.includes(getItemValue(item)) && !item.hide) {
          showedCol.push(item);
        }
      });
      const showedColValue = showedCol.map(item => getItemValue(item)); // console.log(data, showedCol, hideValue)

      onChange(showedCol, showedColValue);
      return {
        value: showedColValue,
        hideValue,
        columnKey
      };
    }

    return null;
  }

  render() {
    const {
      children
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_antd.Popover // title='选择展示项'
    // placement='topRight'
    , {
      trigger: "click",
      content: this.dropDownContent(),
      overlayClassName: "column-filter"
    }, children || /*#__PURE__*/_react.default.createElement(StyledFilterBtn, {
      type: "primary",
      className: (0, _classnames.default)({
        hasFilter: this.checkHasFilter()
      })
    }, "Toggle"));
  }

}

exports.default = CustomColumnBtn;

_defineProperty(CustomColumnBtn, "propTypes", {
  data: _propTypes.default.array,
  onChange: _propTypes.default.func,
  width: _propTypes.default.number,
  contentWidth: _propTypes.default.number,
  columnKey: _propTypes.default.string
});
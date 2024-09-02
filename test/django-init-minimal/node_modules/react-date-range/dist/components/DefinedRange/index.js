"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _styles = _interopRequireDefault(require("../../styles"));
var _defaultRanges = require("../../defaultRanges");
var _DayCell = require("../DayCell");
var _InputRangeField = _interopRequireDefault(require("../InputRangeField"));
var _classnames = _interopRequireDefault(require("classnames"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class DefinedRange extends _react.Component {
  constructor(props) {
    super(props);
    _defineProperty(this, "handleRangeChange", range => {
      const {
        onChange,
        ranges,
        focusedRange
      } = this.props;
      const selectedRange = ranges[focusedRange[0]];
      if (!onChange || !selectedRange) return;
      onChange({
        [selectedRange.key || `range${focusedRange[0] + 1}`]: {
          ...selectedRange,
          ...range
        }
      });
    });
    this.state = {
      rangeOffset: 0,
      focusedInput: -1
    };
  }
  getRangeOptionValue(option) {
    const {
      ranges = [],
      focusedRange = []
    } = this.props;
    if (typeof option.getCurrentValue !== 'function') {
      return '';
    }
    const selectedRange = ranges[focusedRange[0]] || {};
    return option.getCurrentValue(selectedRange) || '';
  }
  getSelectedRange(ranges, staticRange) {
    const focusedRangeIndex = ranges.findIndex(range => {
      if (!range.startDate || !range.endDate || range.disabled) return false;
      return staticRange.isSelected(range);
    });
    const selectedRange = ranges[focusedRangeIndex];
    return {
      selectedRange,
      focusedRangeIndex
    };
  }
  render() {
    const {
      headerContent,
      footerContent,
      onPreviewChange,
      inputRanges,
      staticRanges,
      ranges,
      renderStaticRangeLabel,
      rangeColors,
      className
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: (0, _classnames.default)(_styles.default.definedRangesWrapper, className)
    }, headerContent, /*#__PURE__*/_react.default.createElement("div", {
      className: _styles.default.staticRanges
    }, staticRanges.map((staticRange, i) => {
      const {
        selectedRange,
        focusedRangeIndex
      } = this.getSelectedRange(ranges, staticRange);
      let labelContent;
      if (staticRange.hasCustomRendering) {
        labelContent = renderStaticRangeLabel(staticRange);
      } else {
        labelContent = staticRange.label;
      }
      return /*#__PURE__*/_react.default.createElement("button", {
        type: "button",
        className: (0, _classnames.default)(_styles.default.staticRange, {
          [_styles.default.staticRangeSelected]: Boolean(selectedRange)
        }),
        style: {
          color: selectedRange ? selectedRange.color || rangeColors[focusedRangeIndex] : null
        },
        key: i,
        onClick: () => this.handleRangeChange(staticRange.range(this.props)),
        onFocus: () => onPreviewChange && onPreviewChange(staticRange.range(this.props)),
        onMouseOver: () => onPreviewChange && onPreviewChange(staticRange.range(this.props)),
        onMouseLeave: () => {
          onPreviewChange && onPreviewChange();
        }
      }, /*#__PURE__*/_react.default.createElement("span", {
        tabIndex: -1,
        className: _styles.default.staticRangeLabel
      }, labelContent));
    })), /*#__PURE__*/_react.default.createElement("div", {
      className: _styles.default.inputRanges
    }, inputRanges.map((rangeOption, i) => /*#__PURE__*/_react.default.createElement(_InputRangeField.default, {
      key: i,
      styles: _styles.default,
      label: rangeOption.label,
      onFocus: () => this.setState({
        focusedInput: i,
        rangeOffset: 0
      }),
      onBlur: () => this.setState({
        rangeOffset: 0
      }),
      onChange: value => this.handleRangeChange(rangeOption.range(value, this.props)),
      value: this.getRangeOptionValue(rangeOption)
    }))), footerContent);
  }
}
DefinedRange.propTypes = {
  inputRanges: _propTypes.default.array,
  staticRanges: _propTypes.default.array,
  ranges: _propTypes.default.arrayOf(_DayCell.rangeShape),
  focusedRange: _propTypes.default.arrayOf(_propTypes.default.number),
  onPreviewChange: _propTypes.default.func,
  onChange: _propTypes.default.func,
  footerContent: _propTypes.default.any,
  headerContent: _propTypes.default.any,
  rangeColors: _propTypes.default.arrayOf(_propTypes.default.string),
  className: _propTypes.default.string,
  renderStaticRangeLabel: _propTypes.default.func
};
DefinedRange.defaultProps = {
  inputRanges: _defaultRanges.defaultInputRanges,
  staticRanges: _defaultRanges.defaultStaticRanges,
  ranges: [],
  rangeColors: ['#3d91ff', '#3ecf8e', '#fed14c'],
  focusedRange: [0, 0]
};
var _default = exports.default = DefinedRange;
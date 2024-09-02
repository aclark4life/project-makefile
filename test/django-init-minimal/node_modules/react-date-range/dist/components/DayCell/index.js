"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rangeShape = exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _dateFns = require("date-fns");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); } /* eslint-disable no-fallthrough */
class DayCell extends _react.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "handleKeyEvent", event => {
      const {
        day,
        onMouseDown,
        onMouseUp
      } = this.props;
      if ([13 /* space */, 32 /* enter */].includes(event.keyCode)) {
        if (event.type === 'keydown') onMouseDown(day);else onMouseUp(day);
      }
    });
    _defineProperty(this, "handleMouseEvent", event => {
      const {
        day,
        disabled,
        onPreviewChange,
        onMouseEnter,
        onMouseDown,
        onMouseUp
      } = this.props;
      const stateChanges = {};
      if (disabled) {
        onPreviewChange();
        return;
      }
      switch (event.type) {
        case 'mouseenter':
          onMouseEnter(day);
          onPreviewChange(day);
          stateChanges.hover = true;
          break;
        case 'blur':
        case 'mouseleave':
          stateChanges.hover = false;
          break;
        case 'mousedown':
          stateChanges.active = true;
          onMouseDown(day);
          break;
        case 'mouseup':
          event.stopPropagation();
          stateChanges.active = false;
          onMouseUp(day);
          break;
        case 'focus':
          onPreviewChange(day);
          break;
      }
      if (Object.keys(stateChanges).length) {
        this.setState(stateChanges);
      }
    });
    _defineProperty(this, "getClassNames", () => {
      const {
        isPassive,
        isToday,
        isWeekend,
        isStartOfWeek,
        isEndOfWeek,
        isStartOfMonth,
        isEndOfMonth,
        disabled,
        styles
      } = this.props;
      return (0, _classnames.default)(styles.day, {
        [styles.dayPassive]: isPassive,
        [styles.dayDisabled]: disabled,
        [styles.dayToday]: isToday,
        [styles.dayWeekend]: isWeekend,
        [styles.dayStartOfWeek]: isStartOfWeek,
        [styles.dayEndOfWeek]: isEndOfWeek,
        [styles.dayStartOfMonth]: isStartOfMonth,
        [styles.dayEndOfMonth]: isEndOfMonth,
        [styles.dayHovered]: this.state.hover,
        [styles.dayActive]: this.state.active
      });
    });
    _defineProperty(this, "renderPreviewPlaceholder", () => {
      const {
        preview,
        day,
        styles
      } = this.props;
      if (!preview) return null;
      const startDate = preview.startDate ? (0, _dateFns.endOfDay)(preview.startDate) : null;
      const endDate = preview.endDate ? (0, _dateFns.startOfDay)(preview.endDate) : null;
      const isInRange = (!startDate || (0, _dateFns.isAfter)(day, startDate)) && (!endDate || (0, _dateFns.isBefore)(day, endDate));
      const isStartEdge = !isInRange && (0, _dateFns.isSameDay)(day, startDate);
      const isEndEdge = !isInRange && (0, _dateFns.isSameDay)(day, endDate);
      return /*#__PURE__*/_react.default.createElement("span", {
        className: (0, _classnames.default)({
          [styles.dayStartPreview]: isStartEdge,
          [styles.dayInPreview]: isInRange,
          [styles.dayEndPreview]: isEndEdge
        }),
        style: {
          color: preview.color
        }
      });
    });
    _defineProperty(this, "renderSelectionPlaceholders", () => {
      const {
        styles,
        ranges,
        day
      } = this.props;
      if (this.props.displayMode === 'date') {
        let isSelected = (0, _dateFns.isSameDay)(this.props.day, this.props.date);
        return isSelected ? /*#__PURE__*/_react.default.createElement("span", {
          className: styles.selected,
          style: {
            color: this.props.color
          }
        }) : null;
      }
      const inRanges = ranges.reduce((result, range) => {
        let startDate = range.startDate;
        let endDate = range.endDate;
        if (startDate && endDate && (0, _dateFns.isBefore)(endDate, startDate)) {
          [startDate, endDate] = [endDate, startDate];
        }
        startDate = startDate ? (0, _dateFns.endOfDay)(startDate) : null;
        endDate = endDate ? (0, _dateFns.startOfDay)(endDate) : null;
        const isInRange = (!startDate || (0, _dateFns.isAfter)(day, startDate)) && (!endDate || (0, _dateFns.isBefore)(day, endDate));
        const isStartEdge = !isInRange && (0, _dateFns.isSameDay)(day, startDate);
        const isEndEdge = !isInRange && (0, _dateFns.isSameDay)(day, endDate);
        if (isInRange || isStartEdge || isEndEdge) {
          return [...result, {
            isStartEdge,
            isEndEdge: isEndEdge,
            isInRange,
            ...range
          }];
        }
        return result;
      }, []);
      return inRanges.map((range, i) => /*#__PURE__*/_react.default.createElement("span", {
        key: i,
        className: (0, _classnames.default)({
          [styles.startEdge]: range.isStartEdge,
          [styles.endEdge]: range.isEndEdge,
          [styles.inRange]: range.isInRange
        }),
        style: {
          color: range.color || this.props.color
        }
      }));
    });
    this.state = {
      hover: false,
      active: false
    };
  }
  render() {
    const {
      dayContentRenderer
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("button", _extends({
      type: "button",
      onMouseEnter: this.handleMouseEvent,
      onMouseLeave: this.handleMouseEvent,
      onFocus: this.handleMouseEvent,
      onMouseDown: this.handleMouseEvent,
      onMouseUp: this.handleMouseEvent,
      onBlur: this.handleMouseEvent,
      onPauseCapture: this.handleMouseEvent,
      onKeyDown: this.handleKeyEvent,
      onKeyUp: this.handleKeyEvent,
      className: this.getClassNames(this.props.styles)
    }, this.props.disabled || this.props.isPassive ? {
      tabIndex: -1
    } : {}, {
      style: {
        color: this.props.color
      }
    }), this.renderSelectionPlaceholders(), this.renderPreviewPlaceholder(), /*#__PURE__*/_react.default.createElement("span", {
      className: this.props.styles.dayNumber
    }, dayContentRenderer?.(this.props.day) || /*#__PURE__*/_react.default.createElement("span", null, (0, _dateFns.format)(this.props.day, this.props.dayDisplayFormat))));
  }
}
DayCell.defaultProps = {};
const rangeShape = exports.rangeShape = _propTypes.default.shape({
  startDate: _propTypes.default.object,
  endDate: _propTypes.default.object,
  color: _propTypes.default.string,
  key: _propTypes.default.string,
  autoFocus: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  showDateDisplay: _propTypes.default.bool
});
DayCell.propTypes = {
  day: _propTypes.default.object.isRequired,
  dayDisplayFormat: _propTypes.default.string,
  date: _propTypes.default.object,
  ranges: _propTypes.default.arrayOf(rangeShape),
  preview: _propTypes.default.shape({
    startDate: _propTypes.default.object,
    endDate: _propTypes.default.object,
    color: _propTypes.default.string
  }),
  onPreviewChange: _propTypes.default.func,
  previewColor: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  isPassive: _propTypes.default.bool,
  isToday: _propTypes.default.bool,
  isWeekend: _propTypes.default.bool,
  isStartOfWeek: _propTypes.default.bool,
  isEndOfWeek: _propTypes.default.bool,
  isStartOfMonth: _propTypes.default.bool,
  isEndOfMonth: _propTypes.default.bool,
  color: _propTypes.default.string,
  displayMode: _propTypes.default.oneOf(['dateRange', 'date']),
  styles: _propTypes.default.object,
  onMouseDown: _propTypes.default.func,
  onMouseUp: _propTypes.default.func,
  onMouseEnter: _propTypes.default.func,
  dayContentRenderer: _propTypes.default.func
};
var _default = exports.default = DayCell;
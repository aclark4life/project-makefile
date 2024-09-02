"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
const MIN = 0;
const MAX = 99999;
class InputRangeField extends _react.Component {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "onChange", e => {
      const {
        onChange
      } = this.props;
      let value = parseInt(e.target.value, 10);
      value = isNaN(value) ? 0 : Math.max(Math.min(MAX, value), MIN);
      onChange(value);
    });
  }
  shouldComponentUpdate(nextProps) {
    const {
      value,
      label,
      placeholder
    } = this.props;
    return value !== nextProps.value || label !== nextProps.label || placeholder !== nextProps.placeholder;
  }
  render() {
    const {
      label,
      placeholder,
      value,
      styles,
      onBlur,
      onFocus
    } = this.props;
    return /*#__PURE__*/_react.default.createElement("div", {
      className: styles.inputRange
    }, /*#__PURE__*/_react.default.createElement("input", {
      className: styles.inputRangeInput,
      placeholder: placeholder,
      value: value,
      min: MIN,
      max: MAX,
      onChange: this.onChange,
      onFocus: onFocus,
      onBlur: onBlur
    }), /*#__PURE__*/_react.default.createElement("span", {
      className: styles.inputRangeLabel
    }, label));
  }
}
InputRangeField.propTypes = {
  value: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.number]),
  label: _propTypes.default.oneOfType([_propTypes.default.element, _propTypes.default.node]).isRequired,
  placeholder: _propTypes.default.string,
  styles: _propTypes.default.shape({
    inputRange: _propTypes.default.string,
    inputRangeInput: _propTypes.default.string,
    inputRangeLabel: _propTypes.default.string
  }).isRequired,
  onBlur: _propTypes.default.func.isRequired,
  onFocus: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired
};
InputRangeField.defaultProps = {
  value: '',
  placeholder: '-'
};
var _default = exports.default = InputRangeField;
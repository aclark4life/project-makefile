"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _classnames = _interopRequireDefault(require("classnames"));
var _dateFns = require("date-fns");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
class DateInput extends _react.PureComponent {
  constructor(props, context) {
    super(props, context);
    _defineProperty(this, "onKeyDown", e => {
      const {
        value
      } = this.state;
      if (e.key === 'Enter') {
        this.update(value);
      }
    });
    _defineProperty(this, "onChange", e => {
      this.setState({
        value: e.target.value,
        changed: true,
        invalid: false
      });
    });
    _defineProperty(this, "onBlur", () => {
      const {
        value
      } = this.state;
      this.update(value);
    });
    this.state = {
      invalid: false,
      changed: false,
      value: this.formatDate(props)
    };
  }
  componentDidUpdate(prevProps) {
    const {
      value
    } = prevProps;
    if (!(0, _dateFns.isEqual)(value, this.props.value)) {
      this.setState({
        value: this.formatDate(this.props)
      });
    }
  }
  formatDate(_ref) {
    let {
      value,
      dateDisplayFormat,
      dateOptions
    } = _ref;
    if (value && (0, _dateFns.isValid)(value)) {
      return (0, _dateFns.format)(value, dateDisplayFormat, dateOptions);
    }
    return '';
  }
  update(value) {
    const {
      invalid,
      changed
    } = this.state;
    if (invalid || !changed || !value) {
      return;
    }
    const {
      onChange,
      dateDisplayFormat,
      dateOptions
    } = this.props;
    const parsed = (0, _dateFns.parse)(value, dateDisplayFormat, new Date(), dateOptions);
    if ((0, _dateFns.isValid)(parsed)) {
      this.setState({
        changed: false
      }, () => onChange(parsed));
    } else {
      this.setState({
        invalid: true
      });
    }
  }
  render() {
    const {
      className,
      readOnly,
      placeholder,
      ariaLabel,
      disabled,
      onFocus
    } = this.props;
    const {
      value,
      invalid
    } = this.state;
    return /*#__PURE__*/_react.default.createElement("span", {
      className: (0, _classnames.default)('rdrDateInput', className)
    }, /*#__PURE__*/_react.default.createElement("input", {
      readOnly: readOnly,
      disabled: disabled,
      value: value,
      placeholder: placeholder,
      "aria-label": ariaLabel,
      onKeyDown: this.onKeyDown,
      onChange: this.onChange,
      onBlur: this.onBlur,
      onFocus: onFocus
    }), invalid && /*#__PURE__*/_react.default.createElement("span", {
      className: "rdrWarning"
    }, "\u26A0"));
  }
}
DateInput.propTypes = {
  value: _propTypes.default.object,
  placeholder: _propTypes.default.string,
  disabled: _propTypes.default.bool,
  readOnly: _propTypes.default.bool,
  dateOptions: _propTypes.default.object,
  dateDisplayFormat: _propTypes.default.string,
  ariaLabel: _propTypes.default.string,
  className: _propTypes.default.string,
  onFocus: _propTypes.default.func.isRequired,
  onChange: _propTypes.default.func.isRequired
};
DateInput.defaultProps = {
  readOnly: true,
  disabled: false,
  dateDisplayFormat: 'MMM D, YYYY'
};
var _default = exports.default = DateInput;
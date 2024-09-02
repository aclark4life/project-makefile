"use strict";

var _react = _interopRequireDefault(require("react"));
var _dateFns = require("date-fns");
var _DateRange = _interopRequireDefault(require("../DateRange"));
var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
let testRenderer = null;
let instance = null;
const endDate = new Date();
const startDate = (0, _dateFns.subDays)(endDate, 7);
const commonProps = {
  ranges: [{
    startDate,
    endDate,
    key: 'selection'
  }],
  onChange: () => {},
  moveRangeOnFirstSelection: false
};
const compareRanges = (newRange, assertionRange) => {
  ['startDate', 'endDate'].forEach(key => {
    if (!newRange[key] || !assertionRange[key]) {
      return expect(newRange[key]).toEqual(assertionRange[key]);
    }
    return expect((0, _dateFns.isSameDay)(newRange[key], assertionRange[key])).toEqual(true);
  });
};
beforeEach(() => {
  testRenderer = _reactTestRenderer.default.create( /*#__PURE__*/_react.default.createElement(_DateRange.default, commonProps));
  instance = testRenderer.getInstance();
});
describe('DateRange', () => {
  test('Should resolve', () => {
    expect(_DateRange.default).toEqual(expect.anything());
  });
  test('calculate new selection by resetting end date', () => {
    const methodResult = instance.calcNewSelection((0, _dateFns.subDays)(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: (0, _dateFns.subDays)(endDate, 10),
      endDate: (0, _dateFns.subDays)(endDate, 10)
    });
  });
  test('calculate new selection by resetting end date if start date is not before', () => {
    const methodResult = instance.calcNewSelection((0, _dateFns.addDays)(endDate, 2), true);
    compareRanges(methodResult.range, {
      startDate: (0, _dateFns.addDays)(endDate, 2),
      endDate: (0, _dateFns.addDays)(endDate, 2)
    });
  });
  test('calculate new selection based on moveRangeOnFirstSelection prop', () => {
    testRenderer.update( /*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({}, commonProps, {
      moveRangeOnFirstSelection: true
    })));
    const methodResult = instance.calcNewSelection((0, _dateFns.subDays)(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: (0, _dateFns.subDays)(endDate, 10),
      endDate: (0, _dateFns.subDays)(endDate, 3)
    });
  });
  test('calculate new selection by retaining end date, based on retainEndDateOnFirstSelection prop', () => {
    testRenderer.update( /*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({}, commonProps, {
      retainEndDateOnFirstSelection: true
    })));
    const methodResult = instance.calcNewSelection((0, _dateFns.subDays)(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: (0, _dateFns.subDays)(endDate, 10),
      endDate
    });
  });
  test('calculate new selection by retaining the unset end date, based on retainEndDateOnFirstSelection prop', () => {
    testRenderer.update( /*#__PURE__*/_react.default.createElement(_DateRange.default, _extends({}, commonProps, {
      ranges: [{
        ...commonProps.ranges[0],
        endDate: null
      }],
      retainEndDateOnFirstSelection: true
    })));
    const methodResult = instance.calcNewSelection((0, _dateFns.subDays)(endDate, 10), true);
    compareRanges(methodResult.range, {
      startDate: (0, _dateFns.subDays)(endDate, 10),
      endDate: null
    });
  });
});
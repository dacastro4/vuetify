'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VDatePickerYears = exports.VDatePickerMonthTable = exports.VDatePickerDateTable = exports.VDatePickerHeader = exports.VDatePickerTitle = exports.VDatePicker = undefined;

var _VDatePicker = require('./VDatePicker');

var _VDatePicker2 = _interopRequireDefault(_VDatePicker);

var _VDatePickerTitle = require('./VDatePickerTitle');

var _VDatePickerTitle2 = _interopRequireDefault(_VDatePickerTitle);

var _VDatePickerHeader = require('./VDatePickerHeader');

var _VDatePickerHeader2 = _interopRequireDefault(_VDatePickerHeader);

var _VDatePickerDateTable = require('./VDatePickerDateTable');

var _VDatePickerDateTable2 = _interopRequireDefault(_VDatePickerDateTable);

var _VDatePickerMonthTable = require('./VDatePickerMonthTable');

var _VDatePickerMonthTable2 = _interopRequireDefault(_VDatePickerMonthTable);

var _VDatePickerYears = require('./VDatePickerYears');

var _VDatePickerYears2 = _interopRequireDefault(_VDatePickerYears);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.VDatePicker = _VDatePicker2.default;
exports.VDatePickerTitle = _VDatePickerTitle2.default;
exports.VDatePickerHeader = _VDatePickerHeader2.default;
exports.VDatePickerDateTable = _VDatePickerDateTable2.default;
exports.VDatePickerMonthTable = _VDatePickerMonthTable2.default;
exports.VDatePickerYears = _VDatePickerYears2.default;

/* istanbul ignore next */

_VDatePicker2.default.install = function install(Vue) {
  Vue.component(_VDatePicker2.default.name, _VDatePicker2.default);
  Vue.component(_VDatePickerTitle2.default.name, _VDatePickerTitle2.default);
  Vue.component(_VDatePickerHeader2.default.name, _VDatePickerHeader2.default);
  Vue.component(_VDatePickerDateTable2.default.name, _VDatePickerDateTable2.default);
  Vue.component(_VDatePickerMonthTable2.default.name, _VDatePickerMonthTable2.default);
  Vue.component(_VDatePickerYears2.default.name, _VDatePickerYears2.default);
};

exports.default = _VDatePicker2.default;
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Components
import VBtn from '../VBtn';
import VCard from '../VCard';
import VIcon from '../VIcon';
import VDatePickerTitle from './VDatePickerTitle';
import VDatePickerHeader from './VDatePickerHeader';
import VDatePickerDateTable from './VDatePickerDateTable';
import VDatePickerMonthTable from './VDatePickerMonthTable';
import VDatePickerYears from './VDatePickerYears';

// Mixins
import Picker from '../../mixins/picker';

// Utils
import { pad, createNativeLocaleFormatter } from './util';
import isValueAllowed from '../../util/isValueAllowed';

export default {
  name: 'v-date-picker',

  components: {
    VBtn: VBtn,
    VCard: VCard,
    VIcon: VIcon,
    VDatePickerTitle: VDatePickerTitle,
    VDatePickerHeader: VDatePickerHeader,
    VDatePickerDateTable: VDatePickerDateTable,
    VDatePickerMonthTable: VDatePickerMonthTable,
    VDatePickerYears: VDatePickerYears
  },

  mixins: [Picker],

  data: function data() {
    var now = new Date();
    return {
      activePicker: this.type.toUpperCase(),
      defaultColor: 'accent',
      isReversing: false,
      now: now,
      originalDate: this.value,
      // tableDate is a string in 'YYYY' / 'YYYY-M' format (leading zero for month is not required)
      tableDate: this.type === 'month' ? '' + now.getFullYear() : now.getFullYear() + '-' + (now.getMonth() + 1)
    };
  },


  props: {
    allowedDates: {
      type: [Array, Object, Function],
      default: function _default() {
        return null;
      }
    },
    autosave: Boolean,
    appendIcon: {
      type: String,
      default: 'chevron_right'
    },
    // Function formatting the day in date picker table
    dayFormat: {
      type: Function,
      default: null
    },
    events: {
      type: [Array, Object, Function],
      default: function _default() {
        return null;
      }
    },
    eventColor: {
      type: [String, Function, Object],
      default: 'warning'
    },
    firstDayOfWeek: {
      type: [String, Number],
      default: 0
    },
    // Function formatting the tableDate in the day/month table header
    headerDateFormat: {
      type: Function,
      default: null
    },
    locale: {
      type: String,
      default: 'en-us'
    },
    // Function formatting month in the months table
    monthFormat: {
      type: Function,
      default: null
    },
    prependIcon: {
      type: String,
      default: 'chevron_left'
    },
    readonly: Boolean,
    scrollable: Boolean,
    showCurrent: {
      type: [Boolean, String],
      default: true
    },
    // Function formatting currently selected date in the picker title
    titleDateFormat: {
      type: Function,
      default: null
    },
    type: {
      type: String,
      default: 'date',
      validator: function validator(type) {
        return ['date', 'month' /*, 'year'*/].includes(type);
      }
    },
    value: String,
    // Function formatting the year in table header and pickup title
    yearFormat: {
      type: Function,
      default: null
    },
    yearIcon: String
  },

  computed: {
    current: function current() {
      if (this.showCurrent === true) {
        return this.sanitizeDateString(this.now.getFullYear() + '-' + (this.now.getMonth() + 1) + '-' + this.now.getDate(), this.type);
      }

      return this.showCurrent || null;
    },
    firstAllowedDate: function firstAllowedDate() {
      var year = this.now.getFullYear();
      var month = this.now.getMonth();

      if (this.allowedDates) {
        for (var date = 1; date <= 31; date++) {
          var dateString = year + '-' + (month + 1) + '-' + date;
          if (isNaN(new Date(dateString).getDate())) break;

          var sanitizedDateString = this.sanitizeDateString(dateString, 'date');
          if (isValueAllowed(sanitizedDateString, this.allowedDates)) {
            return sanitizedDateString;
          }
        }
      }

      return this.sanitizeDateString(year + '-' + (month + 1) + '-' + this.now.getDate(), 'date');
    },
    firstAllowedMonth: function firstAllowedMonth() {
      var year = this.now.getFullYear();

      if (this.allowedDates) {
        for (var month = 0; month < 12; month++) {
          var dateString = year + '-' + pad(month + 1);
          if (isValueAllowed(dateString, this.allowedDates)) {
            return dateString;
          }
        }
      }

      return year + '-' + pad(this.now.getMonth() + 1);
    },

    // inputDate MUST be a string in ISO 8601 format (including leading zero for month/day)
    // YYYY-MM for month picker
    // YYYY-MM-DD for date picker
    inputDate: {
      get: function get() {
        if (this.value) {
          return this.sanitizeDateString(this.value, this.type);
        }

        return this.type === 'month' ? this.firstAllowedMonth : this.firstAllowedDate;
      },
      set: function set(value) {
        var date = value == null ? this.originalDate : this.sanitizeDateString(value, this.type);
        this.$emit('input', date);
      }
    },
    day: function day() {
      return this.inputDate.split('-')[2] * 1;
    },
    month: function month() {
      return this.inputDate.split('-')[1] - 1;
    },
    year: function year() {
      return this.inputDate.split('-')[0] * 1;
    },
    tableMonth: function tableMonth() {
      return this.tableDate.split('-')[1] - 1;
    },
    tableYear: function tableYear() {
      return this.tableDate.split('-')[0] * 1;
    },
    formatters: function formatters() {
      return {
        year: this.yearFormat || createNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 }),
        titleDate: this.titleDateFormat || this.defaultTitleDateFormatter
      };
    },
    defaultTitleDateFormatter: function defaultTitleDateFormatter() {
      var titleFormats = {
        year: { year: 'numeric', timeZone: 'UTC' },
        month: { month: 'long', timeZone: 'UTC' },
        date: { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'UTC' }
      };

      var titleDateFormatter = createNativeLocaleFormatter(this.locale, titleFormats[this.type], {
        start: 0,
        length: { date: 10, month: 7, year: 4 }[this.type]
      });

      var landscapeFormatter = function landscapeFormatter(date) {
        return titleDateFormatter(date).replace(/([^\d\s])([\d])/g, function (match, nonDigit, digit) {
          return nonDigit + ' ' + digit;
        }).replace(', ', ',<br>');
      };

      return this.landscape ? landscapeFormatter : titleDateFormatter;
    }
  },

  watch: {
    tableDate: function tableDate(val, prev) {
      // Make a ISO 8601 strings from val and prev for comparision, otherwise it will incorrectly
      // compare for example '2000-9' and '2000-10'
      var sanitizeType = this.type === 'month' ? 'year' : 'month';
      this.isReversing = this.sanitizeDateString(val, sanitizeType) < this.sanitizeDateString(prev, sanitizeType);
    },
    value: function value(val) {
      val && this.setTableDate();
    },
    type: function type(_type) {
      this.activePicker = _type.toUpperCase();

      if (this.value) {
        var date = this.sanitizeDateString(this.value, _type);
        this.$emit('input', isValueAllowed(date, this.allowedDates) ? date : null);
      }
    }
  },

  created: function created() {
    this.setTableDate();
  },


  methods: {
    setTableDate: function setTableDate() {
      this.tableDate = this.type === 'month' ? '' + this.year : this.year + '-' + pad(this.month + 1);
    },
    save: function save() {
      if (this.originalDate) {
        this.originalDate = this.value;
      } else {
        this.originalDate = this.inputDate;
      }

      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
    },
    cancel: function cancel() {
      this.inputDate = this.originalDate;
      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;
    },
    yearClick: function yearClick(value) {
      if (this.type === 'month') {
        var date = value + '-' + pad(this.month + 1);
        if (isValueAllowed(date, this.allowedDates)) this.inputDate = date;
        this.tableDate = '' + value;
      } else {
        var _date = value + '-' + pad(this.tableMonth + 1) + '-' + pad(this.day);
        if (isValueAllowed(_date, this.allowedDates)) this.inputDate = _date;
        this.tableDate = value + '-' + pad(this.tableMonth + 1);
      }
      this.activePicker = 'MONTH';
    },
    monthClick: function monthClick(value) {
      var _this = this;

      // Updates inputDate setting 'YYYY-MM' or 'YYYY-MM-DD' format, depending on the picker type
      if (this.type === 'date') {
        var date = value + '-' + pad(this.day);
        if (isValueAllowed(date, this.allowedDates)) this.inputDate = date;
        this.tableDate = value;
        this.activePicker = 'DATE';
      } else {
        this.inputDate = value;
        this.$nextTick(function () {
          return _this.autosave && _this.save();
        });
      }
    },
    dateClick: function dateClick(value) {
      var _this2 = this;

      this.inputDate = value;
      this.$nextTick(function () {
        return _this2.autosave && _this2.save();
      });
    },
    genPickerTitle: function genPickerTitle() {
      var _this3 = this;

      return this.$createElement('v-date-picker-title', {
        props: {
          date: this.formatters.titleDate(this.inputDate),
          selectingYear: this.activePicker === 'YEAR',
          year: this.formatters.year('' + this.year),
          yearIcon: this.yearIcon
        },
        slot: 'title',
        style: this.readonly ? {
          'pointer-events': 'none'
        } : undefined,
        on: {
          'update:selectingYear': function updateSelectingYear(value) {
            return _this3.activePicker = value ? 'YEAR' : _this3.type.toUpperCase();
          }
        }
      });
    },
    genTableHeader: function genTableHeader() {
      var _this4 = this;

      return this.$createElement('v-date-picker-header', {
        props: {
          appendIcon: this.appendIcon,
          color: this.color,
          disabled: this.readonly,
          format: this.headerDateFormat,
          locale: this.locale,
          prependIcon: this.prependIcon,
          value: this.activePicker === 'DATE' ? this.tableDate : '' + this.tableYear
        },
        on: {
          toggle: function toggle() {
            return _this4.activePicker = _this4.activePicker === 'DATE' ? 'MONTH' : 'YEAR';
          },
          input: function input(value) {
            return _this4.tableDate = value;
          }
        }
      });
    },
    genDateTable: function genDateTable() {
      var _this5 = this;

      return this.$createElement('v-date-picker-date-table', {
        props: {
          allowedDates: this.allowedDates,
          color: this.color,
          current: this.current,
          disabled: this.readonly,
          events: this.events,
          eventColor: this.eventColor,
          firstDayOfWeek: this.firstDayOfWeek,
          format: this.dayFormat,
          locale: this.locale,
          tableDate: this.tableDate,
          scrollable: this.scrollable,
          value: this.value
        },
        ref: 'table',
        on: {
          input: this.dateClick,
          tableDate: function tableDate(value) {
            return _this5.tableDate = value;
          }
        }
      });
    },
    genMonthTable: function genMonthTable() {
      var _this6 = this;

      return this.$createElement('v-date-picker-month-table', {
        props: {
          allowedDates: this.type === 'month' ? this.allowedDates : null,
          color: this.color,
          current: this.current,
          disabled: this.readonly,
          format: this.monthFormat,
          locale: this.locale,
          scrollable: this.scrollable,
          value: !this.value || this.type === 'month' ? this.value : this.value.substr(0, 7),
          tableDate: '' + this.tableYear
        },
        ref: 'table',
        on: {
          input: this.monthClick,
          tableDate: function tableDate(value) {
            return _this6.tableDate = value;
          }
        }
      });
    },
    genYears: function genYears() {
      return this.$createElement('v-date-picker-years', {
        props: {
          color: this.color,
          format: this.yearFormat,
          locale: this.locale,
          value: '' + this.tableYear
        },
        on: {
          input: this.yearClick
        }
      });
    },
    genPickerBody: function genPickerBody() {
      var children = this.activePicker === 'YEAR' ? [this.genYears()] : [this.genTableHeader(), this.activePicker === 'DATE' ? this.genDateTable() : this.genMonthTable()];

      return this.$createElement('div', {
        key: this.activePicker,
        style: this.readonly ? {
          'pointer-events': 'none'
        } : undefined
      }, children);
    },

    // Adds leading zero to month/day if necessary, returns 'YYYY' if type = 'year',
    // 'YYYY-MM' if 'month' and 'YYYY-MM-DD' if 'date'
    sanitizeDateString: function sanitizeDateString(dateString, type) {
      var _dateString$split = dateString.split('-'),
          _dateString$split2 = _slicedToArray(_dateString$split, 3),
          year = _dateString$split2[0],
          _dateString$split2$ = _dateString$split2[1],
          month = _dateString$split2$ === undefined ? 1 : _dateString$split2$,
          _dateString$split2$2 = _dateString$split2[2],
          date = _dateString$split2$2 === undefined ? 1 : _dateString$split2$2;

      return (year + '-' + pad(month) + '-' + pad(date)).substr(0, { date: 10, month: 7, year: 4 }[type]);
    }
  },

  render: function render(h) {
    return this.genPicker('picker--date');
  }
};
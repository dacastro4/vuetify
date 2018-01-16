var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// Components
import VTimePickerTitle from './VTimePickerTitle';
import VTimePickerClock from './VTimePickerClock';

// Mixins
import Picker from '../../mixins/picker';

// Utils
import { createRange } from '../../util/helpers';
import pad from '../VDatePicker/util/pad';
import isValueAllowed from '../../util/isValueAllowed';

var rangeHours24 = createRange(24);
var rangeHours12am = createRange(12);
var rangeHours12pm = rangeHours12am.map(function (v) {
  return v + 12;
});
var rangeMinutes = createRange(60);

export default {
  name: 'v-time-picker',

  components: {
    VTimePickerTitle: VTimePickerTitle,
    VTimePickerClock: VTimePickerClock
  },

  mixins: [Picker],

  data: function data() {
    var _getInputTime = this.getInputTime(this.value),
        inputHour = _getInputTime.inputHour,
        inputMinute = _getInputTime.inputMinute;

    return {
      inputHour: inputHour,
      inputMinute: inputMinute,
      originalHour: inputHour,
      originalMinute: inputMinute,
      selectingHour: true
    };
  },


  props: {
    allowedHours: {
      type: [Array, Object, Function],
      default: function _default() {
        return null;
      }
    },
    allowedMinutes: {
      type: [Array, Object, Function],
      default: function _default() {
        return null;
      }
    },
    autosave: Boolean,
    format: {
      type: String,
      default: 'ampm',
      validator: function validator(val) {
        return ['ampm', '24hr'].includes(val);
      }
    },
    scrollable: Boolean,
    value: null
  },

  computed: {
    hour: {
      get: function get() {
        return this.inputHour == null ? this.firstAllowed('hour', new Date().getHours()) : this.inputHour;
      },
      set: function set(value) {
        this.inputHour = value;
      }
    },
    minute: {
      get: function get() {
        return this.inputMinute == null ? this.firstAllowed('minute', new Date().getMinutes()) : this.inputMinute;
      },
      set: function set(value) {
        this.inputMinute = value;
      }
    },
    period: {
      get: function get() {
        return this.hour < 12 ? 'am' : 'pm';
      },
      set: function set(val) {
        var newHour = this.hour + (val === 'am' ? -12 : 12);
        this.hour = this.firstAllowed('hour', newHour);
      }
    },
    isAmPm: function isAmPm() {
      return this.format === 'ampm';
    }
  },

  watch: {
    value: function value(_value) {
      var _getInputTime2 = this.getInputTime(_value),
          inputHour = _getInputTime2.inputHour,
          inputMinute = _getInputTime2.inputMinute;

      this.inputHour = inputHour;
      this.inputMinute = inputMinute;
    },
    inputHour: function inputHour(val) {
      this.$emit('input', pad(this.hour) + ':' + pad(this.minute));
    },
    inputMinute: function inputMinute(val) {
      this.$emit('input', pad(this.hour) + ':' + pad(this.minute));
    }
  },

  methods: {
    getInputTime: function getInputTime(value) {
      if (value instanceof Date) {
        return {
          inputHour: value.getHours(),
          inputMinute: value.getMinutes()
        };
      }

      if (value) {
        var _ref = value.trim().toLowerCase().match(/^(\d+):(\d+)(:\d+)?([ap]m)?$/, '') || [],
            _ref2 = _slicedToArray(_ref, 5),
            hour = _ref2[1],
            minute = _ref2[2],
            period = _ref2[4];

        return {
          inputMinute: parseInt(minute, 10),
          inputHour: period ? this.convert12to24(parseInt(hour, 10), period) : parseInt(hour, 10)
        };
      }

      return {};
    },
    convert24to12: function convert24to12(hour) {
      return hour ? (hour - 1) % 12 + 1 : 12;
    },
    convert12to24: function convert12to24(hour, period) {
      return hour % 12 + (period === 'pm' ? 12 : 0);
    },
    save: function save() {
      this.originalHour = this.inputHour;
      this.originalMinute = this.inputMinute;
      this.commit();
    },
    cancel: function cancel() {
      this.inputHour = this.originalHour;
      this.inputMinute = this.originalMinute;
      this.commit();
    },
    commit: function commit() {
      var _this = this;

      if (this.$parent && this.$parent.isActive) this.$parent.isActive = false;

      // Fix for #1818
      // Wait for data to persist
      // then set selectingHour
      this.$nextTick(function () {
        return _this.selectingHour = true;
      });
    },
    onInput: function onInput(value) {
      if (!this.selectingHour) {
        this.minute = value;
      } else {
        this.hour = this.isAmPm ? this.convert12to24(value, this.period) : value;
      }
    },
    onChange: function onChange() {
      if (!this.selectingHour && this.autosave) {
        this.save();
      }

      if (this.selectingHour) {
        this.selectingHour = !this.selectingHour;
      }
    },
    firstAllowed: function firstAllowed(type, value) {
      var allowedFn = type === 'hour' ? this.allowedHours : this.allowedMinutes;
      if (!allowedFn) return value;

      var range = type === 'minute' ? rangeMinutes : this.isAmPm ? value < 12 ? rangeHours12am : rangeHours12pm : rangeHours24;
      var first = range.find(function (v) {
        return isValueAllowed((v + value) % range.length + range[0], allowedFn);
      });
      return ((first || 0) + value) % range.length + range[0];
    },
    genClock: function genClock() {
      return this.$createElement('v-time-picker-clock', {
        props: {
          allowedValues: this.selectingHour ? this.allowedHours : this.allowedMinutes,
          color: this.color,
          dark: this.dark,
          double: this.selectingHour && !this.isAmPm,
          format: this.selectingHour ? this.isAmPm ? this.convert24to12 : function (val) {
            return val;
          } : function (val) {
            return pad(val, 2);
          },
          max: this.selectingHour ? this.isAmPm && this.period === 'am' ? 11 : 23 : 59,
          min: this.selectingHour && this.isAmPm && this.period === 'pm' ? 12 : 0,
          scrollable: this.scrollable,
          size: this.landscape ? 250 : 270,
          step: this.selectingHour ? 1 : 5,
          value: this.selectingHour ? this.hour : this.minute
        },
        on: {
          input: this.onInput,
          change: this.onChange
        },
        ref: 'clock'
      });
    },
    genPickerBody: function genPickerBody() {
      return this.$createElement('div', {
        style: {
          width: '100%',
          height: '100%'
        },
        key: this.selectingHour
      }, [this.genClock()]);
    },
    genPickerTitle: function genPickerTitle() {
      var _this2 = this;

      return this.$createElement('v-time-picker-title', {
        props: {
          ampm: this.isAmPm,
          value: pad(this.hour) + ':' + pad(this.minute),
          selectingHour: this.selectingHour
        },
        on: {
          'update:selectingHour': function updateSelectingHour(value) {
            return _this2.selectingHour = value;
          },
          'update:period': function updatePeriod(value) {
            return _this2.period = value;
          }
        },
        ref: 'title',
        slot: 'title'
      });
    }
  },

  render: function render(h) {
    return this.genPicker('picker--time');
  }
};
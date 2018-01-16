require('../../../src/stylus/components/_time-picker-title.styl');

// Mixins
import PickerButton from '../../mixins/picker-button';

// Utils
import { pad } from '../VDatePicker/util';

export default {
  name: 'v-time-picker-title',

  mixins: [PickerButton],

  props: {
    ampm: Boolean,
    selectingHour: Boolean,
    value: String
  },

  computed: {
    hour: function hour() {
      return parseInt(this.value.split(':')[0], 10);
    },
    minute: function minute() {
      return parseInt(this.value.split(':')[1], 10);
    },
    period: function period() {
      return this.hour < 12 ? 'am' : 'pm';
    }
  },

  methods: {
    genTime: function genTime() {
      var hour = this.hour;
      if (this.ampm) {
        hour = hour ? (hour - 1) % 12 + 1 : 12;
      }

      return this.$createElement('div', {
        'class': 'time-picker-title__time'
      }, [this.genPickerButton('selectingHour', true, this.ampm ? hour : pad(hour)), this.$createElement('span', ':'), this.genPickerButton('selectingHour', false, pad(this.minute))]);
    },
    genAmPm: function genAmPm() {
      return this.$createElement('div', {
        staticClass: 'time-picker-title__ampm'
      }, [this.genPickerButton('period', 'am', 'am'), this.genPickerButton('period', 'pm', 'pm')]);
    }
  },

  render: function render(h) {
    return h('div', {
      staticClass: 'time-picker-title'
    }, [this.genTime(), this.ampm ? this.genAmPm() : null]);
  }
};
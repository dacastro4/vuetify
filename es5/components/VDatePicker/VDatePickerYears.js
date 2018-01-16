require('../../../src/stylus/components/_date-picker-years.styl');

// Mixins
import Colorable from '../../mixins/colorable';

// Utils
import { createNativeLocaleFormatter } from './util';

export default {
  name: 'v-date-picker-years',

  mixins: [Colorable],

  data: function data() {
    return {
      defaultColor: 'primary'
    };
  },


  props: {
    format: {
      type: Function,
      default: null
    },
    locale: {
      type: String,
      default: 'en-us'
    },
    min: [Number, String],
    max: [Number, String],
    value: [Number, String]
  },

  computed: {
    formatter: function formatter() {
      return this.format || createNativeLocaleFormatter(this.locale, { year: 'numeric', timeZone: 'UTC' }, { length: 4 });
    }
  },

  mounted: function mounted() {
    this.$el.scrollTop = this.$el.scrollHeight / 2 - 125;
  },


  methods: {
    genYearItem: function genYearItem(year) {
      var _this = this;

      var formatted = this.formatter('' + year);

      return this.$createElement('li', {
        key: year,
        'class': parseInt(this.value, 10) === year ? this.addTextColorClassChecks({ active: true }) : {},
        on: {
          click: function click() {
            return _this.$emit('input', year);
          }
        }
      }, formatted);
    },
    genYearItems: function genYearItems() {
      var children = [];
      var selectedYear = this.value ? parseInt(this.value, 10) : new Date().getFullYear();
      var maxYear = this.max ? parseInt(this.max, 10) : selectedYear + 100;
      var minYear = Math.min(maxYear, this.min ? parseInt(this.min, 10) : selectedYear - 100);

      for (var year = maxYear; year >= minYear; year--) {
        children.push(this.genYearItem(year));
      }

      return children;
    }
  },

  render: function render(h) {
    return this.$createElement('ul', {
      staticClass: 'date-picker-years',
      ref: 'years'
    }, this.genYearItems());
  }
};
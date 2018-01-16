require('../../../src/stylus/components/_carousel.styl');

import VBtn from '../VBtn';
import VIcon from '../VIcon';

import Bootable from '../../mixins/bootable';
import Themeable from '../../mixins/themeable';
import { provide as RegistrableProvide } from '../../mixins/registrable';

import Touch from '../../directives/touch';

export default {
  name: 'v-carousel',

  mixins: [Bootable, Themeable, RegistrableProvide('carousel')],

  directives: { Touch: Touch },

  data: function data() {
    return {
      inputValue: null,
      items: [],
      slideTimeout: null,
      reverse: false
    };
  },


  props: {
    cycle: {
      type: Boolean,
      default: true
    },
    delimiterIcon: {
      type: String,
      default: 'fiber_manual_record'
    },
    hideControls: Boolean,
    hideDelimiters: Boolean,
    interval: {
      type: [Number, String],
      default: 6000,
      validator: function validator(value) {
        return value > 0;
      }
    },
    prependIcon: {
      type: [Boolean, String],
      default: 'chevron_left'
    },
    appendIcon: {
      type: [Boolean, String],
      default: 'chevron_right'
    },
    value: Number
  },

  watch: {
    items: function items() {
      if (this.inputValue >= this.items.length) {
        this.inputValue = this.items.length - 1;
      }
    },
    inputValue: function inputValue() {
      // Evaluates items when inputValue changes to
      // account for dynamic changing of children

      var uid = (this.items[this.inputValue] || {}).uid;
      for (var index = this.items.length; --index >= 0;) {
        this.items[index].open(uid, this.reverse);
      }

      this.$emit('input', this.inputValue);
      this.restartTimeout();
    },
    value: function value(val) {
      this.inputValue = val;
    },
    interval: function interval() {
      this.restartTimeout();
    },
    cycle: function cycle(val) {
      if (val) {
        this.restartTimeout();
      } else {
        clearTimeout(this.slideTimeout);
        this.slideTimeout = null;
      }
    }
  },

  mounted: function mounted() {
    this.init();
  },


  methods: {
    genDelimiters: function genDelimiters() {
      return this.$createElement('div', {
        staticClass: 'carousel__controls'
      }, this.genItems());
    },
    genIcon: function genIcon(direction, icon, fn) {
      if (!icon) return null;

      return this.$createElement('div', {
        staticClass: 'carousel__' + direction
      }, [this.$createElement(VBtn, {
        props: {
          icon: true,
          dark: this.dark || !this.light,
          light: this.light
        },
        on: { click: fn }
      }, [this.$createElement(VIcon, {
        props: { 'size': '46px' }
      }, icon)])]);
    },
    genItems: function genItems() {
      var _this = this;

      return this.items.map(function (item, index) {
        return _this.$createElement(VBtn, {
          class: {
            'carousel__controls__item': true,
            'carousel__controls__item--active': index === _this.inputValue
          },
          props: {
            icon: true,
            small: true,
            dark: _this.dark || !_this.light,
            light: _this.light
          },
          key: index,
          on: { click: _this.select.bind(_this, index) }
        }, [_this.$createElement(VIcon, {
          props: { size: '18px' }
        }, _this.delimiterIcon)]);
      });
    },
    restartTimeout: function restartTimeout() {
      this.slideTimeout && clearTimeout(this.slideTimeout);
      this.slideTimeout = null;

      var raf = requestAnimationFrame || setTimeout;
      raf(this.startTimeout);
    },
    init: function init() {
      this.inputValue = this.value || 0;
    },
    next: function next() {
      this.reverse = false;
      this.inputValue = (this.inputValue + 1) % this.items.length;
    },
    prev: function prev() {
      this.reverse = true;
      this.inputValue = (this.inputValue + this.items.length - 1) % this.items.length;
    },
    select: function select(index) {
      this.reverse = index < this.inputValue;
      this.inputValue = index;
    },
    startTimeout: function startTimeout() {
      var _this2 = this;

      if (!this.cycle) return;

      this.slideTimeout = setTimeout(function () {
        return _this2.next();
      }, this.interval > 0 ? this.interval : 6000);
    },
    register: function register(uid, open) {
      this.items.push({ uid: uid, open: open });
    },
    unregister: function unregister(uid) {
      this.items = this.items.filter(function (i) {
        return i.uid !== uid;
      });
    }
  },

  render: function render(h) {
    return h('div', {
      staticClass: 'carousel',
      directives: [{
        name: 'touch',
        value: {
          left: this.next,
          right: this.prev
        }
      }]
    }, [this.hideControls ? null : this.genIcon('left', this.prependIcon, this.prev), this.hideControls ? null : this.genIcon('right', this.appendIcon, this.next), this.hideDelimiters ? null : this.genDelimiters(), this.$slots.default]);
  }
};
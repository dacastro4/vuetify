function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Mixins
import Routable from '../../mixins/routable';
import { inject as RegistrableInject } from '../../mixins/registrable';

export default {
  name: 'v-tab',

  mixins: [RegistrableInject('tabs', 'v-tab', 'v-tabs'), Routable],

  inject: ['tabClick'],

  data: function data() {
    return {
      isActive: false
    };
  },


  props: {
    activeClass: {
      type: String,
      default: 'tabs__item--active'
    },
    ripple: {
      type: [Boolean, Object],
      default: true
    }
  },

  computed: {
    classes: function classes() {
      return _defineProperty({
        'tabs__item': true,
        'tabs__item--disabled': this.disabled
      }, this.activeClass, !this.to && this.isActive);
    },
    action: function action() {
      var to = this.to || this.href;

      if (typeof to === 'string') return to.replace('#', '');
      if (to === Object(to) && to.hasOwnProperty('path')) return to.path;

      return this;
    }
  },

  watch: {
    $route: {
      immediate: true,
      handler: 'onRouteChange'
    }
  },

  mounted: function mounted() {
    this.tabs.register(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.tabs.unregister(this);
  },


  methods: {
    click: function click(e) {
      // If user provides an
      // actual link, do not
      // prevent default
      if (this.href && this.href.indexOf('#') > -1) e.preventDefault();

      this.$emit('click', e);

      this.to || this.tabClick(this);
    },
    onRouteChange: function onRouteChange() {
      var _this = this;

      if (!this.to) return;

      this.$nextTick(function () {
        if (_this.$el.firstChild.className.indexOf(_this.activeClass) > -1) {
          _this.tabClick(_this);
        }
      });
    },
    toggle: function toggle(action) {
      this.isActive = action === this || action === this.action;
    }
  },

  render: function render(h) {
    var link = this.generateRouteLink();
    var data = link.data;

    // If disabled, use div as anchor tags do not support
    // being disabled

    var tag = this.disabled ? 'div' : link.tag;

    return h('div', {
      staticClass: 'tabs__div'
    }, [h(tag, data, this.$slots.default)]);
  }
};
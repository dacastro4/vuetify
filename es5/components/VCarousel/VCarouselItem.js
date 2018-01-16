var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

// Components
import VJumbotron from '../VJumbotron';

// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable';

export default {
  name: 'v-carousel-item',

  mixins: [RegistrableInject('carousel', 'v-carousel-item', 'v-carousel')],

  inheritAttrs: false,

  data: function data() {
    return {
      active: false,
      reverse: false
    };
  },


  props: {
    transition: {
      type: String,
      default: 'tab-transition'
    },
    reverseTransition: {
      type: String,
      default: 'tab-reverse-transition'
    }
  },

  computed: {
    computedTransition: function computedTransition() {
      return this.reverse ? this.reverseTransition : this.transition;
    }
  },

  methods: {
    open: function open(id, reverse) {
      this.active = this._uid === id;
      this.reverse = reverse;
    }
  },

  mounted: function mounted() {
    this.carousel.register(this._uid, this.open);
  },
  beforeDestroy: function beforeDestroy() {
    this.carousel.unregister(this._uid, this.open);
  },
  render: function render(h) {
    var item = h(VJumbotron, {
      props: _extends({}, this.$attrs, {
        height: '100%'
      }),
      on: this.$listeners,
      directives: [{
        name: 'show',
        value: this.active
      }]
    }, this.$slots.default);

    return h('transition', { props: { name: this.computedTransition } }, [item]);
  }
};
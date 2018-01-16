import Bootable from '../../mixins/bootable';

import { VTabTransition, VTabReverseTransition } from '../transitions';

import { inject as RegistrableInject } from '../../mixins/registrable';

import Touch from '../../directives/touch';

export default {
  name: 'v-tab-item',

  mixins: [Bootable, RegistrableInject('tabs', 'v-tab-item', 'v-tabs-items')],

  components: {
    VTabTransition: VTabTransition,
    VTabReverseTransition: VTabReverseTransition
  },

  directives: {
    Touch: Touch
  },

  data: function data() {
    return {
      isActive: false,
      reverse: false
    };
  },


  props: {
    id: String,
    transition: {
      type: [Boolean, String],
      default: 'tab-transition'
    },
    reverseTransition: {
      type: [Boolean, String],
      default: 'tab-reverse-transition'
    }
  },

  computed: {
    computedTransition: function computedTransition() {
      return this.reverse ? this.reverseTransition : this.transition;
    }
  },

  methods: {
    toggle: function toggle(target, reverse, showTransition, index) {
      this.$el.style.transition = !showTransition ? 'none' : null;
      this.reverse = reverse;
      this.isActive = (this.id || index.toString()) === target;
    }
  },

  mounted: function mounted() {
    this.tabs.register(this);
  },
  beforeDestroy: function beforeDestroy() {
    this.tabs.unregister(this);
  },
  render: function render(h) {
    var data = {
      staticClass: 'tabs__content',
      directives: [{
        name: 'show',
        value: this.isActive
      }],
      domProps: { id: this.id },
      on: this.$listeners
    };

    var div = h('div', data, this.showLazyContent(this.$slots.default));

    if (!this.computedTransition) return div;

    return h('transition', {
      props: { name: this.computedTransition }
    }, [div]);
  }
};
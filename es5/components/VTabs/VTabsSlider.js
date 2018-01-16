import Colorable from '../../mixins/colorable';

export default {
  name: 'v-tabs-slider',

  mixins: [Colorable],

  data: function data() {
    return {
      defaultColor: 'accent'
    };
  },

  render: function render(h) {
    return h('div', {
      staticClass: 'tabs__slider',
      class: this.addBackgroundColorClassChecks()
    });
  }
};
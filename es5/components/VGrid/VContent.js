// Styles
require('../../../src/stylus/components/_content.styl');

// Mixins
import SSRBootable from '../../mixins/ssr-bootable';

export default {
  name: 'v-content',

  mixins: [SSRBootable],

  props: {
    tag: {
      type: String,
      default: 'main'
    }
  },

  computed: {
    styles: function styles() {
      var _$vuetify$application = this.$vuetify.application,
          bar = _$vuetify$application.bar,
          top = _$vuetify$application.top,
          right = _$vuetify$application.right,
          footer = _$vuetify$application.footer,
          bottom = _$vuetify$application.bottom,
          left = _$vuetify$application.left;


      return {
        paddingTop: top + bar + 'px',
        paddingRight: right + 'px',
        paddingBottom: footer + bottom + 'px',
        paddingLeft: left + 'px'
      };
    }
  },

  render: function render(h) {
    var data = {
      staticClass: 'content',
      'class': this.classes,
      style: this.styles,
      ref: 'content'
    };

    return h(this.tag, data, [h('div', { staticClass: 'content--wrap' }, this.$slots.default)]);
  }
};
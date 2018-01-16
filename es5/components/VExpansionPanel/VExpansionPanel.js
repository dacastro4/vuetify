var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('../../../src/stylus/components/_expansion-panel.styl');

import Themeable from '../../mixins/themeable';

export default {
  name: 'v-expansion-panel',

  mixins: [Themeable],

  provide: function provide() {
    return {
      panelClick: this.panelClick,
      focusable: this.focusable
    };
  },


  props: {
    expand: Boolean,
    focusable: Boolean,
    inset: Boolean,
    popout: Boolean
  },

  methods: {
    getChildren: function getChildren() {
      return this.$children.filter(function (c) {
        return c.$options && c.$options.name === 'v-expansion-panel-content';
      });
    },
    panelClick: function panelClick(uid) {
      var children = this.getChildren();

      if (!this.expand) {
        for (var index = children.length; --index >= 0;) {
          children[index].toggle(uid);
        }
        return;
      }

      for (var _index = children.length; --_index >= 0;) {
        if (children[_index]._uid === uid) {
          children[_index].toggle(uid);
          return;
        }
      }
    }
  },

  render: function render(h) {
    return h('ul', {
      staticClass: 'expansion-panel',
      'class': _extends({
        'expansion-panel--focusable': this.focusable,
        'expansion-panel--popout': this.popout,
        'expansion-panel--inset': this.inset
      }, this.themeClasses)
    }, this.$slots.default);
  }
};
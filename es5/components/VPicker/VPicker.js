var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

require('../../../src/stylus/components/_pickers.styl');

// Components
import VCard from '../VCard';

// Mixins
import Colorable from '../../mixins/colorable';
import Themeable from '../../mixins/themeable';

export default {
  name: 'v-picker',

  components: {
    VCard: VCard
  },

  mixins: [Colorable, Themeable],

  data: function data() {
    return {
      defaultColor: 'primary'
    };
  },


  props: {
    landscape: Boolean,
    transition: {
      type: String,
      default: 'fade-transition'
    }
  },

  computed: {
    computedTitleColor: function computedTitleColor() {
      var darkTheme = this.dark || !this.light && this.$vuetify.dark;
      var defaultTitleColor = darkTheme ? null : this.computedColor;
      return this.color || defaultTitleColor;
    }
  },

  methods: {
    genTitle: function genTitle() {
      return this.$createElement('div', {
        staticClass: 'picker__title',
        'class': this.addBackgroundColorClassChecks({
          'picker__title--landscape': this.landscape
        }, this.computedTitleColor)
      }, this.$slots.title);
    },
    genBodyTransition: function genBodyTransition() {
      return this.$createElement('transition', {
        props: {
          name: this.transition
        }
      }, this.$slots.default);
    },
    genBody: function genBody() {
      return this.$createElement('div', {
        staticClass: 'picker__body'
      }, [this.genBodyTransition()]);
    },
    genActions: function genActions() {
      return this.$createElement('div', {
        staticClass: 'picker__actions card__actions'
      }, this.$slots.actions);
    }
  },

  render: function render(h) {
    return h('v-card', {
      staticClass: 'picker',
      'class': _extends({
        'picker--landscape': this.landscape
      }, this.themeClasses)
    }, [this.$slots.title ? this.genTitle() : null, this.genBody(), this.$slots.actions ? this.genActions() : null]);
  }
};
/**
 * Tabs props
 *
 * @mixin
 */
export default {
  props: {
    alignWithTitle: Boolean,
    appendIcon: {
      type: String,
      default: 'chevron_right'
    },
    centered: Boolean,
    fixedTabs: Boolean,
    grow: Boolean,
    height: {
      type: [Number, String],
      default: undefined,
      validator: function validator(v) {
        return !isNaN(parseInt(v));
      }
    },
    hideSlider: Boolean,
    iconsAndText: Boolean,
    mobileBreakPoint: {
      type: [Number, String],
      default: 1264,
      validator: function validator(v) {
        return !isNaN(parseInt(v));
      }
    },
    prependIcon: {
      type: String,
      default: 'chevron_left'
    },
    right: Boolean,
    showArrows: Boolean,
    sliderColor: {
      type: String,
      default: 'accent'
    },
    value: [Number, String]
  }
};
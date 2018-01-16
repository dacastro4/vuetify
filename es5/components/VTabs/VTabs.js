// Styles
require('../../../src/stylus/components/_tabs.styl');

// Component imports
import VIcon from '../VIcon';
import VTabsItems from './VTabsItems';
import VTabsSlider from './VTabsSlider';

// Component level mixins
import TabsComputed from './mixins/tabs-computed';
import TabsGenerators from './mixins/tabs-generators';
import TabsProps from './mixins/tabs-props';
import TabsTouch from './mixins/tabs-touch';
import TabsWatchers from './mixins/tabs-watchers';

// Mixins
import Colorable from '../../mixins/colorable';
import SSRBootable from '../../mixins/ssr-bootable';
import Themeable from '../../mixins/themeable';
import { provide as RegistrableProvide } from '../../mixins/registrable';

// Directives
import Resize from '../../directives/resize';
import Touch from '../../directives/touch';

export default {
  name: 'v-tabs',

  components: {
    VIcon: VIcon,
    VTabsItems: VTabsItems,
    VTabsSlider: VTabsSlider
  },

  mixins: [RegistrableProvide('tabs'), Colorable, SSRBootable, TabsComputed, TabsProps, TabsGenerators, TabsTouch, TabsWatchers, Themeable],

  directives: {
    Resize: Resize,
    Touch: Touch
  },

  provide: function provide() {
    return {
      tabClick: this.tabClick,
      tabProxy: this.tabProxy,
      registerItems: this.registerItems,
      unregisterItems: this.unregisterItems
    };
  },
  data: function data() {
    return {
      prependIconVisible: false,
      appendIconVisible: false,
      bar: [],
      content: [],
      isBooted: false,
      isOverflowing: false,
      lazyValue: this.value,
      resizeTimeout: null,
      reverse: false,
      scrollOffset: 0,
      sliderWidth: null,
      sliderLeft: null,
      startX: 0,
      tabsContainer: null,
      tabs: [],
      tabItems: null,
      transitionTime: 300
    };
  },


  methods: {
    checkPrependIcon: function checkPrependIcon() {
      return this.scrollOffset > 0;
    },
    checkAppendIcon: function checkAppendIcon() {
      // Check one scroll ahead to know the width of right-most item
      var container = this.$refs.container;
      var wrapper = this.$refs.wrapper;

      return container.clientWidth > this.scrollOffset + wrapper.clientWidth;
    },
    callSlider: function callSlider() {
      this.setOverflow();
      if (!this.activeTab) return false;

      // Give screen time to paint
      var action = this.activeTab.action;
      var activeTab = action === this.activeTab ? this.activeTab : this.tabs.find(function (tab) {
        return tab.action === action;
      });

      if (!activeTab) return;
      this.sliderWidth = activeTab.$el.scrollWidth;
      this.sliderLeft = activeTab.$el.offsetLeft;
    },

    /**
     * When v-navigation-drawer changes the
     * width of the container, call resize
     * after the transition is complete
     */
    onContainerResize: function onContainerResize() {
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(this.callSlider, this.transitionTime);
    },
    onResize: function onResize() {
      if (this._isDestroyed) return;

      this.callSlider();
      this.scrollIntoView();
    },
    overflowCheck: function overflowCheck(e, fn) {
      this.isOverflowing && fn(e);
    },
    scrollTo: function scrollTo(direction) {
      this.scrollOffset = this.newOffset(direction);
    },
    setOverflow: function setOverflow() {
      this.isOverflowing = this.$refs.bar.clientWidth < this.$refs.container.clientWidth;
    },
    findActiveLink: function findActiveLink() {
      var _this = this;

      if (!this.tabs.length || this.lazyValue) return;

      var activeIndex = this.tabs.findIndex(function (tabItem, index) {
        var id = tabItem.action === tabItem ? index.toString() : tabItem.action;
        return id === _this.lazyValue || tabItem.$el.firstChild.className.indexOf(_this.activeClass) > -1;
      });

      var index = activeIndex > -1 ? activeIndex : 0;
      var tab = this.tabs[index];

      /* istanbul ignore next */
      // There is not a reliable way to test
      this.inputValue = tab.action === tab ? index : tab.action;
    },
    parseNodes: function parseNodes() {
      var item = [];
      var items = [];
      var slider = [];
      var tab = [];
      var length = (this.$slots.default || []).length;

      for (var i = 0; i < length; i++) {
        var vnode = this.$slots.default[i];

        /* istanbul ignore else */
        if (vnode.componentOptions) {
          switch (vnode.componentOptions.Ctor.options.name) {
            case 'v-tabs-slider':
              slider.push(vnode);
              break;
            case 'v-tabs-items':
              items.push(vnode);
              break;
            case 'v-tab-item':
              item.push(vnode);
              break;
            // case 'v-tab' - intentionally omitted
            default:
              tab.push(vnode);
          }
        }
      }

      return { tab: tab, slider: slider, items: items, item: item };
    },
    register: function register(options) {
      this.tabs.push(options);
    },
    scrollIntoView: function scrollIntoView() {
      if (!this.activeTab) return false;

      var _activeTab$$el = this.activeTab.$el,
          clientWidth = _activeTab$$el.clientWidth,
          offsetLeft = _activeTab$$el.offsetLeft;

      var wrapperWidth = this.$refs.wrapper.clientWidth;
      var totalWidth = wrapperWidth + this.scrollOffset;
      var itemOffset = clientWidth + offsetLeft;
      var additionalOffset = clientWidth * 0.3;

      /* instanbul ignore else */
      if (offsetLeft < this.scrollOffset) {
        this.scrollOffset = Math.max(offsetLeft - additionalOffset, 0);
      } else if (totalWidth < itemOffset) {
        this.scrollOffset -= totalWidth - itemOffset - additionalOffset;
      }
    },
    tabClick: function tabClick(tab) {
      this.inputValue = tab.action === tab ? this.tabs.indexOf(tab) : tab.action;
      this.scrollIntoView();
    },
    tabProxy: function tabProxy(val) {
      this.inputValue = val;
    },
    registerItems: function registerItems(fn) {
      this.tabItems = fn;
    },
    unregisterItems: function unregisterItems() {
      this.tabItems = null;
    },
    unregister: function unregister(tab) {
      this.tabs = this.tabs.filter(function (o) {
        return o !== tab;
      });
    },
    updateTabs: function updateTabs() {
      for (var index = this.tabs.length; --index >= 0;) {
        this.tabs[index].toggle(this.target);
      }

      this.setOverflow();
    }
  },

  mounted: function mounted() {
    this.callSlider();
    this.prependIconVisible = this.checkPrependIcon();
    this.appendIconVisible = this.checkAppendIcon();
  },
  render: function render(h) {
    var _parseNodes = this.parseNodes(),
        tab = _parseNodes.tab,
        slider = _parseNodes.slider,
        items = _parseNodes.items,
        item = _parseNodes.item;

    return h('div', {
      staticClass: 'tabs',
      directives: [{
        name: 'resize',
        arg: 400,
        modifiers: { quiet: true },
        value: this.onResize
      }]
    }, [this.genBar([this.genSlider(slider), tab]), this.genItems(items, item)]);
  }
};
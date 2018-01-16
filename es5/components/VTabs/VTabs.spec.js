var _this = this;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test, touch } from '@util/testing';
import { createRange } from '@util/helpers';
import VTabs from './VTabs';
import VTab from './VTab';
import VTabItem from './VTabItem';
import VTabsItems from './VTabsItems';
import VTabsSlider from './VTabsSlider';

var Component = function Component() {
  var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ['foo', 'bar'];

  return {
    inheritAttrs: false,

    render: function render(h) {
      return h(VTabs, {
        attrs: this.$attrs
      }, [items.map(function (item) {
        return h(VTab, {
          props: { href: '#' + item }
        });
      }), h(VTabsItems, items.map(function (item) {
        return h(VTabItem, {
          props: { id: item }
        });
      }))]);
    }
  };
};

var ssrBootable = function ssrBootable() {
  return new Promise(function (resolve) {
    return requestAnimationFrame(resolve);
  });
};

test('VTabs', function (_ref) {
  var mount = _ref.mount,
      shallow = _ref.shallow;

  it('should provide', function () {
    var wrapper = mount(Component());

    var tab = wrapper.find(VTab)[0];
    expect(_typeof(tab.vm.tabClick)).toBe('function');
    expect(_typeof(tab.vm.tabs.register)).toBe('function');
    expect(_typeof(tab.vm.tabs.unregister)).toBe('function');

    var items = wrapper.find(VTabsItems)[0];
    expect(_typeof(items.vm.registerItems)).toBe('function');
    expect(_typeof(items.vm.unregisterItems)).toBe('function');
  });

  it('should register tabs and items', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper, tab, items;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VTabs, {
              slots: {
                default: [VTab, VTabsItems]
              }
            });
            tab = wrapper.find(VTab)[0];

            expect(wrapper.vm.tabs.length).toBe(1);
            tab.destroy();
            expect(wrapper.vm.tabs.length).toBe(0);

            items = wrapper.find(VTabsItems)[0];

            expect(_typeof(wrapper.vm.tabItems)).toBe('function');
            items.destroy();
            expect(wrapper.vm.tabItems).toBe(null);

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should change tab and content when model changes', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper, tabs, tab, item;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(Component(), {
              attachToDocument: true
            });
            tabs = wrapper.find(VTabs)[0];
            tab = wrapper.find(VTab)[0];
            item = wrapper.find(VTabItem)[0];


            expect(tabs.vm.activeIndex).toBe(-1);
            expect(tab.vm.isActive).toBe(false);
            expect(item.vm.isActive).toBe(false);
            _context2.next = 9;
            return ssrBootable();

          case 9:
            _context2.next = 11;
            return wrapper.vm.$nextTick();

          case 11:
            expect(tabs.vm.activeIndex).toBe(0);
            expect(tab.vm.isActive).toBe(true);
            expect(item.vm.isActive).toBe(true);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should call slider on application resize', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper, tabs;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(Component());
            tabs = wrapper.find(VTabs)[0];


            expect(tabs.vm.resizeTimeout).toBe(null);
            tabs.vm.$vuetify.application.left = 100;
            _context3.next = 6;
            return tabs.vm.$nextTick();

          case 6:
            expect(tabs.vm.resizeTimeout).toBeTruthy();
            tabs.setData({ resizeTimeout: null });
            expect(tabs.vm.resizeTimeout).toBe(null);
            tabs.vm.$vuetify.application.right = 100;
            _context3.next = 12;
            return tabs.vm.$nextTick();

          case 12:
            expect(tabs.vm.resizeTimeout).toBeTruthy();

          case 13:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should reset offset on resize', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper, tabs;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(Component(), {
              attachToDocument: true
            });
            _context4.next = 3;
            return ssrBootable();

          case 3:
            tabs = wrapper.find(VTabs)[0];


            tabs.setData({ scrollOffset: 1 });
            tabs.vm.onResize();
            _context4.next = 8;
            return tabs.vm.$nextTick();

          case 8:
            expect(tabs.vm.scrollOffset).toBe(0);
            tabs.setData({ scrollOffset: 2 });
            _context4.next = 12;
            return tabs.vm.$nextTick();

          case 12:
            tabs.destroy();
            tabs.vm.onResize();
            expect(tabs.vm.scrollOffset).toBe(2);

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should update model when route changes', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var $route, wrapper, tabs, tab, input;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            $route = { path: 'bar' };
            wrapper = mount(Component(), {
              attachToDocument: true,
              globals: {
                $route: $route
              }
            });
            _context5.next = 4;
            return ssrBootable();

          case 4:
            tabs = wrapper.find(VTabs)[0];
            tab = wrapper.find(VTab)[1];
            input = jest.fn();


            tabs.vm.$on('input', input);
            tab.vm.click(new Event('click'));
            _context5.next = 11;
            return wrapper.vm.$nextTick();

          case 11:

            expect(input).toHaveBeenCalled();

          case 12:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should call method if overflowing', function () {
    var wrapper = mount(VTabs);
    var fn = jest.fn();

    wrapper.vm.overflowCheck(null, fn);
    expect(fn).not.toHaveBeenCalled();
    wrapper.setData({ isOverflowing: true });
    wrapper.vm.overflowCheck(null, fn);
    expect(fn).toHaveBeenCalled();
  });

  it('should update scroll and item offset', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var newOffset, wrapper;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            newOffset = jest.fn();
            wrapper = mount(VTabs, {
              props: {
                showArrows: true
              }
            });


            wrapper.setMethods({ newOffset: newOffset });

            _context6.next = 5;
            return ssrBootable();

          case 5:

            wrapper.vm.scrollTo('append');
            wrapper.vm.scrollTo('prepend');
            expect(newOffset.mock.calls.length).toBe(2);

            wrapper.setMethods({ newOffset: function newOffset() {
                return 5;
              } });
            _context6.next = 11;
            return wrapper.vm.$nextTick();

          case 11:

            wrapper.vm.scrollTo('prepend');
            expect(wrapper.vm.scrollOffset).toBe(5);

          case 13:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));

  it('should validate height prop', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            wrapper = mount(VTabs, {
              propsData: { height: 'auto' }
            });


            expect('Invalid prop: custom validator check failed for prop "height"').toHaveBeenWarned();
            wrapper.setProps({ height: null });
            expect(wrapper.vm.containerStyles).toBe(null);
            wrapper.setProps({ height: 112 });
            expect(wrapper.vm.containerStyles.height).toBe('112px');

          case 6:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  })));

  it('should return lazy value when accessing input', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            wrapper = mount(VTabs);


            expect(wrapper.vm.inputValue).toBe(undefined);
            wrapper.setData({ lazyValue: 'foo' });
            _context8.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.inputValue).toBe('foo');

          case 6:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, _this);
  })));

  it('should show tabs arrows', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            wrapper = mount(VTabs, {
              propsData: { showArrows: true }
            });


            wrapper.setData({ isOverflowing: true });
            _context9.next = 4;
            return wrapper.vm.$nextTick();

          case 4:
            expect(wrapper.find('.tabs__wrapper--show-arrows')).toHaveLength(1);
            expect(wrapper.html()).toMatchSnapshot();

          case 6:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, _this);
  })));

  it('should have a null target with no activeTab', function () {
    var wrapper = mount(VTabs);

    expect(wrapper.vm.target).toBe(null);
  });

  it('should not conditionally render append and prepend icons', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var scrollTo, wrapper, next;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            scrollTo = jest.fn();
            wrapper = mount(VTabs, {
              attachToDocument: true
            });


            expect(wrapper.vm.genIcon('prepend')).toBe(null);

            // // Mock display state
            wrapper.setData({ isOverflowing: true, scrollOffset: 1 });
            wrapper.setProps({ showArrows: true });
            wrapper.vm.$vuetify.breakpoint.width = 800;
            _context10.next = 8;
            return ssrBootable();

          case 8:
            wrapper.setProps({ mobileBreakPoint: 1200 });

            expect(wrapper.vm.genIcon('prepend')).toBeTruthy();

            wrapper.setMethods({ scrollTo: scrollTo });
            // Since the elements will have no width
            // trick append icon to show
            wrapper.setData({ scrollOffset: -1 });
            _context10.next = 14;
            return wrapper.vm.$nextTick();

          case 14:
            next = wrapper.find('.tabs__icon--append')[0];

            next.trigger('click');
            _context10.next = 18;
            return wrapper.vm.$nextTick();

          case 18:
            expect(scrollTo).toHaveBeenCalledWith('append');

          case 19:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, _this);
  })));

  it('should call on touch methods', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var wrapper, onTouch, tabsWrapper;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            wrapper = mount(VTabs, {
              attachToDocument: true
            });


            wrapper.setData({ isOverflowing: true });

            onTouch = jest.fn();

            wrapper.setMethods({
              onTouchStart: onTouch,
              onTouchMove: onTouch,
              onTouchEnd: onTouch
            });
            _context11.next = 6;
            return ssrBootable();

          case 6:
            tabsWrapper = wrapper.find('.tabs__wrapper')[0];


            touch(tabsWrapper).start(0, 0);
            touch(tabsWrapper).end(0, 0);
            touch(tabsWrapper).move(15, 15);
            expect(onTouch.mock.calls.length).toBe(3);

          case 11:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, _this);
  })));

  it('should use a slotted slider', function () {
    var wrapper = mount(VTabs, {
      slots: {
        default: [{
          name: 'v-tabs-slider',
          render: function render(h) {
            return h(VTabsSlider, {
              props: { color: 'pink' }
            });
          }
        }]
      }
    });

    var slider = wrapper.find(VTabsSlider)[0];
    expect(slider.hasClass('pink')).toBe(true);
  });

  it('should handle touch events and remove container transition', _asyncToGenerator(regeneratorRuntime.mark(function _callee12() {
    var wrapper, container;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            wrapper = mount(VTabs, {
              attachToDocument: true
            });


            wrapper.setData({ isOverflowing: true });
            container = wrapper.find('.tabs__container')[0];
            _context12.next = 5;
            return ssrBootable();

          case 5:

            expect(wrapper.vm.startX).toBe(0);
            wrapper.vm.onTouchStart({ touchstartX: 0 });
            expect(container.hasStyle('transition', 'none')).toBe(true);

            wrapper.vm.onTouchMove({ touchmoveX: -100 });
            expect(wrapper.vm.scrollOffset).toBe(100);

            wrapper.vm.onTouchEnd();
            expect(wrapper.vm.scrollOffset).toBe(0);

            wrapper.setData({ isOverflowing: false, scrollOffset: 100 });
            wrapper.vm.onTouchEnd();
            expect(wrapper.vm.scrollOffset).toBe(0);

          case 15:
          case 'end':
            return _context12.stop();
        }
      }
    }, _callee12, _this);
  })));

  it('should generate a v-tabs-items if none present and has v-tab-item', _asyncToGenerator(regeneratorRuntime.mark(function _callee13() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            wrapper = mount(VTabs, {
              propsData: { value: 'foo' },
              slots: {
                default: [{
                  name: 'v-tab-item',
                  render: function render(h) {
                    return h('div');
                  }
                }]
              }
            });
            _context13.next = 3;
            return ssrBootable();

          case 3:

            expect(wrapper.find(VTabsItems).length).toBe(1);

          case 4:
          case 'end':
            return _context13.stop();
        }
      }
    }, _callee13, _this);
  })));

  it('should scroll active item into view if off screen', _asyncToGenerator(regeneratorRuntime.mark(function _callee14() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            wrapper = mount(VTabs, {
              attachToDocument: true,
              propsData: { value: 'bar' },
              slots: {
                default: [{
                  name: 'v-tab',
                  render: function render(h) {
                    return h(VTab, {
                      props: { href: 'foo' }
                    });
                  }
                }]
              }
            });
            _context14.next = 3;
            return ssrBootable();

          case 3:

            expect(wrapper.vm.scrollIntoView()).toEqual(false);

            wrapper.setProps({ value: 'foo' });
            // Simulate being scrolled too far to the right
            wrapper.setData({ scrollOffset: 400 });
            _context14.next = 8;
            return wrapper.vm.$nextTick();

          case 8:

            wrapper.vm.scrollIntoView();
            _context14.next = 11;
            return wrapper.vm.$nextTick();

          case 11:

            expect(wrapper.vm.scrollOffset).toBe(0);

            // DOM elements have no actual widths
            // Trick into running else condition
            wrapper.setData({ scrollOffset: -1 });
            wrapper.vm.scrollIntoView();
            _context14.next = 16;
            return wrapper.vm.$nextTick();

          case 16:

            expect(wrapper.vm.scrollOffset).toBe(0);

          case 17:
          case 'end':
            return _context14.stop();
        }
      }
    }, _callee14, _this);
  })));
});
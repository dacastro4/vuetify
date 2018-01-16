var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '@/util/testing';
import VTab from './VTab';
import Vue from 'vue';

var tabClick = 'Injection "tabClick" not found';
var tabsWarning = '[Vuetify] The v-tab component must be used inside a v-tabs';
var stub = {
  name: 'router-link',

  props: {
    to: [String, Object]
  },

  render: function render(h) {
    return h('a', {
      domProps: { href: this.to }
    });
  }
};

test('VTab', function (_ref) {
  var mount = _ref.mount;

  it('should render a div when disabled', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VTab, {
              propsData: {
                href: '#foo'
              }
            });


            expect(wrapper.find('.tabs__item')[0].vNode.elm.tagName).toBe('A');
            wrapper.setProps({ disabled: true });
            expect(wrapper.find('.tabs__item')[0].vNode.elm.tagName).toBe('DIV');

            expect(tabClick).toHaveBeenWarned();
            expect(tabsWarning).toHaveBeenTipped();

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should register and unregister', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var register, unregister, wrapper, item;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            register = jest.fn();
            unregister = jest.fn();
            wrapper = mount({
              provide: {
                tabs: {
                  register: register,
                  unregister: unregister
                }
              },
              render: function render(h) {
                return h('div', this.$slots.default);
              }
            }, {
              slots: {
                default: [VTab]
              }
            });
            item = wrapper.find(VTab)[0];

            item.destroy();

            expect(register).toHaveBeenCalled();
            expect(unregister).toHaveBeenCalled();
            expect(tabClick).toHaveBeenWarned();

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should emit click event and prevent default', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var click, wrapper, tab, event;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            click = jest.fn();
            wrapper = mount({
              provide: {
                tabClick: click
              },
              render: function render(h) {
                return h('div', this.$slots.default);
              }
            }, {
              slots: {
                default: [{
                  render: function render(h) {
                    return h(VTab, {
                      props: { href: '#foo' }
                    });
                  }
                }]
              }
            });
            tab = wrapper.find(VTab)[0];

            tab.vm.$on('click', click);
            event = new Event('click');

            tab.vm.click(event);
            _context3.next = 8;
            return wrapper.vm.$nextTick();

          case 8:
            // Cannot figure out how to ensure this actually happens
            // expect(event.defaultPrevented).toBe(false)
            expect(click).toHaveBeenCalled();
            expect(tabsWarning).toHaveBeenTipped();

          case 10:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should toggle isActive', function () {
    var wrapper = mount(VTab, {
      propsData: { href: '#foo' }
    });

    expect(wrapper.vm.isActive).toBe(false);
    wrapper.vm.toggle('foo');
    expect(wrapper.vm.isActive).toBe(true);
    expect(tabClick).toHaveBeenWarned();
    expect(tabsWarning).toHaveBeenTipped();
  });

  it('should not call tabClick', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var instance, wrapper, mockClick, click;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            instance = Vue.extend();

            instance.component('router-link', stub);
            wrapper = mount(VTab, {
              instance: instance
            });
            mockClick = jest.fn();
            click = jest.fn();


            wrapper.vm.$on('click', click);
            wrapper.setMethods({ tabClick: mockClick });
            wrapper.vm.onRouteChange();
            _context4.next = 10;
            return wrapper.vm.$nextTick();

          case 10:
            expect(mockClick).not.toHaveBeenCalled();

            wrapper.vm.click(new Event('click'));
            expect(mockClick.mock.calls.length).toBe(1);

            wrapper.setProps({ href: '/foo' });
            wrapper.vm.click(new Event('click'));
            _context4.next = 17;
            return wrapper.vm.$nextTick();

          case 17:
            expect(mockClick.mock.calls.length).toBe(2);

            wrapper.setProps({ href: null, to: '/foo' });
            wrapper.vm.click(new Event('click'));
            _context4.next = 22;
            return wrapper.vm.$nextTick();

          case 22:
            expect(mockClick.mock.calls.length).toBe(2);

            expect(tabClick).toHaveBeenWarned();
            expect(tabsWarning).toHaveBeenTipped();

          case 25:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should call tabClick', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var instance, wrapper, mockClick;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            instance = Vue.extend();

            instance.component('router-link', stub);
            wrapper = mount(VTab, {
              propsData: {
                to: '/foo'
              },
              globals: {
                $route: { path: '/foo' }
              },
              instance: instance
            });
            mockClick = jest.fn();

            wrapper.setMethods({ tabClick: mockClick });

            wrapper.vm.onRouteChange();
            _context5.next = 8;
            return wrapper.vm.$nextTick();

          case 8:
            expect(mockClick).not.toHaveBeenCalled();

            // Mock the actions that would normally
            // happen with a route-link
            wrapper.vm.isActive = true;
            wrapper.vm.$el.firstChild.classList.add('tabs__item--active');
            _context5.next = 13;
            return wrapper.vm.$nextTick();

          case 13:

            // Mock on route change
            wrapper.vm.onRouteChange();
            _context5.next = 16;
            return wrapper.vm.$nextTick();

          case 16:

            expect(mockClick).toHaveBeenCalled();
            expect(tabClick).toHaveBeenWarned();
            expect(tabsWarning).toHaveBeenTipped();

          case 19:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should have the correct actions', function () {
    var instance = Vue.extend();
    instance.component('router-link', stub);
    var wrapper = mount(VTab, {
      propsData: {
        href: '#foo'
      },
      instance: instance
    });

    expect(wrapper.vm.action).toBe('foo');
    wrapper.setProps({ href: null, to: '/foo' });
    expect(wrapper.vm.action).toBe('/foo');
    wrapper.setProps({ to: { path: '/bar' } });
    expect(wrapper.vm.action).toBe('/bar');
    wrapper.setProps({ to: null });
    expect(wrapper.vm.action).toBe(wrapper.vm);

    expect(tabClick).toHaveBeenWarned();
    expect(tabsWarning).toHaveBeenTipped();
  });
});
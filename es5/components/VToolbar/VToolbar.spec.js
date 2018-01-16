var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import Vue from 'vue';
import { test, resizeWindow } from '@util/testing';
import VApp from '@components/VApp';
import VToolbar from '@components/VToolbar';

var scrollWindow = function scrollWindow(y) {
  global.pageYOffset = y;
  global.dispatchEvent(new Event('scroll'));

  return new Promise(function (resolve) {
    return setTimeout(resolve, 200);
  });
};

test('VToolbar.vue', function (_ref) {
  var mount = _ref.mount;

  it('should render a colored toolbar', function () {
    var wrapper = mount(VToolbar, {
      propsData: {
        color: 'blue lighten-1'
      }
    });

    expect(wrapper.element.classList).toContain('blue');
    expect(wrapper.element.classList).toContain('lighten-1');
  });

  it('should render an extended toolbar', function () {
    var wrapper = mount(VToolbar, {
      propsData: {
        extended: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render an extended toolbar with specific height', function () {
    var wrapper = mount(VToolbar, {
      propsData: {
        extended: true,
        extensionHeight: 42
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should calculate paddings ', function () {
    var wrapper = mount(VToolbar);

    wrapper.vm.$vuetify.application.left = 42;
    wrapper.vm.$vuetify.application.right = 84;

    wrapper.setProps({ app: false, clippedLeft: false, clippedRight: false });
    expect(wrapper.vm.computedPaddingLeft).toBe(0);
    expect(wrapper.vm.computedPaddingRight).toBe(0);
    wrapper.setProps({ app: false, clippedLeft: true, clippedRight: true });
    expect(wrapper.vm.computedPaddingLeft).toBe(0);
    expect(wrapper.vm.computedPaddingRight).toBe(0);
    wrapper.setProps({ app: true, clippedLeft: false, clippedRight: false });
    expect(wrapper.vm.computedPaddingLeft).toBe(42);
    expect(wrapper.vm.computedPaddingRight).toBe(84);
    wrapper.setProps({ app: true, clippedLeft: true, clippedRight: true });
    expect(wrapper.vm.computedPaddingLeft).toBe(0);
    expect(wrapper.vm.computedPaddingRight).toBe(0);
  });

  it('should calculate application top', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VToolbar, {
              propsData: {
                app: true,
                fixed: true,
                height: 21
              }
            });


            expect(wrapper.vm.$vuetify.application.top).toBe(21);
            wrapper.setProps({
              height: 42
            });
            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.$vuetify.application.top).toBe(42);

            wrapper.setProps({
              invertedScroll: true
            });
            _context.next = 9;
            return wrapper.vm.$nextTick();

          case 9:
            expect(wrapper.vm.$vuetify.application.top).toBe(0);

            wrapper.setProps({
              invertedScroll: false
            });
            _context.next = 13;
            return wrapper.vm.$nextTick();

          case 13:
            expect(wrapper.vm.$vuetify.application.top).toBe(42);

            wrapper.setProps({
              manualScroll: true
            });
            _context.next = 17;
            return wrapper.vm.$nextTick();

          case 17:
            expect(wrapper.vm.$vuetify.application.top).toBe(0);

          case 18:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should properly calculate content height', function () {
    var wrapper = mount(VToolbar);

    wrapper.setProps({
      height: 999
    });
    expect(wrapper.vm.computedContentHeight).toBe(999);

    wrapper.setProps({
      height: null,
      dense: true
    });
    expect(wrapper.vm.computedContentHeight).toBe(wrapper.vm.heights.dense);

    wrapper.setProps({
      height: null,
      dense: false,
      prominent: true
    });
    expect(wrapper.vm.computedContentHeight).toBe(wrapper.vm.heights.desktop);

    wrapper.setProps({
      height: null,
      dense: false,
      prominent: false
    });
    Vue.set(wrapper.vm.$vuetify.breakpoint, 'width', 200);
    Vue.set(wrapper.vm.$vuetify.breakpoint, 'height', 100);
    expect(wrapper.vm.computedContentHeight).toBe(wrapper.vm.heights.mobileLandscape);
    Vue.set(wrapper.vm.$vuetify.breakpoint, 'width', 100);
    Vue.set(wrapper.vm.$vuetify.breakpoint, 'height', 200);
    expect(wrapper.vm.computedContentHeight).toBe(wrapper.vm.heights.mobile);
  });

  it('should set margin top', function () {
    var wrapper = mount(VToolbar, {
      propsData: {
        app: true
      }
    });

    Vue.set(wrapper.vm.$vuetify.application, 'bar', 24);
    expect(wrapper.vm.computedMarginTop).toBe(24);
  });

  it('should set active based on manual scroll', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VToolbar, {
              propsData: {
                scrollOffScreen: true
              }
            });


            expect(wrapper.vm.isActive).toBe(true);
            wrapper.setProps({ manualScroll: true });
            _context2.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.isActive).toBe(false);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it.skip('should set a custom target', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(VToolbar, {
              propsData: {
                target: 'body'
              }
            });


            wrapper.vm.onScroll();
            expect(wrapper.vm.target).toBe('body');

          case 3:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it.skip('should set isScrollingUp', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(VToolbar);
            _context4.next = 3;
            return scrollWindow(100);

          case 3:
            expect(wrapper.vm.isScrollingUp).toBe(false);
            _context4.next = 6;
            return scrollWindow(0);

          case 6:
            expect(wrapper.vm.isScrollingUp).toBe(true);

          case 7:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should update the application content height if screen size changes', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var app, wrapper;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            app = mount(VApp);
            wrapper = mount(VToolbar, {
              propsData: {
                app: true
              }
            });
            _context5.next = 4;
            return resizeWindow(1920);

          case 4:
            expect(wrapper.vm.$vuetify.application.top).toBe(64);

            _context5.next = 7;
            return resizeWindow(200);

          case 7:
            expect(wrapper.vm.$vuetify.application.top).toBe(56);

          case 8:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));
});
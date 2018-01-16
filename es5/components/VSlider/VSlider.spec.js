var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '@util/testing';
import VSlider from './VSlider';

var warning = '[Vuetify] Missing v-app or a non-body wrapping element with the [data-app] attribute in "v-slider"';

test('Vslider.vue', function (_ref) {
  var mount = _ref.mount;

  it('should match a snapshot', function () {
    var wrapper = mount(VSlider);

    expect(wrapper.html()).toMatchSnapshot();
    expect(warning).toHaveBeenTipped();
  });

  it('should render component with ticks and match a snapshot', function () {
    var wrapper = mount(VSlider, {
      propsData: {
        ticks: true,
        step: 25
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(warning).toHaveBeenTipped();
  });

  it('should render component with thumbLabel and match a snapshot', function () {
    var wrapper = mount(VSlider, {
      propsData: {
        thumbLabel: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
    expect(warning).toHaveBeenTipped();
  });

  it('should set tabindex in disabled component', function () {
    var wrapper = mount(VSlider, {
      propsData: {
        disabled: true
      }
    });

    expect(wrapper.element.getAttribute('tabindex')).toBe('-1');
    expect(warning).toHaveBeenTipped();
  });

  it('should not allow values outside of min/max', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VSlider, {
              propsData: {
                min: 2,
                max: 4
              }
            });
            input = jest.fn();

            wrapper.instance().$on('input', input);

            wrapper.setProps({ value: 0 });
            _context.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(input).toBeCalledWith(2);

            wrapper.setProps({ value: 5 });
            _context.next = 10;
            return wrapper.vm.$nextTick();

          case 10:
            expect(input).toBeCalledWith(4);

            expect(warning).toHaveBeenTipped();

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should adjust value if min/max props change', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VSlider, {
              propsData: {
                value: 5,
                min: 0,
                max: 10
              }
            });
            input = jest.fn();

            wrapper.instance().$on('input', input);

            wrapper.setProps({ min: 6 });
            _context2.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(input).toBeCalledWith(6);

            wrapper.setProps({ max: 4 });
            _context2.next = 10;
            return wrapper.vm.$nextTick();

          case 10:
            expect(input).toBeCalledWith(4);

            expect(warning).toHaveBeenTipped();

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should be focused when active', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(VSlider, {
              propsData: {
                value: 5,
                min: 0,
                max: 10
              }
            });


            wrapper.setData({ isActive: true });

            _context3.next = 4;
            return wrapper.vm.$nextTick();

          case 4:

            expect(wrapper.vm.isFocused).toBe(true);
            expect(wrapper.html()).toMatchSnapshot();
            expect(warning).toHaveBeenTipped();

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should react to keydown event', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(VSlider, {
              propsData: {
                value: 50
              }
            });
            input = jest.fn();

            wrapper.vm.$on('input', input);

            wrapper.trigger('keydown.space');
            expect(input).not.toBeCalled();
            wrapper.trigger('keydown.left');
            expect(input).toBeCalledWith(49);
            wrapper.trigger('keydown.right');
            expect(input).toBeCalledWith(51);
            wrapper.trigger('keydown.home');
            expect(input).toBeCalledWith(0);
            wrapper.trigger('keydown.end');
            expect(input).toBeCalledWith(100);
            wrapper.trigger('keydown.pageup');
            expect(input).toBeCalledWith(40);
            wrapper.trigger('keydown.pagedown');
            expect(input).toBeCalledWith(60);

            expect(warning).toHaveBeenTipped();

          case 18:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));
});
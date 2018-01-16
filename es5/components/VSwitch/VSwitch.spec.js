var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test, touch } from '@util/testing';
import VSwitch from '@components/VSwitch';

test('VSwitch.js', function (_ref) {
  var mount = _ref.mount;

  it('should set ripple data attribute based on ripple prop state', function () {
    var wrapper = mount(VSwitch, {
      propsData: {
        inputValue: false,
        ripple: false
      }
    });

    var ripple = wrapper.find('.input-group--selection-controls__ripple')[0];

    expect(ripple.getAttribute('data-ripple')).toBe('false');

    wrapper.setProps({ ripple: true });

    expect(ripple.getAttribute('data-ripple')).toBe('true');
  });

  it('should emit change event on swipe', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper, change;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VSwitch, {
              props: {
                inputValue: false
              }
            });
            change = jest.fn();

            wrapper.vm.$on('change', change);
            touch(wrapper.find('.input-group--selection-controls__ripple')[0]).start(0, 0).end(20, 0);
            expect(change).toBeCalledWith(true);

            wrapper.setProps({ inputValue: true });
            touch(wrapper.find('.input-group--selection-controls__ripple')[0]).start(0, 0).end(-20, 0);
            expect(change).toBeCalledWith(false);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('shouldn not emit change event on swipe when not active', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper, change;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VSwitch, {
              props: {
                inputValue: false
              }
            });
            change = jest.fn();

            wrapper.vm.$on('change', change);
            touch(wrapper.find('.input-group--selection-controls__ripple')[0]).start(0, 0).end(-20, 0);
            expect(change).not.toBeCalled();

            wrapper.setProps({ inputValue: true });
            touch(wrapper.find('.input-group--selection-controls__ripple')[0]).start(0, 0).end(20, 0);
            expect(change).not.toBeCalled();

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should render component with error', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(VSwitch, {
              props: {
                errorMessages: ['error']
              }
            });


            expect(wrapper.html()).toMatchSnapshot();

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));
});
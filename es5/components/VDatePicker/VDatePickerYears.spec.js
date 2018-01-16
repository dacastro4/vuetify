var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import VDatePickerYears from './VDatePickerYears';
import { test } from '@util/testing';

test('VDatePickerYears.js', function (_ref) {
  var mount = _ref.mount;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VDatePickerYears, {
      propsData: {
        value: '2000'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should respect min/max props', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VDatePickerYears, {
              propsData: {
                min: 1234,
                max: 1238
              }
            });


            expect(wrapper.find('li:first-child')[0].element.textContent).toBe('1238');
            expect(wrapper.find('li:last-child')[0].element.textContent).toBe('1234');

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should not allow min to be greater then max', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VDatePickerYears, {
              propsData: {
                min: 1238,
                max: 1234
              }
            });

            expect(wrapper.find('li').length).toBe(1);
            expect(wrapper.find('li')[0].element.textContent).toBe('1234');
            expect(wrapper.find('li')[0].element.textContent).toBe('1234');

          case 4:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should emit event on year click', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(VDatePickerYears, {
              propsData: {
                value: 1999
              }
            });
            input = jest.fn();

            wrapper.vm.$on('input', input);

            wrapper.find('li.active + li')[0].trigger('click');
            expect(input).toBeCalledWith(1998);

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should format years', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(VDatePickerYears, {
              propsData: {
                format: function format(year) {
                  return '(' + year + ')';
                },
                min: 1001,
                max: 1001
              }
            });


            expect(wrapper.find('li')[0].element.textContent).toBe('(1001)');

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));
});
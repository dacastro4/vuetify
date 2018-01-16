var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '@util/testing';
import VSelect from '@components/VSelect';
import VMenu from '@components/VMenu';

test('VSelect - combobox', function (_ref) {
  var mount = _ref.mount;

  it('should emit custom value on blur', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper, input, change;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                combobox: true,
                value: null
              }
            });
            input = wrapper.find('input')[0];
            change = jest.fn();

            wrapper.vm.$on('input', change);

            input.trigger('focus');
            _context.next = 7;
            return wrapper.vm.$nextTick();

          case 7:

            input.element.value = 'foo';
            input.trigger('input');
            _context.next = 11;
            return wrapper.vm.$nextTick();

          case 11:

            wrapper.vm.blur();
            _context.next = 14;
            return wrapper.vm.$nextTick();

          case 14:

            expect(change).toHaveBeenCalledWith('foo');
            expect('Unable to locate target [data-app]').toHaveBeenTipped();

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should evaluate the range of an integer', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VSelect, {
              propsData: {
                combobox: true,
                value: 11
              }
            });
            _context2.next = 3;
            return wrapper.vm.$nextTick();

          case 3:
            expect(wrapper.vm.currentRange).toBe(2);

            wrapper.setProps({ value: 0 });
            _context2.next = 7;
            return wrapper.vm.$nextTick();

          case 7:
            expect(wrapper.vm.currentRange).toBe(1);

            expect('Unable to locate target [data-app]').toHaveBeenTipped();

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should not use search input when blurring', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper, event, input, list;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(VSelect, {
              attachToDocument: true,
              propsData: {
                combobox: true,
                items: [1, 12]
              }
            });
            event = jest.fn();

            wrapper.vm.$on('input', event);

            input = wrapper.find('input')[0];

            input.trigger('focus');
            _context3.next = 7;
            return wrapper.vm.$nextTick();

          case 7:

            wrapper.setProps({ searchInput: '1' });
            _context3.next = 10;
            return wrapper.vm.$nextTick();

          case 10:

            expect(wrapper.vm.searchValue).toBe('1');

            list = wrapper.find('.list li')[1];

            list.trigger('click');
            _context3.next = 15;
            return wrapper.vm.$nextTick();

          case 15:
            expect(event).toBeCalledWith(12);
            expect('Unable to locate target [data-app]').toHaveBeenTipped();

          case 17:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should not use search input if an option is selected from the menu', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var item, wrapper, event;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            item = { value: 123, text: 'Foo' };
            wrapper = mount(VSelect, {
              propsData: {
                combobox: true,
                items: [item]
              }
            });
            event = jest.fn();

            wrapper.vm.$on('input', event);

            wrapper.setData({ isActive: true });
            _context4.next = 7;
            return wrapper.vm.$nextTick();

          case 7:

            wrapper.vm.selectItem(item);
            _context4.next = 10;
            return wrapper.vm.$nextTick();

          case 10:

            wrapper.setData({ isActive: false });
            _context4.next = 13;
            return wrapper.vm.$nextTick();

          case 13:

            expect(event).toBeCalledWith(item);
            expect('Unable to locate target [data-app]').toHaveBeenTipped();

          case 15:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should not populate search field if value is falsey', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var wrapper, event;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            wrapper = mount(VSelect, {
              propsData: {
                combobox: true
              }
            });
            event = jest.fn();

            wrapper.vm.$on('input', event);

            wrapper.setData({ isActive: true });
            _context5.next = 6;
            return wrapper.vm.$nextTick();

          case 6:

            wrapper.setProps({ searchInput: '' });
            _context5.next = 9;
            return wrapper.vm.$nextTick();

          case 9:

            wrapper.setData({ isActive: false });
            _context5.next = 12;
            return wrapper.vm.$nextTick();

          case 12:

            expect(event).not.toBeCalled();
            expect('Unable to locate target [data-app]').toHaveBeenTipped();

          case 14:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));
});
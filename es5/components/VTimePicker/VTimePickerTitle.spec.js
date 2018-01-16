var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import VTimePickerTitle from './VTimePickerTitle';
import { test } from '@util/testing';

test('VTimePickerTitle.js', function (_ref) {
  var mount = _ref.mount;

  it('should render component in 24hr', function () {
    var wrapper = mount(VTimePickerTitle, {
      propsData: {
        value: '14:13',
        ampm: false
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component in 12hr', function () {
    var wrapper = mount(VTimePickerTitle, {
      propsData: {
        value: '14:13',
        ampm: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component when selecting hour', function () {
    var wrapper = mount(VTimePickerTitle, {
      propsData: {
        value: '14:13',
        selectingHour: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should emit event when clicked on am/pm', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper, period;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VTimePickerTitle, {
              propsData: {
                value: '14:13',
                ampm: true
              }
            });
            period = jest.fn();

            wrapper.vm.$on('update:period', period);

            wrapper.find('.time-picker-title__ampm .picker__title__btn.active')[0].trigger('click');
            expect(period).not.toBeCalled();
            wrapper.find('.time-picker-title__ampm .picker__title__btn:not(.active)')[0].trigger('click');
            expect(period).toBeCalledWith('am');

            wrapper.setProps({
              value: '2:13'
            });
            wrapper.find('.time-picker-title__ampm .picker__title__btn:not(.active)')[0].trigger('click');
            expect(period).toBeCalledWith('pm');

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should emit event when clicked on hours/minutes', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper, selectingHour;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VTimePickerTitle, {
              propsData: {
                value: '14:13'
              }
            });
            selectingHour = jest.fn();

            wrapper.vm.$on('update:selectingHour', selectingHour);

            wrapper.find('.time-picker-title__time .picker__title__btn')[1].trigger('click');
            expect(selectingHour).not.toBeCalled();
            wrapper.find('.time-picker-title__time .picker__title__btn')[0].trigger('click');
            expect(selectingHour).toBeCalledWith(true);
            wrapper.setProps({ selectingHour: true });
            _context2.next = 10;
            return wrapper.vm.$nextTick();

          case 10:
            wrapper.find('.time-picker-title__time .picker__title__btn')[1].trigger('click');
            expect(selectingHour).toBeCalledWith(false);

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));
});
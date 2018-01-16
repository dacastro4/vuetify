var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { compileToFunctions } from 'vue-template-compiler';
import VDatePickerDateTable from './VDatePickerDateTable';
import { test } from '@util/testing';

test('VDatePickerDateTable.js', function (_ref) {
  var mount = _ref.mount;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with events and match snapshot', function () {
    var wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        events: ['2005-05-03'],
        eventColor: 'red'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with events colored by object and match snapshot', function () {
    var wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        events: ['2005-05-03', '2005-05-04'],
        eventColor: { '2005-05-03': 'red', '2005-05-04': 'blue lighten-1' }
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with events colored by object and match snapshot', function () {
    var wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        events: ['2005-05-03', '2005-05-04'],
        eventColor: function eventColor(date) {
          return { '2005-05-03': 'red' }[date];
        }
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with first day of week', function () {
    var wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        firstDayOfWeek: 2
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should watch tableDate value and run transition', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VDatePickerDateTable, {
              propsData: {
                tableDate: '2005-05',
                current: '2005-07',
                value: '2005-11-03'
              }
            });


            wrapper.setProps({
              tableDate: '2005-06'
            });
            _context.next = 4;
            return wrapper.vm.$nextTick();

          case 4:
            expect(wrapper.find('table')[0].element.className).toBe('tab-transition-enter tab-transition-enter-active');

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should watch tableDate value and run reverse transition', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VDatePickerDateTable, {
              propsData: {
                tableDate: '2005-05',
                current: '2005-07',
                value: '2005-11-03'
              }
            });


            wrapper.setProps({
              tableDate: '2005-04'
            });
            _context2.next = 4;
            return wrapper.vm.$nextTick();

          case 4:
            expect(wrapper.find('table')[0].element.className).toBe('tab-reverse-transition-enter tab-reverse-transition-enter-active');

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should emit event when date button is clicked', function () {
    var wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03'
      }
    });

    var input = jest.fn();
    wrapper.vm.$on('input', input);

    wrapper.find('tbody button')[0].trigger('click');
    expect(input).toBeCalledWith('2005-05-01');
  });

  it('should not emit event when disabled month button is clicked', function () {
    var wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        current: '2005-07',
        value: '2005-11-03',
        allowedDates: function allowedDates() {
          return false;
        }
      }
    });

    var input = jest.fn();
    wrapper.vm.$on('input', input);

    wrapper.find('tbody button')[0].trigger('click');
    expect(input).not.toBeCalled();
  });

  it('should emit tableDate event when scrolled and scrollable', function () {
    var wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05',
        scrollable: true
      }
    });

    var tableDate = jest.fn();
    wrapper.vm.$on('tableDate', tableDate);

    wrapper.trigger('wheel');
    expect(tableDate).toBeCalledWith('2005-06');
  });

  it('should not emit tableDate event when scrolled and not scrollable', function () {
    var wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05'
      }
    });

    var tableDate = jest.fn();
    wrapper.vm.$on('tableDate', tableDate);

    wrapper.trigger('wheel');
    expect(tableDate).not.toBeCalled();
  });

  // TODO
  it.skip('should emit tableDate event when swiped', function () {
    var wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05'
      }
    });

    var tableDate = jest.fn();
    wrapper.vm.$on('tableDate', tableDate);

    wrapper.trigger('touchstart');
    wrapper.trigger('touchend');
    expect(tableDate).toBeCalledWith('2005-06');
  });

  it('should change tableDate when touch is called', function () {
    var wrapper = mount(VDatePickerDateTable, {
      propsData: {
        tableDate: '2005-05'
      }
    });

    var tableDate = jest.fn();
    wrapper.vm.$on('tableDate', tableDate);

    wrapper.vm.touch(1);
    expect(tableDate).toBeCalledWith('2005-06');
    wrapper.vm.touch(-1);
    expect(tableDate).toBeCalledWith('2005-04');
  });
});
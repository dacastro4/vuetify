var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import Vue from 'vue';
import { test } from '@util/testing';
import VDatePicker from './VDatePicker';
import VMenu from '@components/VMenu';

function createMenuPicker(mount, props) {
  var wrapper = mount(Vue.component('test', {
    components: {
      VDatePicker: VDatePicker,
      VMenu: VMenu
    },
    render: function render(h) {
      return h('v-menu', {
        ref: 'menu'
      }, [h('v-date-picker', {
        props: props,
        ref: 'picker'
      })]);
    }
  }));

  var menu = wrapper.vm.$refs.menu;
  menu.isActive = true;

  var picker = menu.$slots.default[0].context.$refs.picker;

  expect('Unable to locate target [data-app]').toHaveBeenTipped();

  return { wrapper: wrapper, menu: menu, picker: picker };
}

test('VDatePicker.js', function (_ref) {
  var mount = _ref.mount,
      compileToFunctions = _ref.compileToFunctions;

  it('should emit input event on year click', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var cb, wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cb = jest.fn();
            wrapper = mount(VDatePicker, {
              propsData: {
                value: '2013-05',
                type: 'month'
              },
              data: {
                activePicker: 'YEAR'
              }
            });


            wrapper.vm.$on('input', cb);
            wrapper.find('.date-picker-years li.active + li')[0].trigger('click');
            expect(cb).toBeCalledWith('2012-05');

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should not emit input event on year click if month is not allowed', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var cb, wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cb = jest.fn();
            wrapper = mount(VDatePicker, {
              propsData: {
                value: '2013-05',
                type: 'month',
                allowedDates: []
              },
              data: {
                activePicker: 'YEAR'
              }
            });


            wrapper.vm.$on('input', cb);
            wrapper.find('.date-picker-years li.active + li')[0].trigger('click');
            expect(cb).not.toBeCalled();

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should emit input event on month click', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var cb, wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            cb = jest.fn();
            wrapper = mount(VDatePicker, {
              propsData: {
                value: '2013-05',
                type: 'month'
              }
            });


            wrapper.vm.$on('input', cb);
            wrapper.find('.date-picker-table--month button')[0].trigger('click');
            expect(cb).toBeCalledWith('2013-01');

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should be scrollable', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(VDatePicker, {
              propsData: {
                value: '2013-05',
                type: 'month',
                scrollable: true
              }
            });


            wrapper.find('.date-picker-table--month')[0].trigger('wheel');
            _context4.next = 4;
            return wrapper.vm.$nextTick();

          case 4:
            expect(wrapper.vm.tableDate).toBe('2014');

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should match snapshot with pick-month prop', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        type: 'month'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with allowed dates as array', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05',
        type: 'month',
        allowedDates: ['2013-01', '2013-03', '2013-05', '2013-07', 'invalid month']
      }
    });

    expect(wrapper.find('.date-picker-table--month tbody')[0].html()).toMatchSnapshot();
  });

  it('should match snapshot with month formatting functions', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        type: 'month',
        monthFormat: function monthFormat(date) {
          return '(' + date.split('-')[1] + ')';
        }
      }
    });

    expect(wrapper.find('.date-picker-table--month tbody')[0].html()).toMatchSnapshot();
  });

  it('should match snapshot with colored picker', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        type: 'month',
        value: '2005-11-01',
        color: 'primary',
        headerColor: 'orange darken-1'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with colored picker', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        type: 'month',
        value: '2005-11-01',
        color: 'orange darken-1'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match change month when clicked on header arrow buttons', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11',
        type: 'month'
      }
    });

    var _wrapper$find = wrapper.find('.date-picker-header button'),
        _wrapper$find2 = _slicedToArray(_wrapper$find, 2),
        leftButton = _wrapper$find2[0],
        rightButton = _wrapper$find2[1];

    leftButton.trigger('click');
    expect(wrapper.vm.tableDate).toBe('2004');

    rightButton.trigger('click');
    expect(wrapper.vm.tableDate).toBe('2006');
  });

  it('should match change active picker when clicked on month button', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        type: 'month'
      }
    });

    var button = wrapper.find('.date-picker-header strong')[0];

    button.trigger('click');
    expect(wrapper.vm.activePicker).toBe('YEAR');
  });

  it('should select year', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            wrapper = mount(VDatePicker, {
              data: {
                activePicker: 'YEAR'
              },
              propsData: {
                type: 'month',
                value: '2005-11'
              }
            });


            wrapper.find('.date-picker-years li.active + li')[0].trigger('click');
            expect(wrapper.vm.activePicker).toBe('MONTH');
            expect(wrapper.vm.tableDate).toBe('2004');

          case 4:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should calculate the first allowed date', function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();

    var wrapper2 = mount(VDatePicker, {
      propsData: {
        value: null,
        type: 'month',
        allowedDates: [year + '-03']
      }
    });
    expect(wrapper2.vm.inputDate).toBe(year + '-03');
  });

  it('should set the table date when value has changed', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: null,
        type: 'month'
      }
    });

    wrapper.setProps({ value: '2005-11' });
    expect(wrapper.vm.tableDate).toBe('2005');
  });

  it('should update with autosave on month click', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var _createMenuPicker, wrapper, menu, picker, input;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _createMenuPicker = createMenuPicker(mount, {
              type: 'month',
              value: '2013-05',
              autosave: true
            }), wrapper = _createMenuPicker.wrapper, menu = _createMenuPicker.menu, picker = _createMenuPicker.picker;
            input = jest.fn();

            picker.$on('input', input);

            picker.monthClick('2013-06');
            expect(menu.isActive).toBe(true);
            _context6.next = 7;
            return wrapper.vm.$nextTick();

          case 7:
            expect(menu.isActive).toBe(false);
            expect(input).toBeCalledWith('2013-06');

          case 9:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));

  it('should use prev and next icons', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        type: 'month',
        prependIcon: 'block',
        appendIcon: 'check'
      }
    });

    var icons = wrapper.find('.date-picker-header .icon');
    expect(icons[0].element.textContent).toBe('block');
    expect(icons[1].element.textContent).toBe('check');
  });
});
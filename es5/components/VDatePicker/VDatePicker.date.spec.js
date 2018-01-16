var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import Vue from 'vue';
import { test, touch } from '@util/testing';
import VDatePicker from './VDatePicker';
import VMenu from '@components/VMenu';

test('VDatePicker.js', function (_ref) {
  var mount = _ref.mount,
      compileToFunctions = _ref.compileToFunctions;

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

  it('should display the correct date in title and header', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01'
      }
    });

    var title = wrapper.find('.date-picker-title__date')[0];
    var header = wrapper.find('.date-picker-header__value strong')[0];

    expect(title.text()).toBe('Tue, Nov 1');
    expect(header.text()).toBe('November 2005');
  });

  it('should match snapshot with default settings', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render readonly picker', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        readonly: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should emit input event on date click', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var cb, wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            cb = jest.fn();
            wrapper = mount(VDatePicker, {
              propsData: {
                value: '2013-05-07'
              }
            });


            wrapper.vm.$on('input', cb);
            wrapper.find('.date-picker-table--date tbody tr+tr td:first-child button')[0].trigger('click');
            expect(cb).toBeCalledWith('2013-05-05');

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should emit input event on month click', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var cb, wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cb = jest.fn();
            wrapper = mount(VDatePicker, {
              propsData: {
                value: '2013-05-13'
              },
              data: {
                activePicker: 'MONTH'
              }
            });


            wrapper.vm.$on('input', cb);
            wrapper.find('.date-picker-table--month button')[0].trigger('click');
            expect(cb).toBeCalledWith('2013-01-13');

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should not emit input event on month click if date is not allowed', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var cb, wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            cb = jest.fn();
            wrapper = mount(VDatePicker, {
              propsData: {
                value: '2013-05-13',
                allowedDates: []
              },
              data: {
                activePicker: 'MONTH'
              }
            });


            wrapper.vm.$on('input', cb);
            wrapper.find('.date-picker-table--month button')[0].trigger('click');
            expect(cb).not.toBeCalled();

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should emit input event on year click', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var cb, wrapper;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            cb = jest.fn();
            wrapper = mount(VDatePicker, {
              propsData: {
                value: '2013-05-13'
              },
              data: {
                activePicker: 'YEAR'
              }
            });


            wrapper.vm.$on('input', cb);
            wrapper.find('.date-picker-years li.active + li')[0].trigger('click');
            expect(cb).toBeCalledWith('2012-05-13');

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should not emit input event on year click if date is not allowed', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var cb, wrapper;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            cb = jest.fn();
            wrapper = mount(VDatePicker, {
              propsData: {
                value: '2013-05-13',
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
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should be scrollable', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            wrapper = mount(VDatePicker, {
              propsData: {
                value: '2013-05-07',
                scrollable: true
              }
            });


            wrapper.find('.date-picker-table--date')[0].trigger('wheel');
            expect(wrapper.vm.tableDate).toBe('2013-06');

          case 3:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));

  it('should change tableDate on touch', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var wrapper, table;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            wrapper = mount(VDatePicker, {
              propsData: {
                value: '2013-05-07',
                scrollable: true
              }
            });
            table = wrapper.find('.date-picker-table--date')[0];

            touch(table).start(0, 0).end(20, 0);
            expect(wrapper.vm.tableDate).toBe('2013-04');

            touch(table).start(0, 0).end(-20, 0);
            expect(wrapper.vm.tableDate).toBe('2013-06');

          case 6:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  })));

  it('should match snapshot with dark theme', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        dark: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with no title', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        noTitle: true
      }
    });

    expect(wrapper.find('.picker__title')).toHaveLength(0);
  });

  it('should pass first day of week to date-picker-table component', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        firstDayOfWeek: 2
      }
    });

    expect(wrapper.vm.$refs.table.firstDayOfWeek).toBe(2);
  });

  // TODO: This fails in different ways for multiple people
  // Avoriaz/Jsdom (?) doesn't fully support date formatting using locale
  // This should be tested in browser env
  it.skip('should match snapshot with locale', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        locale: 'fa-AF'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with title/header formatting functions', function () {
    var dateFormat = function dateFormat(date) {
      return '(' + date + ')';
    };
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        headerDateFormat: dateFormat,
        titleDateFormat: dateFormat
      }
    });

    expect(wrapper.find('.date-picker-title__date')[0].text()).toBe('(2005-11-01)');
    expect(wrapper.find('.date-picker-header__value')[0].text()).toBe('(2005-11)');
  });

  it('should match snapshot with colored picker', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
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
        value: '2005-11-01',
        color: 'orange darken-1'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match snapshot with year icon', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01',
        yearIcon: 'year'
      }
    });

    expect(wrapper.find('.picker__title')[0].html()).toMatchSnapshot();
  });

  it('should match change month when clicked on header arrow buttons', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01'
      }
    });

    var _wrapper$find = wrapper.find('.date-picker-header button'),
        _wrapper$find2 = _slicedToArray(_wrapper$find, 2),
        leftButton = _wrapper$find2[0],
        rightButton = _wrapper$find2[1];

    leftButton.trigger('click');
    expect(wrapper.vm.tableDate).toBe('2005-10');

    rightButton.trigger('click');
    expect(wrapper.vm.tableDate).toBe('2005-12');
  });

  it('should match change active picker when clicked on month button', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2005-11-01'
      }
    });

    var button = wrapper.find('.date-picker-header strong')[0];

    button.trigger('click');
    expect(wrapper.vm.activePicker).toBe('MONTH');
  });

  it('should match snapshot with slot', _asyncToGenerator(regeneratorRuntime.mark(function _callee8() {
    var vm, slot, component, wrapper;
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            vm = new Vue();

            slot = function slot(props) {
              return vm.$createElement('div', { class: 'scoped-slot' });
            };

            component = Vue.component('test', {
              components: {
                VDatePicker: VDatePicker
              },
              render: function render(h) {
                return h('v-date-picker', {
                  props: {
                    type: 'date',
                    value: '2005-11-01'
                  },
                  scopedSlots: {
                    default: slot
                  }
                });
              }
            });
            wrapper = mount(component);

            expect(wrapper.find('.picker__actions .scoped-slot')).toHaveLength(1);

          case 5:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, _this);
  })));

  it('should match years snapshot', _asyncToGenerator(regeneratorRuntime.mark(function _callee9() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            wrapper = mount(VDatePicker, {
              data: {
                activePicker: 'YEAR'
              },
              propsData: {
                type: 'date',
                value: '2005-11-01'
              }
            });


            expect(wrapper.vm.activePicker).toBe('YEAR');

            wrapper.find('.date-picker-title__date')[0].trigger('click');
            _context9.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.activePicker).toBe('DATE');

            wrapper.find('.date-picker-title__year')[0].trigger('click');
            _context9.next = 9;
            return wrapper.vm.$nextTick();

          case 9:
            expect(wrapper.vm.activePicker).toBe('YEAR');

          case 10:
          case 'end':
            return _context9.stop();
        }
      }
    }, _callee9, _this);
  })));

  it('should select year', _asyncToGenerator(regeneratorRuntime.mark(function _callee10() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            wrapper = mount(VDatePicker, {
              data: {
                activePicker: 'YEAR'
              },
              propsData: {
                type: 'date',
                value: '2005-11-01'
              }
            });


            wrapper.find('.date-picker-years li.active + li')[0].trigger('click');
            expect(wrapper.vm.activePicker).toBe('MONTH');
            expect(wrapper.vm.tableDate).toBe('2004-11');

          case 4:
          case 'end':
            return _context10.stop();
        }
      }
    }, _callee10, _this);
  })));

  it('should calculate the first allowed date', function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var date = now.getDate();

    var wrapper2 = mount(VDatePicker, {
      propsData: {
        value: null,
        allowedDates: [year + '-' + ((month < 9 ? '0' : '') + (month + 1)) + '-03']
      }
    });
    expect(wrapper2.vm.inputDate).toBe(year + '-' + ((month < 9 ? '0' : '') + (month + 1)) + '-03');
  });

  it('should set the table date when value has changed', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: null
      }
    });

    wrapper.setProps({ value: '2005-11-11' });
    expect(wrapper.vm.tableDate).toBe('2005-11');
  });

  it('should update the active picker if type has changed', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '1999-12-13',
        type: 'date'
      }
    });

    wrapper.vm.$on('input', function (value) {
      return wrapper.setProps({ value: value });
    });

    wrapper.setProps({ type: 'month' });
    expect(wrapper.vm.activePicker).toBe('MONTH');
    expect(wrapper.vm.value).toBe('1999-12');
    // TODO: uncomment when type: 'year' is implemented
    // wrapper.setProps({ type: 'year' })
    // expect(wrapper.vm.activePicker).toBe('YEAR')
    // expect(wrapper.vm.inputDate).toBe('1999')
    // wrapper.setProps({ type: 'month' })
    // expect(wrapper.vm.activePicker).toBe('MONTH')
    // expect(wrapper.vm.inputDate).toBe('1999-01')
    wrapper.setProps({ type: 'date' });
    expect(wrapper.vm.activePicker).toBe('DATE');
    expect(wrapper.vm.value).toBe('1999-12-01');
  });

  it('should emit original date if value is set to null', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        type: 'date',
        value: '2013-05-07'
      }
    });

    var input = jest.fn();
    wrapper.vm.$on('input', input);

    wrapper.vm.inputDate = '2014-06-08';
    expect(input).toBeCalledWith('2014-06-08');

    wrapper.vm.inputDate = null;
    expect(input).toBeCalledWith('2013-05-07');
  });

  it('should match snapshot with allowed dates as array', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07',
        allowedDates: ['2013-05-06', '2013-05-07', 'invalid date']
      }
    });

    expect(wrapper.find('.date-picker-table--date tbody')[0].html()).toMatchSnapshot();
  });

  it('should format title date', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07'
      }
    });

    expect(wrapper.vm.defaultTitleDateFormatter('2013-03-05')).toBe('Tue, Mar 5');

    wrapper.setProps({ landscape: true });
    expect(wrapper.vm.defaultTitleDateFormatter('2013-03-05')).toBe('Tue,<br>Mar 5');
  });

  it('should deactivate parent component on cancel', function () {
    var _createMenuPicker = createMenuPicker(mount, { value: '2013-05-07' }),
        wrapper = _createMenuPicker.wrapper,
        menu = _createMenuPicker.menu,
        picker = _createMenuPicker.picker;

    picker.dateClick('2013-06-08');
    picker.cancel();
    expect(menu.isActive).toBe(false);
    expect(picker.inputDate).toBe('2013-05-07');

    var wrapperNoParent = mount(VDatePicker, {
      propsData: {
        value: '2013-05-07'
      }
    });
    wrapperNoParent.vm.cancel();
  });

  it('should update with autosave on date click', _asyncToGenerator(regeneratorRuntime.mark(function _callee11() {
    var _createMenuPicker2, wrapper, menu, picker, input, wrapperNoParent;

    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _createMenuPicker2 = createMenuPicker(mount, {
              value: '2013-05-07',
              autosave: true
            }), wrapper = _createMenuPicker2.wrapper, menu = _createMenuPicker2.menu, picker = _createMenuPicker2.picker;
            input = jest.fn();

            picker.$on('input', input);

            picker.dateClick('2013-06-08');
            expect(menu.isActive).toBe(true);
            _context11.next = 7;
            return wrapper.vm.$nextTick();

          case 7:
            expect(menu.isActive).toBe(false);
            expect(input).toBeCalledWith('2013-06-08');

            wrapperNoParent = mount(VDatePicker, {
              propsData: {
                value: '2013-05-07',
                autosave: true
              }
            });

            wrapperNoParent.vm.save();

          case 11:
          case 'end':
            return _context11.stop();
        }
      }
    }, _callee11, _this);
  })));

  it('should use prev and next icons', function () {
    var wrapper = mount(VDatePicker, {
      propsData: {
        prependIcon: 'block',
        appendIcon: 'check'
      }
    });

    var icons = wrapper.find('.date-picker-header .icon');
    expect(icons[0].element.textContent).toBe('block');
    expect(icons[1].element.textContent).toBe('check');
  });
});
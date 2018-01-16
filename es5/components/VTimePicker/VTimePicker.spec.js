var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import Vue from 'vue';
import { test } from '@util/testing';
import VTimePicker from '@components/VTimePicker';
import VMenu from '@components/VMenu';

function createMenuPicker(mount, props) {
  var wrapper = mount(Vue.component('test', {
    components: {
      VTimePicker: VTimePicker,
      VMenu: VMenu
    },
    render: function render(h) {
      return h('v-menu', {
        props: { value: true },
        ref: 'menu'
      }, [h('v-time-picker', {
        props: props,
        ref: 'picker'
      })]);
    }
  }));

  var menu = wrapper.vm.$refs.menu;
  var picker = menu.$slots.default[0].context.$refs.picker;

  expect('Unable to locate target [data-app]').toHaveBeenTipped();

  return { wrapper: wrapper, menu: menu, picker: picker };
}

test('VTimePicker.js', function (_ref) {
  var mount = _ref.mount;

  it('should accept a value', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:12:34'
      }
    });

    expect(wrapper.vm.selectingHour).toBe(true);
    expect(wrapper.vm.inputHour).toBe(9);
    expect(wrapper.vm.inputMinute).toBe(12);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render landscape component', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:12:34',
        landscape: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component without a title', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:12:34',
        noTitle: true
      }
    });

    expect(wrapper.find('.picker__title')).toHaveLength(0);
  });

  it('should accept a date object for a value', function () {
    var now = new Date('2017-01-01 12:00 AM');
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: now
      }
    });

    expect(wrapper.vm.inputHour).toBe(0);
    expect(wrapper.vm.inputMinute).toBe(0);
    expect(wrapper.vm.period).toBe('am');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should change am/pm when updated from model', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '9:00am'
      }
    });

    wrapper.setProps({ value: '9:00pm' });

    expect(wrapper.vm.period).toBe('pm');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should set picker to pm when given Date after noon', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: new Date('2017-01-01 12:00 PM')
      }
    });

    expect(wrapper.vm.period).toBe('pm');
  });

  it('should set picker to pm when given string with PM in it', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '1:00 PM'
      }
    });

    expect(wrapper.vm.period).toBe('pm');
  });

  it('should set picker to pm when given string with pm in it', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '1:00 pm'
      }
    });

    expect(wrapper.vm.period).toBe('pm');
  });

  it('should set picker to am when given Date before noon', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: new Date('2017-01-01 1:00 AM')
      }
    });

    expect(wrapper.vm.period).toBe('am');
  });

  it('should reset selectingHour when saved/canceled', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VTimePicker, {
              propsData: {
                value: null
              }
            });


            wrapper.vm.selectingHour = false;
            wrapper.vm.save();
            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.selectingHour).toBe(true);
            wrapper.vm.selectingHour = false;
            wrapper.vm.cancel();
            _context.next = 10;
            return wrapper.vm.$nextTick();

          case 10:
            expect(wrapper.vm.selectingHour).toBe(true);

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should render colored time picker', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:00:00',
        color: 'primary',
        headerColor: 'orange darken-1'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render colored time picker', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '09:00:00',
        color: 'orange darken-1'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should set input hour when setting hour', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '12:34'
      }
    });

    wrapper.vm.hour = 15;
    expect(wrapper.vm.inputHour).toBe(15);
  });

  it('should set input minute when setting minute', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '12:34'
      }
    });

    wrapper.vm.minute = 15;
    expect(wrapper.vm.inputMinute).toBe(15);
  });

  it('should set input hour when setting hour in 12hr mode', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '01:23pm',
        format: 'ampm'
      }
    });

    var clock = wrapper.vm.$refs.clock;

    clock.$emit('input', 7);
    expect(wrapper.vm.inputHour).toBe(19);

    wrapper.setProps({ format: '24hr' });
    clock.$emit('input', 8);
    expect(wrapper.vm.inputHour).toBe(8);

    wrapper.vm.selectingHour = false;
    clock.$emit('input', 33);
    expect(wrapper.vm.inputHour).toBe(8);
    expect(wrapper.vm.inputMinute).toBe(33);
  });

  it('should set properly input time', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        format: '24hr'
      }
    });

    expect(wrapper.vm.getInputTime('12:34am')).toEqual({ inputHour: 0, inputMinute: 34 });
    expect(wrapper.vm.getInputTime('7:34am').inputHour).toBe(7);
    expect(wrapper.vm.getInputTime('12:34pm').inputHour).toBe(12);
    expect(wrapper.vm.getInputTime('7:34pm').inputHour).toBe(19);
  });

  it('should update hour when changing period', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '15:34'
      }
    });

    wrapper.vm.period = 'am';
    expect(wrapper.vm.inputHour).toBe(3);
    wrapper.vm.period = 'pm';
    expect(wrapper.vm.inputHour).toBe(15);
  });

  it('should change selectingHour when hour is selected', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '01:23pm',
        format: 'ampm'
      }
    });

    var clock = wrapper.vm.$refs.clock;

    clock.$emit('change');
    expect(wrapper.vm.selectingHour).toBe(false);
    clock.$emit('change');
    expect(wrapper.vm.selectingHour).toBe(false);
  });

  it('should change selectingHour when clicked in title', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '01:23pm',
        format: 'ampm'
      }
    });

    var title = wrapper.vm.$refs.title;

    expect(wrapper.vm.selectingHour).toBe(true);
    title.$emit('update:selectingHour', false);
    expect(wrapper.vm.selectingHour).toBe(false);
    title.$emit('update:selectingHour', true);
    expect(wrapper.vm.selectingHour).toBe(true);
  });

  it('should change period when clicked in title', function () {
    var wrapper = mount(VTimePicker, {
      propsData: {
        value: '01:23pm',
        format: 'ampm'
      }
    });

    var title = wrapper.vm.$refs.title;

    expect(wrapper.vm.period).toBe('pm');
    title.$emit('update:period', 'am');
    expect(wrapper.vm.period).toBe('am');
    title.$emit('update:period', 'pm');
    expect(wrapper.vm.period).toBe('pm');
  });

  it('should toggle selectingHour on cancel in next tick', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VTimePicker, {
              propsData: {
                value: '20:13'
              }
            });

            wrapper.vm.selectingHour = false;
            wrapper.vm.cancel();
            expect(wrapper.vm.selectingHour).toBe(false);
            _context2.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(wrapper.vm.selectingHour).toBe(true);

          case 7:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should deactivate parent component on cancel', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var _createMenuPicker, wrapper, menu, picker;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _createMenuPicker = createMenuPicker(mount, { value: '20:13' }), wrapper = _createMenuPicker.wrapper, menu = _createMenuPicker.menu, picker = _createMenuPicker.picker;


            picker.selectingHour = false;

            picker.$refs.clock.$emit('input', 17);
            picker.$refs.clock.$emit('change');
            _context3.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(menu.isActive).toBe(true);
            expect(picker.selectingHour).toBe(false);

            picker.cancel();
            _context3.next = 11;
            return wrapper.vm.$nextTick();

          case 11:
            expect(picker.inputHour).toBe(20);
            expect(picker.inputMinute).toBe(13);
            expect(picker.selectingHour).toBe(true);

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should deactivate parent component on cancel (no value provided)', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var _createMenuPicker2, wrapper, menu, picker;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _createMenuPicker2 = createMenuPicker(mount, {}), wrapper = _createMenuPicker2.wrapper, menu = _createMenuPicker2.menu, picker = _createMenuPicker2.picker;


            picker.selectingHour = false;
            picker.$refs.clock.$emit('input', 17);
            picker.$refs.clock.$emit('change');
            _context4.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(menu.isActive).toBe(true);
            expect(picker.selectingHour).toBe(false);

            picker.cancel();
            _context4.next = 11;
            return wrapper.vm.$nextTick();

          case 11:
            expect(picker.inputHour).toBe(undefined);
            expect(picker.inputMinute).toBe(undefined);
            expect(picker.selectingHour).toBe(true);

          case 14:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should update with autosave on minute click', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var _createMenuPicker3, wrapper, menu, picker;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _createMenuPicker3 = createMenuPicker(mount, {
              value: '20:13',
              autosave: true
            }), wrapper = _createMenuPicker3.wrapper, menu = _createMenuPicker3.menu, picker = _createMenuPicker3.picker;


            picker.selectingHour = false;
            picker.$refs.clock.$emit('input', 23);
            expect(picker.originalMinute).toBe(13);
            picker.$refs.clock.$emit('change');
            expect(menu.isActive).toBe(false);
            expect(picker.originalMinute).toBe(23);

          case 7:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should update selectingHour in next tick on minute click (autosave)', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            wrapper = mount(VTimePicker, {
              propsData: {
                value: '20:13',
                autosave: true
              }
            });


            wrapper.vm.selectingHour = false;
            wrapper.vm.$refs.clock.$emit('change');
            expect(wrapper.vm.selectingHour).toBe(false);
            _context6.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(wrapper.vm.selectingHour).toBe(true);

          case 7:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));

  it('should match snapshot with slot', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var vm, slot, component, wrapper;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            vm = new Vue();

            slot = function slot(props) {
              return vm.$createElement('div', { class: 'scoped-slot' });
            };

            component = Vue.component('test', {
              components: {
                VTimePicker: VTimePicker
              },
              render: function render(h) {
                return h('v-time-picker', {
                  props: {
                    value: '10:12'
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
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  })));
});
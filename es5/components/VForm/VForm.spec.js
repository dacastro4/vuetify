var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import Vue from 'vue';
import { test } from '@util/testing';
import VTextField from '@components/VTextField';
import VBtn from '@components/VBtn';
import VForm from './VForm';

var inputOne = Vue.component('input-one', {
  render: function render(h) {
    return h(VTextField, {
      propsData: [function (v) {
        return !!v || 'Required';
      }]
    });
  }
});

test('VForm.js', function (_ref) {
  var mount = _ref.mount;

  it('should pass on listeners to form element', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var submit, component, wrapper, btn;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            submit = jest.fn();
            component = Vue.component('test', {
              render: function render(h) {
                return h(VForm, {
                  on: {
                    submit: submit
                  }
                }, [h(VBtn, {
                  props: {
                    type: 'submit'
                  },
                  slot: 'default'
                }, ['Submit'])]);
              }
            });
            wrapper = mount(component);
            btn = wrapper.find('button')[0];


            btn.trigger('click');

            expect(submit).toBeCalled();

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should watch the error bag', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VForm);
            input = jest.fn();

            wrapper.vm.$on('input', input);

            Vue.set(wrapper.vm.errorBag, 'foo', true);
            _context2.next = 6;
            return Vue.nextTick();

          case 6:
            expect(input).toBeCalledWith(false);

            Vue.set(wrapper.vm.errorBag, 'foo', false);
            _context2.next = 10;
            return Vue.nextTick();

          case 10:
            expect(input).toBeCalledWith(true);

          case 11:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should register input child', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(VForm, {
              slots: {
                default: [VTextField]
              }
            });


            expect(wrapper.vm.inputs.length).toBe(1);
            wrapper.vm.watchInputs();
            _context3.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.inputs.length).toBe(1);

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should only watch children if not lazy', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(VForm, {
              propsData: {
                lazyValidation: true
              },
              slots: {
                default: [VTextField]
              }
            });
            input = wrapper.vm.getInputs()[0];

            wrapper.vm.watchChild(input);
            input.shouldValidate = true;
            wrapper.vm.watchChild(input);
            _context4.next = 7;
            return wrapper.vm.$nextTick();

          case 7:

            expect(input._watchers.length).toBe(26);
            input.shouldValidate = false;
            wrapper.vm.watchChild(input);
            _context4.next = 12;
            return wrapper.vm.$nextTick();

          case 12:

            expect(input._watchers.length).toBe(27);
            input.shouldValidate = true;
            _context4.next = 16;
            return wrapper.vm.$nextTick();

          case 16:

            expect(Object.keys(wrapper.vm.errorBag).length).toBe(1);

          case 17:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should validate all inputs', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            wrapper = mount(VForm, {
              slots: {
                default: [{
                  render: function render(h) {
                    return h(VTextField, {
                      props: {
                        rules: [function (v) {
                          return v === 1 || 'Error';
                        }]
                      }
                    });
                  }
                }]
              }
            });


            expect(wrapper.vm.validate()).toBe(false);

          case 2:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should reset all inputs', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var wrapper, event, input;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            wrapper = mount(VForm, {
              slots: {
                default: [VTextField]
              }
            });
            event = jest.fn();
            input = wrapper.find(VTextField)[0];

            input.vm.$on('input', event);

            expect(Object.keys(wrapper.vm.errorBag).length).toBe(1);
            wrapper.vm.reset();

            expect(Object.keys(wrapper.vm.errorBag).length).toBe(1);
            expect(event).toHaveBeenCalledWith(null);

            wrapper.setProps({ lazyValidation: true });
            expect(Object.keys(wrapper.vm.errorBag).length).toBe(1);

            wrapper.vm.reset();
            expect(Object.keys(wrapper.vm.errorBag).length).toBe(0);

          case 12:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));

  it('should update inputs when updated lifecycle hook is called', _asyncToGenerator(regeneratorRuntime.mark(function _callee7() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            wrapper = mount(VForm, {
              slots: {
                default: [VTextField]
              }
            });
            input = wrapper.find(VTextField)[0];

            expect(wrapper.vm.inputs.length).toBe(1);
            input.vm.$destroy();
            wrapper.update();
            _context7.next = 7;
            return wrapper.vm.$nextTick();

          case 7:
            expect(wrapper.vm.inputs.length).toBe(0);

          case 8:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, _this);
  })));
});
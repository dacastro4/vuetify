var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import Vue from 'vue';
import { test } from '@util/testing';
import Applicationable from '@mixins/applicationable';

test('applicationable.js', function (_ref) {
  var mount = _ref.mount;

  it('should update application on mount', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var updateApplication, wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            updateApplication = jest.fn();
            wrapper = mount({
              mixins: [Applicationable()],
              methods: { updateApplication: updateApplication },
              render: function render(h) {
                return h('div');
              }
            });


            wrapper.setProps({ app: true });
            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(updateApplication.mock.calls).toHaveLength(1);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should update application on app prop change', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var updateApplication, removeApplication, wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            updateApplication = jest.fn();
            removeApplication = jest.fn();
            wrapper = mount({
              mixins: [Applicationable()],
              methods: { updateApplication: updateApplication, removeApplication: removeApplication },
              render: function render(h) {
                return h('div');
              }
            });


            wrapper.setProps({ app: true });
            _context2.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            wrapper.setProps({ app: false });
            _context2.next = 9;
            return wrapper.vm.$nextTick();

          case 9:
            wrapper.setProps({ app: true });
            _context2.next = 12;
            return wrapper.vm.$nextTick();

          case 12:
            expect(updateApplication.mock.calls).toHaveLength(2);
            expect(removeApplication.mock.calls).toHaveLength(1);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should bind watchers passed through factory', function () {
    var wrapper = mount({
      data: function data() {
        return {
          foo: 1,
          bar: 2
        };
      },
      mixins: [Applicationable(null, ['foo', 'bar'])],
      render: function render(h) {
        return h('div');
      }
    });

    expect(wrapper.vm._watchers.length).toBe(5);
  });

  it('should call to remove application on destroy', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var removeApplication, wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            removeApplication = jest.fn();
            wrapper = mount({
              mixins: [Applicationable()],
              methods: { removeApplication: removeApplication },
              render: function render(h) {
                return h('div');
              }
            });


            wrapper.setProps({ app: true });
            wrapper.destroy();
            _context3.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(removeApplication.mock.calls).toHaveLength(1);

          case 7:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should update application with dynamic property', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount({
              mixins: [Applicationable()],
              computed: {
                applicationProperty: function applicationProperty() {
                  return 'top';
                }
              },
              methods: {
                updateApplication: function updateApplication() {
                  return 30;
                }
              },
              render: function render(h) {
                return h('div');
              }
            });


            wrapper.setProps({ app: true });
            _context4.next = 4;
            return wrapper.vm.$nextTick();

          case 4:
            expect(wrapper.vm.$vuetify.application.top).toBe(30);

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should remove designated value from application', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            wrapper = mount({
              mixins: [Applicationable('footer')],
              methods: {
                updateApplication: function updateApplication() {
                  return 30;
                }
              },
              render: function render(h) {
                return h('div');
              }
            });


            wrapper.setProps({ app: true });
            _context5.next = 4;
            return wrapper.vm.$nextTick();

          case 4:
            expect(wrapper.vm.$vuetify.application.footer).toBe(30);
            wrapper.vm.removeApplication();
            _context5.next = 8;
            return wrapper.vm.$nextTick();

          case 8:
            expect(wrapper.vm.$vuetify.application.footer).toBe(0);

          case 9:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));
});
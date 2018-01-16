var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import Vue from 'vue';
import { test } from '@util/testing';
import Bootable from '@mixins/bootable';

test('bootable.js', function (_ref) {
  var mount = _ref.mount;

  it('should be booted after activation', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount({
              data: function data() {
                return {
                  isActive: false
                };
              },
              mixins: [Bootable],
              render: function render(h) {
                return h('div');
              }
            });


            expect(wrapper.vm.isBooted).toBe(false);
            wrapper.vm.isActive = true;
            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.isBooted).toBe(true);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should be return lazy content', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper, wrapperLazy;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount({
              mixins: [Bootable],
              render: function render(h) {
                return h('div');
              }
            });


            expect(wrapper.vm.showLazyContent('content')).toBe('content');

            wrapperLazy = mount({
              data: function data() {
                return {
                  isActive: false
                };
              },
              mixins: [Bootable],
              render: function render(h) {
                return h('div');
              }
            }, {
              propsData: {
                lazy: true
              }
            });


            expect(wrapperLazy.vm.showLazyContent('content')).toBe(null);
            wrapperLazy.vm.isActive = true;
            _context2.next = 7;
            return wrapper.vm.$nextTick();

          case 7:
            expect(wrapperLazy.vm.showLazyContent('content')).toBe('content');
            wrapperLazy.vm.isActive = false;
            _context2.next = 11;
            return wrapper.vm.$nextTick();

          case 11:
            expect(wrapperLazy.vm.showLazyContent('content')).toBe('content');

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));
});
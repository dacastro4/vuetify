var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '@/util/testing';
import VStepperContent from './VStepperContent';

test('VStepperContent.js', function (_ref) {
  var mount = _ref.mount;

  it('should set height to auto', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VStepperContent, {
              attachToDocument: true,
              propsData: { step: 0 }
            });


            expect(wrapper.vm.isActive).toBe(null);
            expect(wrapper.vm.height).toBe(0);

            wrapper.setData({ isActive: true });
            _context.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(wrapper.vm.isActive).toBe(true);
            expect(wrapper.vm.height).toBe('auto');

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));
});
var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '@util/testing';
import Menuable from '@mixins/menuable';
import VBtn from '@components/VBtn';

test('menuable.js', function (_ref) {
  var mount = _ref.mount;

  it('should bind custom activator', function () {
    var wrapper = mount({
      mixins: [Menuable],
      render: function render(h) {
        return h('div');
      }
    }, {
      attachToDocument: true,
      propsData: {
        activator: 'body'
      }
    });

    expect(wrapper.vm.getActivator()).toBeTruthy();
  });

  it('should update dimensions when activated', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var sneakPeek, wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sneakPeek = jest.fn();
            wrapper = mount({
              mixins: [Menuable],
              methods: {
                sneakPeek: sneakPeek
              },
              render: function render(h) {
                return h('div');
              }
            });


            wrapper.vm.updateDimensions();
            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(sneakPeek).toHaveBeenCalled();

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));
});
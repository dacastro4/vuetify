var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import Vue from 'vue';
import { test } from '@util/testing';
import Routable from '@mixins/routable';

test('routable.js', function (_ref) {
  var mount = _ref.mount;

  it('should generate exact route link with to="/" and undefined exact', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount({
              mixins: [Routable],
              render: function render(h) {
                return h('div');
              }
            }, {
              propsData: {
                to: '/'
              }
            });


            expect(wrapper.vm.generateRouteLink().data.props.exact).toBe(true);

          case 2:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));
});
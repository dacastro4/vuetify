var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '@util/testing';
import VSystemBar from '@components/VSystemBar';

test('VSystemBar.vue', function (_ref) {
  var mount = _ref.mount;

  it('should render a colored system bar', function () {
    var wrapper = mount(VSystemBar, {
      propsData: {
        color: 'blue lighten-1'
      }
    });

    expect(wrapper.element.classList).toContain('blue');
    expect(wrapper.element.classList).toContain('lighten-1');
  });

  it('should render system bar with fixed prop', function () {
    var wrapper = mount(VSystemBar, {
      propsData: {
        fixed: true
      }
    });

    expect(wrapper.element.classList).toContain('system-bar--fixed');
  });

  it('should render system bar with absolute prop', function () {
    var wrapper = mount(VSystemBar, {
      propsData: {
        absolute: true
      }
    });

    expect(wrapper.element.classList).toContain('system-bar--absolute');
  });

  it('should update height when window prop change', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VSystemBar, {
              propsData: {
                app: true
              }
            });


            expect(wrapper.vm.$vuetify.application.bar).toBe(24);

            wrapper.setProps({
              window: true
            });
            expect(wrapper.vm.$vuetify.application.bar).toBe(32);

            wrapper.setProps({
              height: 90
            });
            expect(wrapper.vm.$vuetify.application.bar).toBe(90);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should warn for improper height', function () {
    var wrapper = mount(VSystemBar, {
      propsData: {
        height: 'foo'
      }
    });

    expect('custom validator check failed for prop "height"').toHaveBeenWarned();
  });
});
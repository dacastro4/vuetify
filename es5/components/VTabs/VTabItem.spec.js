var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '@util/testing';
import VTabs from './VTabs';
import VTabItem from './VTabItem';

var contentWarning = '[Vuetify] The v-tab-item component must be used inside a v-tabs-items';

test('VTabItem', function (_ref) {
  var mount = _ref.mount;

  it('should unregister on destroy', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var register, unregister, wrapper, content;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            register = jest.fn();
            unregister = jest.fn();
            wrapper = mount({
              provide: function provide() {
                return {
                  tabs: {
                    register: register,
                    unregister: unregister
                  }
                };
              },
              render: function render(h) {
                return h('div', [h(VTabItem, {
                  props: { id: 'foo' }
                })]);
              }
            });
            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(register).toHaveBeenCalled();

            content = wrapper.find(VTabItem)[0];

            content.destroy();
            _context.next = 10;
            return wrapper.vm.$nextTick();

          case 10:
            expect(unregister).toHaveBeenCalled();

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should not wrap component in transition if false is used', function () {
    var wrapper = mount(VTabItem, {
      propsData: {
        id: 'foo',
        transition: false,
        reverseTransition: false
      }
    });

    expect(wrapper.vm.computedTransition).toBe(false);
    expect(contentWarning).toHaveBeenTipped();
  });

  it('should set transition to none of no transition', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VTabItem, {
              propsData: { id: 'foo' }
            });


            wrapper.vm.toggle('foo', false, false);
            expect(wrapper.vm.$el.style.transition).toBe('none');
            wrapper.vm.toggle('foo', false, true);
            expect(wrapper.vm.$el.style.transition).toBe(null);
            expect(contentWarning).toHaveBeenTipped();

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should return reverse transition', function () {
    var wrapper = mount(VTabItem, {
      propsData: { id: 'foo' }
    });

    wrapper.setData({ reverse: true });
    expect(wrapper.vm.computedTransition).toBe('tab-reverse-transition');
    expect(contentWarning).toHaveBeenTipped();
  });
});
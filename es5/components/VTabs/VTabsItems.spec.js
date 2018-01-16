var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test, touch } from '@/util/testing';
import { createRange } from '@/util/helpers';
import VTabItem from './VTabItem';
import VTabsItems from './VTabsItems';

test('VTabsItems', function (_ref) {
  var mount = _ref.mount,
      shallow = _ref.shallow;

  it('should have no active item with no children', function () {
    var wrapper = mount(VTabsItems);

    expect(wrapper.vm.activeItem).toBe(undefined);
  });

  it('should return currently active item', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = shallow(VTabsItems, {
              propsData: {
                value: 'foo'
              },
              slots: {
                default: [{
                  render: function render(h) {
                    return h(VTabItem, {
                      props: { id: 'foo' }
                    });
                  }
                }]
              }
            });


            expect(wrapper.vm.activeIndex).toBe(0);
            expect(wrapper.vm.activeItem).toBeTruthy();

          case 3:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should return lazy value', function () {
    var wrapper = mount(VTabsItems);

    expect(wrapper.vm.inputValue).toBe(undefined);
    wrapper.setProps({ value: 'foo' });
    expect(wrapper.vm.inputValue).toBe('foo');
    expect(wrapper.vm.lazyValue).toBe('foo');
  });

  it('should emit input value when registerItems is not provided', function () {
    var wrapper = mount(VTabsItems);
    var input = jest.fn();
    wrapper.vm.$on('input', input);

    wrapper.vm.inputValue = 'foo';
    expect(input).toHaveBeenCalled();
  });

  it('should react to touch', function () {
    var wrapper = mount(VTabsItems, {
      propsData: { value: '1' },
      slots: {
        default: createRange(5).map(function (x) {
          return {
            render: function render(h) {
              return h(VTabItem, {
                props: { id: x.toString() }
              });
            }
          };
        })
      }
    });

    expect(wrapper.vm.inputValue).toBe('1');
    touch(wrapper).start(0, 0).end(200, 0);
    expect(wrapper.vm.inputValue).toBe('0');
    // Without cycle, should stay on this index
    touch(wrapper).start(0, 0).end(200, 0);
    expect(wrapper.vm.inputValue).toBe('0');

    touch(wrapper).start(200, 0).end(0, 0);
    expect(wrapper.vm.inputValue).toBe('1');

    wrapper.setProps({ value: '4' });
    touch(wrapper).start(200, 0).end(0, 0);
    expect(wrapper.vm.inputValue).toBe('4');

    wrapper.setProps({ cycle: true });
    wrapper.setProps({ value: '4' });
    touch(wrapper).start(200, 0).end(0, 0);
    expect(wrapper.vm.inputValue).toBe('0');

    wrapper.setProps({ value: '0' });
    touch(wrapper).start(0, 0).end(200, 0);
    expect(wrapper.vm.inputValue).toBe('4');
  });
});
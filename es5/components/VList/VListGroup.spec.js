var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { VList, VListGroup } from '@components/VList';
import { test } from '@util/testing';

var warning = '[Vuetify] The v-list-group component must be used inside a v-list';

// TODO: Test actual behaviour instead of classes
test('VListGroup.js', function (_ref) {
  var mount = _ref.mount;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VList, {
      slots: {
        default: [VListGroup]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a lazy component and match snapshot', function () {
    var wrapper = mount(VList, {
      propsData: {
        lazy: true
      },
      slots: {
        default: [VListGroup]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a component with no padding for action icon and match snapshot', function () {
    var wrapper = mount(VList, {
      propsData: {
        noAction: true
      },
      slots: {
        default: [VListGroup]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a component with route namespace and match snapshot', function () {
    var $route = { path: '' };
    var wrapper = mount(VList, {
      propsData: {
        group: 'listGroup'
      },
      slots: {
        default: [VListGroup]
      },
      globals: {
        $route: $route
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should toggle based upon matching uid', function () {
    var listClick = jest.fn();
    var wrapper = mount(VListGroup, {
      provide: {
        listClick: listClick,
        list: {
          register: function register() {},
          unregister: function unregister() {}
        }
      }
    });

    expect(wrapper.vm.isActive).toBe(false);
    wrapper.vm.toggle(wrapper.vm._uid);
    expect(wrapper.vm.isActive).toBe(true);
    wrapper.vm.toggle(null);
    expect(wrapper.vm.isActive).toBe(false);
  });

  it('should accept a custom active class', function () {
    var wrapper = mount(VListGroup, {
      attachToDocument: true,
      propsData: {
        activeClass: 'foo',
        value: true
      }
    });

    var header = wrapper.find('.list__group__header__prepend-icon')[0];

    expect(header.hasClass('foo')).toBe(true);
    wrapper.setProps({ activeClass: 'bar' });
    expect(header.hasClass('bar')).toBe(true);

    expect('Injection "listClick" not found').toHaveBeenWarned();
    expect(warning).toHaveBeenTipped();
  });

  it('should open if no value provided and group matches route', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var $route, listClick, wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            $route = { path: '/foo' };
            listClick = jest.fn();
            wrapper = mount(VListGroup, {
              attachToDocument: true,
              propsData: {
                group: 'foo'
              },
              provide: {
                listClick: listClick
              },
              globals: {
                $route: $route
              }
            });
            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(listClick).toBeCalledWith(wrapper.vm._uid);

            expect(warning).toHaveBeenTipped();

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should toggle when clicked', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper, input;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VListGroup, {
              attachToDocument: true,
              provide: {
                listClick: function listClick() {}
              }
            });
            input = jest.fn();

            wrapper.vm.$on('input', input);
            wrapper.vm.click();
            _context2.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(input).toBeCalledWith(true);

            expect(warning).toHaveBeenTipped();

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should unregister when destroyed', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var unregister, wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            unregister = jest.fn();
            wrapper = mount(VListGroup, {
              attachToDocument: true,
              provide: {
                listClick: function listClick() {},
                list: {
                  register: function register() {},
                  unregister: unregister
                }
              }
            });


            wrapper.destroy();
            _context3.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(unregister).toBeCalledWith(wrapper.vm._uid);

          case 6:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));

  it('should render a custom append icon', _asyncToGenerator(regeneratorRuntime.mark(function _callee4() {
    var wrapper, icon;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            wrapper = mount(VListGroup, {
              slots: {
                appendIcon: {
                  render: function render(h) {
                    return h('span', 'bar');
                  }
                }
              }
            });
            icon = wrapper.find('span')[0];

            expect(icon.html()).toBe('<span>bar</span>');

            expect('Injection "listClick" not found').toHaveBeenWarned();
            expect(warning).toHaveBeenTipped();

          case 5:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, _this);
  })));

  it('should only render custom prepend icon', _asyncToGenerator(regeneratorRuntime.mark(function _callee5() {
    var wrapper, icon;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            wrapper = mount(VListGroup, {
              slots: {
                prependIcon: {
                  render: function render(h) {
                    return h('span', 'bar');
                  }
                }
              }
            });
            icon = wrapper.find('span')[0];

            expect(icon.html()).toBe('<span>bar</span>');

            expect('Injection "listClick" not found').toHaveBeenWarned();
            expect(warning).toHaveBeenTipped();

          case 5:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, _this);
  })));

  it('should render a default prepended icon', _asyncToGenerator(regeneratorRuntime.mark(function _callee6() {
    var wrapper, icon;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            wrapper = mount(VListGroup, {
              propsData: {
                subGroup: true
              }
            });
            icon = wrapper.find('.icon')[0];


            expect(icon.text()).toBe('arrow_drop_down');

            expect('Injection "listClick" not found').toHaveBeenWarned();
            expect(warning).toHaveBeenTipped();

          case 5:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, _this);
  })));
});
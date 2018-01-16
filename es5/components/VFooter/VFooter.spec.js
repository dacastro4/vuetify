var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '@util/testing';
import VFooter from './VFooter';

test('VFooter.js', function (_ref) {
  var mount = _ref.mount,
      functionalContext = _ref.functionalContext;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VFooter);

    expect(wrapper.element.classList).toContain('footer');
  });

  it('should render a colored footer', function () {
    var wrapper = mount(VFooter, {
      propsData: {
        color: 'blue lighten-1'
      }
    });

    expect(wrapper.element.classList).toContain('blue');
    expect(wrapper.element.classList).toContain('lighten-1');
  });

  it('should render an absolute positioned component and match snapshot', function () {
    var wrapper = mount(VFooter, {
      propsData: {
        absolute: true
      }
    });

    expect(wrapper.element.classList).toContain('footer--absolute');
  });

  it('should render a fixed positioned component and match snapshot', function () {
    var wrapper = mount(VFooter, {
      propsData: {
        fixed: true
      }
    });

    expect(wrapper.element.classList).toContain('footer--fixed');
  });

  it('should render a fixed and absolute positioned and match snapshot', function () {
    var wrapper = mount(VFooter, {
      propsData: {
        absolute: true,
        fixed: true
      }
    });

    expect(wrapper.element.classList).toContain('footer--absolute');
    wrapper.setProps({ absolute: false });
    expect(wrapper.element.classList).toContain('footer--fixed');
  });

  it('should get the right padding with app prop', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VFooter, {
              propsData: {
                absolute: true,
                app: true
              }
            });


            expect(wrapper.html()).toMatchSnapshot();

            wrapper.vm.$vuetify.application.left = 20;
            wrapper.vm.$vuetify.application.right = 30;
            _context.next = 6;
            return wrapper.vm.$nextTick();

          case 6:
            expect(wrapper.html()).toMatchSnapshot();

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should have margin bottom', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VFooter, {
              propsData: {
                app: true,
                height: 60
              }
            });


            expect(wrapper.vm.$vuetify.application.footer).toBe(60);
            wrapper.vm.$vuetify.application.bottom = 30;
            _context2.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.$vuetify.application.bottom).toBe(30);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));

  it('should have padding left when using inset', _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            wrapper = mount(VFooter, {
              propsData: {
                app: true,
                inset: true
              }
            });


            wrapper.vm.$vuetify.application.left = 300;

            _context3.next = 4;
            return wrapper.vm.$nextTick();

          case 4:
            expect(wrapper.vm.computedPaddingLeft).toBe(300);

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, _this);
  })));
});
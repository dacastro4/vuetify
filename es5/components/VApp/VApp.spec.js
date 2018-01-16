var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import VApp from '@components/VApp';
import { test } from '@util/testing';

test('VApp.js', function (_ref) {
  var mount = _ref.mount;

  it('should match a snapshot', function () {
    var wrapper = mount(VApp);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have data-app attribute', function () {
    var wrapper = mount(VApp);
    var app = wrapper.find('.application')[0];

    expect(app.getAttribute('data-app')).toBe('true');
  });

  it('should allow a custom id', function () {
    var wrapper = mount(VApp, {
      propsData: {
        id: 'inspire'
      }
    });
    var app = wrapper.find('.application')[0];

    expect(app.getAttribute('id')).toBe('inspire');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should watch dark prop', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VApp, {
              propsData: {
                dark: true
              }
            });


            expect(wrapper.vm.$vuetify.dark).toBe(true);
            wrapper.setProps({
              dark: false
            });
            expect(wrapper.vm.$vuetify.dark).toBe(false);

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should watch theme', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VApp);


            expect(wrapper.vm.style).toMatchSnapshot();
            wrapper.vm.$vuetify.theme.primary = '#000';
            _context2.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.vm.style).toMatchSnapshot();

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));
});
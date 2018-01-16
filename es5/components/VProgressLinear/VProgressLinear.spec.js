var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '@util/testing';
import VProgressLinear from './VProgressLinear';

test('VProgressLinear.js', function (_ref) {
  var mount = _ref.mount;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        value: 33
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render inactive component and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        value: 33,
        active: false
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with color and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        value: 33,
        color: 'orange'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with color and background opacity and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        value: 33,
        color: 'orange',
        backgroundOpacity: 0.5
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with color and background color and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        value: 33,
        color: 'orange',
        backgroundColor: 'blue'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with color and background color and opacity and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        value: 33,
        color: 'orange',
        backgroundColor: 'blue',
        backgroundOpacity: 0.5
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render indeterminate progress and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        indeterminate: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render indeterminate progress with query prop and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        indeterminate: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with buffer value and match snapshot', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VProgressLinear, {
              propsData: {
                value: 33,
                bufferValue: 80
              }
            });


            expect(wrapper.html()).toMatchSnapshot();

            wrapper.setProps({
              bufferValue: 0
            });
            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.html()).toMatchSnapshot();

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should render component with buffer value and value > buffer value and match snapshot', function () {
    var wrapper = mount(VProgressLinear, {
      propsData: {
        value: 90,
        bufferValue: 80
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
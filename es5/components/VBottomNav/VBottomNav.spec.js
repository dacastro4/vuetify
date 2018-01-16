var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import VBottomNav from './VBottomNav';
import VBtn from '../VBtn';
import { test } from '@util/testing';
import Vue from 'vue';

function createBtn() {
  var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

  var options = {
    props: { flat: true }
  };
  if (val) options.attrs = { value: val };

  return Vue.component('test', {
    components: {
      VBtn: VBtn
    },
    render: function render(h) {
      return h('v-btn', options);
    }
  });
}

test('VBottomNav.js', function (_ref) {
  var mount = _ref.mount;

  it('should have a bottom-nav class', function () {
    var wrapper = mount(VBottomNav, {
      slots: {
        default: [VBtn, VBtn]
      }
    });

    expect(wrapper.hasClass('bottom-nav')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have prop classes', function () {
    var wrapper = mount(VBottomNav, {
      propsData: {
        absolute: true,
        shift: true
      },
      slots: {
        default: [VBtn, VBtn]
      }
    });

    expect(wrapper.hasClass('bottom-nav--absolute')).toBe(true);
    expect(wrapper.hasClass('bottom-nav--shift')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should be hidden with a false value', function () {
    var wrapper = mount(VBottomNav, {
      propsData: { value: false },
      slots: {
        default: [VBtn, VBtn]
      }
    });

    expect(wrapper.hasClass('bottom-nav--active')).toBe(false);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should be visible with a true value', function () {
    var wrapper = mount(VBottomNav, {
      propsData: { value: true },
      slots: {
        default: [VBtn, VBtn]
      }
    });

    expect(wrapper.hasClass('bottom-nav--active')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should output active btn when clicked', function () {
    var wrapper = mount(VBottomNav, {
      propsData: { value: true, active: 1 },
      slots: {
        default: [createBtn(), createBtn()]
      }
    });

    var btn = wrapper.find('.btn')[0];

    var change = jest.fn();
    wrapper.instance().$on('update:active', change);

    btn.trigger('click');
    expect(change).toBeCalledWith(0);
  });

  it('should set the application bottom', function () {
    var wrapper = mount(VBottomNav, {
      propsData: {
        app: true,
        height: 80,
        value: true
      },
      slots: {
        default: [VBtn, VBtn]
      }
    });

    expect(wrapper.vm.$vuetify.application.bottom).toBe(80);
  });

  it('should emit update when active changes', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var update, wrapper, btn;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            update = jest.fn();
            wrapper = mount(VBottomNav, {
              slots: {
                default: [VBtn, VBtn]
              }
            });


            wrapper.vm.$on('update:active', update);

            btn = wrapper.find('.btn')[1];

            btn.trigger('click');

            _context.next = 7;
            return wrapper.vm.$nextTick();

          case 7:
            expect(update).toBeCalledWith(1);

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));
});
var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import VBtnToggle from './VBtnToggle';
import VBtn from '../VBtn';
import VIcon from '../VIcon';
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
      VBtn: VBtn,
      VIcon: VIcon
    },
    render: function render(h) {
      return h('v-btn', options, [h('v-icon', 'add')]);
    }
  });
}

function createFakeBtn() {
  return Vue.component('v-btn', {
    inject: ['buttonGroup'],
    methods: {
      testUnregister: function testUnregister() {
        this.buttonGroup.unregister(this);
      }
    },
    mounted: function mounted() {
      this.buttonGroup.register(this);
    },
    render: function render(h) {
      return h('div');
    }
  });
}

test('VBtnToggle.vue', function (_ref) {
  var mount = _ref.mount;

  it('should not allow empty value when mandatory prop is used', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 0,
        mandatory: true
      },
      slots: {
        default: [createBtn(), createBtn(), createBtn()]
      }
    });

    var change = jest.fn();
    wrapper.instance().$on('change', change);

    wrapper.instance().updateValue(0);

    expect(change).not.toBeCalled();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should allow new value when mandatory prop is used', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 1,
        mandatory: true
      },
      slots: {
        default: [createBtn(), createBtn(), createBtn()]
      }
    });

    var change = jest.fn();
    wrapper.instance().$on('change', change);

    wrapper.instance().updateValue(0);

    expect(change).toBeCalledWith(0);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should not allow empty value when mandatory prop is used with multiple prop', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: [1],
        mandatory: true,
        multiple: true
      },
      slots: {
        default: [createBtn(), createBtn(), createBtn()]
      }
    });

    var change = jest.fn();
    wrapper.instance().$on('change', change);

    wrapper.instance().updateValue(1);

    expect(change).not.toBeCalled();
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should allow new value when mandatory prop is used with multiple prop', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: [1],
        mandatory: true,
        multiple: true
      },
      slots: {
        default: [createBtn(), createBtn(), createBtn()]
      }
    });

    var change = jest.fn();
    wrapper.instance().$on('change', change);

    wrapper.instance().updateValue(2);

    expect(change).toBeCalledWith([1, 2]);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should use button value attribute if available', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 'center'
      },
      slots: {
        default: [createBtn('left'), createBtn('center'), createBtn('right')]
      }
    });

    var change = jest.fn();
    wrapper.instance().$on('change', change);

    wrapper.instance().updateValue(2);

    expect(change).toBeCalledWith('right');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should allow deselecting a value when mandatory prop is used with multiple prop', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: [1, 2],
        mandatory: true,
        multiple: true
      },
      slots: {
        default: [createBtn(), createBtn(), createBtn()]
      }
    });

    var change = jest.fn();
    wrapper.instance().$on('change', change);

    wrapper.instance().updateValue(2);

    expect(change).toBeCalledWith([1]);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should preserve mandatory invariant when selected child is unregistered', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 1,
        mandatory: true
      },
      slots: {
        default: [createBtn(), createFakeBtn()]
      }
    });

    var change = jest.fn();
    wrapper.instance().$on('change', change);

    wrapper.vm.$children[1].testUnregister();
    wrapper.update();

    expect(change).toBeCalledWith(0);
  });

  it('should not set new value when not mandatory and selected child is unregistered', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 1
      },
      slots: {
        default: [createBtn(), createFakeBtn()]
      }
    });

    var change = jest.fn();
    wrapper.instance().$on('change', change);

    wrapper.vm.$children[1].testUnregister();
    wrapper.update();

    expect(change).not.toBeCalled();
  });

  it('should have btn with data-only-child if only one selected', function () {
    var wrapper = mount(VBtnToggle, {
      propsData: {
        inputValue: 0
      },
      slots: {
        default: [createBtn(), createBtn()]
      }
    });

    var btn = wrapper.find('.btn')[0];

    expect(btn.getAttribute('data-only-child')).toBe('true');
  });

  it('should toggle values of any type', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var values, verifyValues, buttons, wrapper, change;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            values = [true, false, null, 6, 'foo', { key: 'value' }, ['arrayyy']];
            verifyValues = [true, 1, 2, 6, 'foo', { key: 'value' }, ['arrayyy']];
            buttons = values.map(function (v) {
              return createBtn(v);
            });
            wrapper = mount(VBtnToggle, {
              propsData: {
                inputValue: null
              },
              slots: { default: buttons }
            });
            change = jest.fn();

            wrapper.vm.$on('change', change);

            wrapper.find('button').forEach(function (button, i) {
              button.trigger('click');

              expect(change).toBeCalledWith(verifyValues[i]);
            });

            expect(wrapper.html()).toMatchSnapshot();

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));
});
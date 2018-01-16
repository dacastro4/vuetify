import VChip from '@components/VChip';
import { test } from '@util/testing';

test('VChip.vue', function (_ref) {
  var mount = _ref.mount,
      compileToFunctions = _ref.compileToFunctions;

  it('should have a chip class', function () {
    var wrapper = mount(VChip);

    expect(wrapper.hasClass('chip')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should be removable', function () {
    var wrapper = mount(VChip, {
      propsData: { close: true }
    });

    var close = wrapper.find('.chip__close')[0];

    var input = jest.fn(function (value) {
      return wrapper.setProps({ value: value });
    });
    wrapper.vm.$on('input', input);

    expect(wrapper.html()).toMatchSnapshot();

    close.trigger('click');
    expect(input).toBeCalledWith(false);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a colored chip', function () {
    var wrapper = mount(VChip, {
      propsData: {
        color: 'blue',
        textColor: 'green'
      }
    });

    expect(wrapper.element.classList).toContain('blue');
    expect(wrapper.element.classList).toContain('green--text');
  });

  it('should render a disabled chip', function () {
    var wrapper = mount(VChip, {
      propsData: {
        disabled: true
      }
    });

    expect(wrapper.element.classList).toContain('chip--disabled');
  });

  it('should render a colored outline chip', function () {
    var wrapper = mount(VChip, {
      propsData: {
        outline: true,
        color: 'blue'
      }
    });

    expect(wrapper.element.classList).toContain('blue');
    expect(wrapper.element.classList).toContain('blue--text');
  });

  it('should render a colored outline chip with text color', function () {
    var wrapper = mount(VChip, {
      propsData: {
        outline: true,
        color: 'blue',
        textColor: 'green'
      }
    });

    expect(wrapper.element.classList).toContain('blue');
    expect(wrapper.element.classList).toContain('green--text');
  });
});
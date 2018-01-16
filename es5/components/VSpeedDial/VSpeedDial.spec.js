import VSpeedDial from '@components/VSpeedDial';
import { test } from '@util/testing';
import { compileToFunctions } from 'vue-template-compiler';

test('VSpeedDial.js', function (_ref) {
  var mount = _ref.mount;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VSpeedDial);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render active component and match snapshot', function () {
    var wrapper = mount(VSpeedDial, {
      slots: {
        default: [compileToFunctions('<span>test</span>')]
      },
      data: {
        isActive: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with custom direction and match snapshot', function () {
    var wrapper = mount(VSpeedDial, {
      propsData: {
        direction: 'right'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should activate on click', function () {
    var wrapper = mount(VSpeedDial);

    expect(wrapper.vm.isActive).toBe(false);
    wrapper.trigger('click');
    expect(wrapper.vm.isActive).toBe(true);
  });

  it('should activate on hover', function () {
    var wrapper = mount(VSpeedDial, {
      propsData: {
        openOnHover: true
      }
    });

    expect(wrapper.vm.isActive).toBe(false);
    wrapper.trigger('mouseenter');
    expect(wrapper.vm.isActive).toBe(true);
    wrapper.trigger('mouseleave');
    expect(wrapper.vm.isActive).toBe(false);
  });
});
import { test } from '@util/testing';
import Vue from 'vue';
import VBtn from '@components/VBtn';
import VProgressCircular from '@components/VProgressCircular';

var stub = {
  name: 'router-link',
  render: function render(h) {
    return h('button');
  }
};

test('VBtn.js', function (_ref) {
  var mount = _ref.mount,
      compileToFunctions = _ref.compileToFunctions;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VBtn);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with color prop and match snapshot', function () {
    var wrapper1 = mount(VBtn, {
      propsData: {
        color: 'green darken-1'
      }
    });

    expect(wrapper1.html()).toMatchSnapshot();

    var wrapper2 = mount(VBtn, {
      propsData: {
        color: 'green darken-1',
        flat: true
      }
    });

    expect(wrapper2.html()).toMatchSnapshot();
  });

  it('should render component with loader slot and match snapshot', function () {
    var wrapper = mount(VBtn, {
      propsData: {
        loading: true
      },
      slots: {
        loader: [compileToFunctions('<span>loader</span>')]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with loader and match snapshot', function () {
    var wrapper = mount(VBtn, {
      components: {
        VProgressCircular: VProgressCircular
      },
      propsData: {
        loading: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render an <a> tag when using href prop', function () {
    var wrapper = mount(VBtn, {
      propsData: {
        href: 'http://www.google.com'
      }
    });

    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.getAttribute('href')).toBe('http://www.google.com');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render a <button> tag when using to prop', function () {
    var instance = Vue.extend();
    instance.component('router-link', stub);

    var wrapper = mount(VBtn, {
      propsData: {
        to: '/home'
      },
      instance: instance
    });

    expect(wrapper.is('button')).toBe(true);
    expect(wrapper.vm.$props.to).toBe('/home');
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render specified tag when using tag prop', function () {
    var wrapper = mount(VBtn, {
      propsData: {
        tag: 'a'
      }
    });

    expect(wrapper.is('a')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should register and unregister', function () {
    var register = jest.fn();
    var unregister = jest.fn();

    var wrapper = mount(VBtn, {
      provide: {
        buttonGroup: {
          register: register,
          unregister: unregister
        }
      }
    });

    expect(register).toHaveBeenCalled();
    wrapper.destroy();
    expect(unregister).toHaveBeenCalled();
  });
});
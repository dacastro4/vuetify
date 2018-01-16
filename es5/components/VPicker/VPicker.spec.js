import { test } from '@util/testing';
import VPicker from './VPicker';

test('VPicker.js', function (_ref) {
  var mount = _ref.mount,
      compileToFunctions = _ref.compileToFunctions;

  it('should render component without title and match snapshot', function () {
    var wrapper = mount(VPicker, {
      slots: {
        default: [compileToFunctions('<span>default</span>')]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with title and match snapshot', function () {
    var wrapper = mount(VPicker, {
      slots: {
        default: [compileToFunctions('<span>default</span>')],
        title: [compileToFunctions('<span>title</span>')]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render dark component and match snapshot', function () {
    var wrapper = mount(VPicker, {
      propsData: {
        dark: true
      },
      slots: {
        default: [compileToFunctions('<span>default</span>')],
        title: [compileToFunctions('<span>title</span>')]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render colored component', function () {
    var wrapper = mount(VPicker, {
      propsData: {
        color: 'orange lighten-1'
      },
      slots: {
        title: [compileToFunctions('<span>title</span>')]
      }
    });

    var title = wrapper.find('.picker__title')[0];
    expect(title.hasClass('orange')).toBe(true);
    expect(title.hasClass('lighten-1')).toBe(true);
  });
});
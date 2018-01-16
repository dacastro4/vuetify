import { test } from '@util/testing';
import { VCardMedia } from '@components/VCard';

test('VCardMedia.js', function (_ref) {
  var mount = _ref.mount;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VCardMedia);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with contained background and match snapshot', function () {
    var wrapper = mount(VCardMedia, {
      propsData: {
        src: 'file.jpg',
        contain: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with custom height (string) and match snapshot', function () {
    var wrapper = mount(VCardMedia, {
      propsData: {
        height: '100px'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with custom height (number) and match snapshot', function () {
    var wrapper = mount(VCardMedia, {
      propsData: {
        height: 100
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render matching components with custom height', function () {
    var wrapper1 = mount(VCardMedia, {
      propsData: {
        height: '100px'
      }
    });
    var wrapper2 = mount(VCardMedia, {
      propsData: {
        height: 100
      }
    });

    expect(wrapper1.html()).toEqual(wrapper2.html());
  });

  it('should render component with custom background image and match snapshot', function () {
    var wrapper = mount(VCardMedia, {
      propsData: {
        src: 'https://vuetifyjs.com/static/doc-images/cards/sunshine.jpg'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
import VDivider from '@components/VDivider';
import { test } from '@util/testing';

test('VDivider.js', function (_ref) {
  var mount = _ref.mount,
      compileToFunctions = _ref.compileToFunctions,
      functionalContext = _ref.functionalContext;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VDivider, functionalContext());

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render an inset component', function () {
    var wrapper = mount(VDivider, functionalContext({
      props: {
        inset: true
      }
    }));

    expect(wrapper.hasClass('divider--inset')).toBe(true);
  });

  it('should render a light component', function () {
    var wrapper = mount(VDivider, functionalContext({
      props: {
        light: true
      }
    }));

    expect(wrapper.hasClass('theme--light')).toBe(true);
  });

  it('should render a dark component', function () {
    var wrapper = mount(VDivider, functionalContext({
      props: {
        dark: true
      }
    }));

    expect(wrapper.hasClass('theme--dark')).toBe(true);
  });
});
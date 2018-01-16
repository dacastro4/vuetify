import VAvatar from '@components/VAvatar';
import { test } from '@util/testing';

test('VAvatar.vue', function (_ref) {
  var mount = _ref.mount,
      functionalContext = _ref.functionalContext;

  it('should have an avatar class', function () {
    var wrapper = mount(VAvatar, functionalContext());

    expect(wrapper.hasClass('avatar')).toBe(true);
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should have an proper class with tile prop', function () {
    var wrapper = mount(VAvatar, functionalContext({
      props: {
        tile: true
      }
    }));

    expect(wrapper.hasClass('avatar--tile')).toBe(true);
  });

  it('should accept custom or no class declarations', function () {
    var wrapper = mount(VAvatar, functionalContext());
    var wrapperTwo = mount(VAvatar, functionalContext({
      class: 'active'
    }));
    var wrapperThree = mount(VAvatar, functionalContext({
      class: ['active']
    }));
    var wrapperFour = mount(VAvatar, functionalContext({
      class: { 'active': true }
    }));

    expect(wrapper.hasClass('active')).toBe(false);
    expect(wrapperTwo.hasClass('active')).toBe(true);
    expect(wrapperThree.hasClass('active')).toBe(true);
    expect(wrapperFour.hasClass('active')).toBe(true);
  });
});
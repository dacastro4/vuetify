import { VListTileAvatar } from '@components/VList';
import { test } from '@util/testing';

test('VListTileAvatar.js', function (_ref) {
  var mount = _ref.mount,
      functionalContext = _ref.functionalContext;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VListTileAvatar, functionalContext());

    expect(wrapper.html()).toMatchSnapshot();
  });
});
import { test } from '@util/testing';
import VFlex from '@components/VGrid/VFlex';

test('VFlex', function (_ref) {
  var mount = _ref.mount,
      functionalContext = _ref.functionalContext;

  it('should conditionally apply if boolean is used', function () {
    var wrapper = mount(VFlex, functionalContext({
      attrs: {
        foo: '',
        bar: false
      }
    }));

    expect(wrapper.hasAttribute('foo')).toBe(false);
    expect(wrapper.hasAttribute('bar')).toBe(false);
    expect(wrapper.hasClass('foo')).toBe(true);
    expect(wrapper.hasClass('bar')).toBe(false);
  });

  it('should pass the id attr', function () {
    var wrapper = mount(VFlex, functionalContext({
      attrs: {
        id: 'test'
      }
    }));

    expect(wrapper.find('#test')).toHaveLength(1);
  });
});
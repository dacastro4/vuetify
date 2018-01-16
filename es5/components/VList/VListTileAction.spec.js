import Vue from 'vue';
import { VListTileAction } from '@components/VList';
import { test } from '@util/testing';

test('VListTileAction.js', function (_ref) {
  var mount = _ref.mount,
      functionalContext = _ref.functionalContext;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VListTileAction, functionalContext());

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with static class and match snapshot', function () {
    var wrapper = mount(VListTileAction, functionalContext({
      staticClass: 'static-class'
    }));

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with many children and match snapshot', function () {
    var content1 = mount(Vue.component('content1', {
      render: function render(h) {
        return h('div');
      }
    })).vNode;
    var content2 = mount(Vue.component('content2', {
      render: function render(h) {
        return h('span');
      }
    })).vNode;
    var wrapper = mount(VListTileAction, functionalContext({}, [content1, content2]));

    expect(wrapper.html()).toMatchSnapshot();
  });
});
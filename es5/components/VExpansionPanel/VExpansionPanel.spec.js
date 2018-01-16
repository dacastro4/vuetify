var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import Vue from 'vue';
import { test } from '@util/testing';
import VExpansionPanel from '@components/VExpansionPanel';
import { VExpansionPanelContent } from '@components/VExpansionPanel';

var createPanel = function createPanel(props) {
  return Vue.component('test', {
    components: { VExpansionPanel: VExpansionPanel, VExpansionPanelContent: VExpansionPanelContent },
    render: function render(h) {
      var panelContent = h('v-expansion-panel-content', [h('div', { slot: 'header' }, 'header'), 'content']);
      return h('v-expansion-panel', { props: props }, [panelContent]);
    }
  });
};

test('VExpansionPanel.js', function (_ref) {
  var mount = _ref.mount,
      compileToFunctions = _ref.compileToFunctions;

  it('should render component and match snapshot', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(createPanel());


            expect(wrapper.html()).toMatchSnapshot();

            wrapper.find('.expansion-panel__header')[0].trigger('click');
            _context.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.html()).toMatchSnapshot();

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should render inset component', function () {
    var wrapper = mount(createPanel({
      inset: true
    }));

    expect(wrapper.hasClass('expansion-panel--inset')).toBe(true);
  });

  it('should render popout component', function () {
    var wrapper = mount(createPanel({
      popout: true
    }));

    expect(wrapper.hasClass('expansion-panel--popout')).toBe(true);
  });

  it('should render an expanded component and match snapshot', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(createPanel({
              expand: true
            }));


            expect(wrapper.html()).toMatchSnapshot();

            wrapper.find('.expansion-panel__header')[0].trigger('click');
            _context2.next = 5;
            return wrapper.vm.$nextTick();

          case 5:
            expect(wrapper.html()).toMatchSnapshot();

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));
});
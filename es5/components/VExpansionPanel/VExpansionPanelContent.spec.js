var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { test } from '@util/testing';
import VExpansionPanelContent from './VExpansionPanelContent';

test('VExpansionPanelContent.js', function (_ref) {
  var mount = _ref.mount,
      compileToFunctions = _ref.compileToFunctions;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VExpansionPanelContent, {
      slots: {
        actions: [compileToFunctions('<span>actions</span>')],
        default: [compileToFunctions('<span>default</span>')],
        header: [compileToFunctions('<span>header</span>')]
      },
      provide: {
        focusable: true,
        panelClick: jest.fn()
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should respect hideActions prop', function () {
    var wrapper = mount(VExpansionPanelContent, {
      propsData: {
        hideActions: true
      },
      slots: {
        actions: [compileToFunctions('<span>actions</span>')],
        header: [compileToFunctions('<span>header</span>')]
      },
      provide: {
        focusable: true,
        panelClick: jest.fn()
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should toggle panel on header click', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VExpansionPanelContent, {
              slots: {
                header: [compileToFunctions('<span>header</span>')]
              },
              provide: {
                focusable: true,
                panelClick: function panelClick(uid) {
                  return wrapper.vm.toggle(uid);
                }
              }
            });


            wrapper.find('.expansion-panel__header')[0].trigger('click');
            _context.next = 4;
            return wrapper.vm.$nextTick();

          case 4:
            expect(wrapper.html()).toMatchSnapshot();

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should render an expanded component and match snapshot', function () {
    var wrapper = mount(VExpansionPanelContent, {
      propsData: {
        ripple: true
      },
      provide: {
        focusable: true,
        panelClick: jest.fn()
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render an expanded component with lazy prop and match snapshot', function () {
    var wrapper = mount(VExpansionPanelContent, {
      propsData: {
        lazy: true
      },
      provide: {
        focusable: true,
        panelClick: jest.fn()
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
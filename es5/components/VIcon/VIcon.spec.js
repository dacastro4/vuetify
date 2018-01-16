var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import VIcon from '@components/VIcon';
import { test, functionalContext } from '@util/testing';

test('VIcon.js', function (_ref) {
  var mount = _ref.mount,
      compileToFunctions = _ref.compileToFunctions;

  it('should render component', function () {
    var context = functionalContext({}, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.text()).toBe('add');
    expect(wrapper.element.className).toBe('icon material-icons');
  });

  it('should render a colored component', function () {
    var context = functionalContext({ props: { color: 'green lighten-1' } }, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.element.classList).toContain('green--text');
    expect(wrapper.element.classList).toContain('text--lighten-1');
  });

  it('should render a disabled component', function () {
    var context = functionalContext({ props: { disabled: true } }, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.element.classList).toContain('icon--disabled');
  });

  it('should not set font size if none provided', function () {
    var context = functionalContext({}, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.element.style.fontSize).toBe('');
  });

  it('should render a mapped size', function () {
    var SIZE_MAP = {
      small: '16px',
      medium: '28px',
      large: '36px',
      xLarge: '40px'
    };

    Object.keys(SIZE_MAP).forEach(function (size) {
      var context = functionalContext({ props: _defineProperty({}, size, true) }, 'add');
      var wrapper = mount(VIcon, context);

      expect(wrapper.element.style.fontSize).toBe(SIZE_MAP[size]);
    });
  });

  it('should render a specific size', function () {
    var context = functionalContext({ props: { size: '112px' } }, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.element.style.fontSize).toBe('112px');
  });

  it('should render a left aligned component', function () {
    var context = functionalContext({ props: { left: true } }, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.element.classList).toContain('icon--left');
  });

  it('should render a right aligned component', function () {
    var context = functionalContext({ props: { right: true } }, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.element.classList).toContain('icon--right');
  });

  it('should render a component with aria-hidden attr', function () {
    var context = functionalContext({ attrs: { 'aria-hidden': 'foo' } }, 'add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.element.getAttribute('aria-hidden')).toBe('foo');
  });

  it('should allow third-party icons when using <icon>- prefix', function () {
    var context = functionalContext({ props: {} }, 'fa-add');
    var wrapper = mount(VIcon, context);

    expect(wrapper.text()).toBe('');
    expect(wrapper.element.className).toBe('icon fa fa-add');
  });

  it('should support font awesome 5 icons when using <icon>- prefix', function () {
    var context = functionalContext({ props: {} }, 'fab fa-facebook');
    var wrapper = mount(VIcon, context);

    expect(wrapper.text()).toBe('');
    expect(wrapper.element.className).toBe('icon fab fa-facebook');
  });

  it('should allow the use of v-text', function () {
    var wrapper = mount(VIcon, functionalContext({
      domProps: { textContent: 'fa-home' }
    }));

    expect(wrapper.text()).toBe('');
    expect(wrapper.element.className).toBe('icon fa fa-home');
  });

  it('should allow the use of v-html', function () {
    var wrapper = mount(VIcon, functionalContext({
      domProps: { innerHTML: 'fa-home' }
    }));

    expect(wrapper.text()).toBe('');
    expect(wrapper.element.className).toBe('icon fa fa-home');
  });

  it('set font size from helper prop', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var iconFactory, small, medium, large, xLarge;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            iconFactory = function iconFactory(size) {
              return mount(VIcon, functionalContext({
                props: _defineProperty({}, size, true)
              }));
            };

            small = iconFactory('small');

            expect(small.html()).toMatchSnapshot();

            medium = iconFactory('medium');

            expect(medium.html()).toMatchSnapshot();

            large = iconFactory('large');

            expect(large.html()).toMatchSnapshot();

            xLarge = iconFactory('xLarge');

            expect(xLarge.html()).toMatchSnapshot();

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should have proper classname', function () {
    var wrapper = mount(VIcon, functionalContext({
      props: {
        color: 'primary'
      },
      domProps: {
        innerHTML: 'fa-lock'
      }
    }));

    expect(wrapper.element.className).toBe('icon primary--text fa fa-lock');
  });
});
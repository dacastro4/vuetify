var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import { compileToFunctions } from 'vue-template-compiler';
import VDatePickerHeader from './VDatePickerHeader';
import { test } from '@util/testing';

test('VDatePickerHeader.js', function (_ref) {
  var mount = _ref.mount;

  it('should render component and match snapshot', function () {
    var wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11'
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should render component with year value and match snapshot', function () {
    var wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005'
      }
    });

    expect(wrapper.find('.date-picker-header__value strong')[0].element.textContent).toBe('2005');
  });

  it('should render prepend/append icons', function () {
    var wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005',
        prependIcon: 'foo',
        appendIcon: 'bar'
      }
    });

    expect(wrapper.find('.icon')[0].element.textContent).toBe('foo');
    expect(wrapper.find('.icon')[1].element.textContent).toBe('bar');
  });

  it('should render component with own formatter and match snapshot', function () {
    var wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11',
        format: function format(value) {
          return '(' + value + ')';
        }
      }
    });

    expect(wrapper.find('.date-picker-header__value strong')[0].element.textContent).toBe('(2005-11)');
  });

  it('should render colored component and match snapshot', function () {
    var wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11',
        color: 'green lighten-1'
      }
    });

    var strong = wrapper.find('.date-picker-header__value strong')[0];
    expect(strong.hasClass('green--text')).toBe(true);
    expect(strong.hasClass('text--lighten-1')).toBe(true);
  });

  it('should render component with default slot and match snapshot', function () {
    var wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11'
      },
      slots: {
        default: [compileToFunctions('<span>foo</span>')]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should trigger event on selector click', function () {
    var wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-11'
      }
    });

    var toggle = jest.fn();
    wrapper.vm.$on('toggle', toggle);

    wrapper.find('.date-picker-header__value strong')[0].trigger('click');
    expect(toggle).toBeCalled();
  });

  it('should trigger event on arrows click', function () {
    var wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-12'
      }
    });

    var input = jest.fn();
    wrapper.vm.$on('input', input);

    wrapper.find('button')[0].trigger('click');
    expect(input).toBeCalledWith('2005-11');

    wrapper.find('button')[1].trigger('click');
    expect(input).toBeCalledWith('2006-01');
  });

  it('should calculate prev/next value', function () {
    var wrapper = mount(VDatePickerHeader, {
      propsData: {
        value: '2005-12'
      }
    });
    expect(wrapper.vm.calculateChange(-1)).toBe('2005-11');
    expect(wrapper.vm.calculateChange(+1)).toBe('2006-01');

    wrapper.setProps({
      value: '2005'
    });
    expect(wrapper.vm.calculateChange(-1)).toBe('2004');
    expect(wrapper.vm.calculateChange(+1)).toBe('2006');
  });

  it('should watch value and run transition', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            wrapper = mount(VDatePickerHeader, {
              propsData: {
                value: 2005
              }
            });


            wrapper.setProps({
              value: 2006
            });
            _context.next = 4;
            return wrapper.vm.$nextTick();

          case 4:
            expect(wrapper.find('.date-picker-header__value strong')[0].hasClass('tab-transition-enter')).toBe(true);
            expect(wrapper.find('.date-picker-header__value strong')[0].hasClass('tab-transition-enter-active')).toBe(true);

          case 6:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));

  it('should watch value and run reverse transition', _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
    var wrapper;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            wrapper = mount(VDatePickerHeader, {
              propsData: {
                value: 2005
              }
            });


            wrapper.setProps({
              value: 2004
            });
            _context2.next = 4;
            return wrapper.vm.$nextTick();

          case 4:
            expect(wrapper.find('.date-picker-header__value strong')[0].hasClass('tab-reverse-transition-enter')).toBe(true);
            expect(wrapper.find('.date-picker-header__value strong')[0].hasClass('tab-reverse-transition-enter-active')).toBe(true);

          case 6:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, _this);
  })));
});
var _this = this;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import Vue from 'vue';
import { test } from '@util/testing';
import VDataIterator from './VDataIterator';
import VBtn from '@components/VBtn';

test('VDataIterator.js', function (_ref) {
  var mount = _ref.mount,
      compileToFunctions = _ref.compileToFunctions;

  function dataIteratorTestData() {
    return {
      propsData: {
        pagination: {
          descending: false,
          sortBy: 'col1',
          rowsPerPage: 5,
          page: 1
        },
        items: [{ other: 1, col1: 'foo', col2: 'a', col3: 1 }, { other: 2, col1: null, col2: 'b', col3: 2 }, { other: 3, col1: undefined, col2: 'c', col3: 3 }]
      }
    };
  }

  it('should match a snapshot - no matching records', function () {
    var data = dataIteratorTestData();
    data.propsData.search = "asdf";
    var wrapper = mount(VDataIterator, data);

    expect(wrapper.html()).toMatchSnapshot();

    var content = wrapper.find('.data-iterator div div')[0];
    expect(content.element.textContent).toBe('No matching records found');

    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should match a snapshot - hideActions and no footer slot', function () {
    var data = dataIteratorTestData();
    data.propsData.hideActions = true;
    var wrapper = mount(VDataIterator, data);

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should match a snapshot - footer slot', function () {
    var data = dataIteratorTestData();
    data.slots = {
      footer: [compileToFunctions('<span>footer</span>')]
    };
    var wrapper = mount(VDataIterator, data);

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should match a snapshot - no data', function () {
    var data = dataIteratorTestData();
    data.propsData.items = [];
    var wrapper = mount(VDataIterator, data);

    expect(wrapper.html()).toMatchSnapshot();

    var content = wrapper.find('.data-iterator div div')[0];
    expect(content.element.textContent).toBe('No data available');

    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should match a snapshot - with data', function () {
    var data = dataIteratorTestData();

    var vm = new Vue();
    var item = function item(props) {
      return vm.$createElement('div', [props.item.col2]);
    };
    var component = Vue.component('test', {
      components: {
        VBtn: VBtn,
        VDataIterator: VDataIterator
      },
      render: function render(h) {
        return h('v-data-iterator', {
          props: _extends({
            'content-tag': 'span'
          }, data.propsData),
          scopedSlots: {
            item: item
          }
        });
      }
    });

    var wrapper = mount(component);

    expect(wrapper.html()).toMatchSnapshot();
    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should pass attrs, class and props to content', function () {
    var data = dataIteratorTestData();

    var vm = new Vue();
    var item = function item(props) {
      return vm.$createElement('div', [props.item.col2]);
    };
    var component = Vue.component('test', {
      components: {
        VBtn: VBtn,
        VDataIterator: VDataIterator
      },
      render: function render(h) {
        return h('v-data-iterator', {
          props: _extends({
            'content-tag': 'v-btn'
          }, data.propsData, {
            'content-props': { block: true },
            'content-class': 'test__class'
          }),
          attrs: {
            id: "testButtonId"
          },
          scopedSlots: {
            item: item
          }
        });
      }
    });

    var wrapper = mount(component);

    var mainDiv = wrapper.find('.data-iterator')[0];
    expect(mainDiv.hasAttribute('id')).toBe(false);

    var button = mainDiv.find('button')[0];
    expect(button.getAttribute('id')).toBe('testButtonId');
    expect(button.hasClass('btn--block')).toBe(true);
    expect(button.hasClass('test__class')).toBe(true);

    expect('Unable to locate target [data-app]').toHaveBeenTipped();
  });

  it('should not filter items if search is empty', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var data, wrapper;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            data = dataIteratorTestData();

            data.propsData.search = '    ';
            wrapper = mount(VDataIterator, data);


            expect(wrapper.instance().filteredItems).toHaveLength(data.propsData.items.length);

            expect('Unable to locate target [data-app]').toHaveBeenTipped();

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));
});
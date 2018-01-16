var _this = this;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

import Vue from 'vue';
import Vuetify from '@components/Vuetify';
import { test } from '@util/testing';

test('Vuetify.install.js', function () {
  it('should install transitions, directives and components', _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var component, directive, use;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            component = Vue.component, directive = Vue.directive, use = Vue.use;


            Vue.component = jest.fn();
            Vue.directive = jest.fn();
            Vue.use = jest.fn();

            Vuetify.installed = false;
            Vuetify.install(Vue, {
              components: {
                component: 'foobarbaz'
              },
              directives: {
                directive: {
                  name: 'foobarbaz'
                }
              },
              transitions: {
                transition: {
                  name: 'transition'
                },
                'v-foobarbaz': {
                  name: 'v-foobarbaz'
                },
                'undefined': {}
              }
            });

            expect(Vue.use.mock.calls).toEqual([['foobarbaz']]);
            expect(Vue.directive.mock.calls).toEqual([["foobarbaz", { "name": "foobarbaz" }]]);
            expect(Vue.component.mock.calls).toEqual([["v-foobarbaz", { "name": "v-foobarbaz" }]]);

            Vue.use = jest.fn();
            Vuetify.install(Vue, {
              components: {
                component: 'component'
              }
            });
            expect(Vue.use).not.toBeCalled();

            Vue.component = component;
            Vue.directive = directive;
            Vue.use = use;

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, _this);
  })));
});
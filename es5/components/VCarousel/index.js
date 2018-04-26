'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VCarouselItem = exports.VCarousel = undefined;

var _VCarousel = require('./VCarousel');

var _VCarousel2 = _interopRequireDefault(_VCarousel);

var _VCarouselItem = require('./VCarouselItem');

var _VCarouselItem2 = _interopRequireDefault(_VCarouselItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.VCarousel = _VCarousel2.default;
exports.VCarouselItem = _VCarouselItem2.default;

/* istanbul ignore next */

_VCarousel2.default.install = function install(Vue) {
  Vue.component(_VCarousel2.default.name, _VCarousel2.default);
  Vue.component(_VCarouselItem2.default.name, _VCarouselItem2.default);
};

exports.default = _VCarousel2.default;
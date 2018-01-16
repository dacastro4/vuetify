import application from './mixins/application';
import theme from './mixins/theme';
import options from './mixins/options';

var Vuetify = {
  install: function install(Vue) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (this.installed) return;

    this.installed = true;

    var $vuetify = {};
    Vue.util.defineReactive($vuetify, 'inspire', {
      breakpoint: {},
      application: application,
      dark: false,
      theme: theme(opts.theme),
      options: options(opts.options)
    });

    Vue.prototype.$vuetify = $vuetify.inspire;

    if (opts.transitions) {
      Object.values(opts.transitions).forEach(function (transition) {
        if (transition.name !== undefined && transition.name.startsWith('v-')) {
          Vue.component(transition.name, transition);
        }
      });
    }

    if (opts.directives) {
      Object.values(opts.directives).forEach(function (directive) {
        Vue.directive(directive.name, directive);
      });
    }

    if (opts.components) {
      Object.values(opts.components).forEach(function (component) {
        Vue.use(component);
      });
    }
  }
};

export default Vuetify;
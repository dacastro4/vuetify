import { intToHex } from '../../../util/colorUtils';
import * as Theme from '../../../util/theme';

export default {
  data: function data() {
    return {
      style: null
    };
  },

  computed: {
    parsedTheme: function parsedTheme() {
      return Theme.parse(this.$vuetify.theme);
    }
  },

  watch: {
    parsedTheme: function parsedTheme() {
      this.applyTheme();
    }
  },

  created: function created() {
    if (typeof document === 'undefined' && this.$ssrContext) {
      if (!this.$ssrContext._styles) this.$ssrContext._styles = {};
      this.$ssrContext._styles['vuetify-theme-stylesheet'] = {
        ids: ['vuetify-theme-stylesheet'],
        css: this.genColors(this.parsedTheme),
        media: ''
      };
      return;
    }
    this.genStyle();
    this.applyTheme();
  },


  methods: {
    applyTheme: function applyTheme() {
      this.style.innerHTML = this.genColors(this.parsedTheme);
    },
    genColors: function genColors(theme) {
      var css = void 0;

      if (this.$vuetify.options.themeCache != null) {
        css = this.$vuetify.options.themeCache.get(theme);
        if (css != null) return css;
      }

      var colors = Object.keys(theme);
      css = 'a { color: ' + intToHex(theme.primary) + '; }';

      for (var i = 0; i < colors.length; ++i) {
        var name = colors[i];
        var value = theme[name];
        if (this.$vuetify.options.themeVariations.includes(name)) {
          css += Theme.genVariations(name, value).join('');
        } else {
          css += Theme.genBaseColor(name, value);
        }
      }

      if (this.$vuetify.options.minifyTheme != null) {
        css = this.$vuetify.options.minifyTheme(css);
      }

      if (this.$vuetify.options.themeCache != null) {
        this.$vuetify.options.themeCache.set(theme, css);
      }

      return css;
    },
    genStyle: function genStyle() {
      var style = document.querySelector('[data-vue-ssr-id=vuetify-theme-stylesheet]') || document.getElementById('vuetify-theme-stylesheet');

      if (!style) {
        style = document.createElement('style');
        style.type = 'text/css';
        style.id = 'vuetify-theme-stylesheet';
        document.head.appendChild(style);
      }

      this.style = style;
    }
  }
};
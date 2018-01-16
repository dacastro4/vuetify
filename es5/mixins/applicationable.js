import { factory as PositionableFactory } from './positionable';

export default function applicationable(value) {
  var events = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return {
    name: 'applicationable',

    mixins: [PositionableFactory(['absolute', 'fixed'])],

    props: {
      app: Boolean
    },

    computed: {
      applicationProperty: function applicationProperty() {
        return value;
      }
    },

    watch: {
      // If previous value was app
      // reset the provided prop
      app: function app(x, prev) {
        prev ? this.removeApplication() : this.callUpdate();
      }
    },

    created: function created() {
      for (var i = 0, length = events.length; i < length; i++) {
        this.$watch(events[i], this.callUpdate);
      }
    },
    mounted: function mounted() {
      this.callUpdate();
    },
    destroyed: function destroyed() {
      this.app && this.removeApplication();
    },


    methods: {
      callUpdate: function callUpdate() {
        if (!this.app) return;

        this.$vuetify.application[this.applicationProperty] = this.updateApplication();
      },
      removeApplication: function removeApplication() {
        this.$vuetify.application[this.applicationProperty] = 0;
      },

      updateApplication: function updateApplication() {}
    }
  };
}
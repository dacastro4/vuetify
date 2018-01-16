require('../../../src/stylus/components/_tables.styl');
require('../../../src/stylus/components/_data-table.styl');

import DataIterable from '../../mixins/data-iterable';

import VProgressLinear from '../VProgressLinear';

import Head from './mixins/head';
import Body from './mixins/body';
import Foot from './mixins/foot';
import Progress from './mixins/progress';

import { createSimpleFunctional, getObjectValueByPath } from '../../util/helpers';

export default {
  name: 'v-data-table',

  components: {
    VProgressLinear: VProgressLinear,
    // Importing does not work properly
    'v-table-overflow': createSimpleFunctional('table__overflow')
  },

  data: function data() {
    return {
      actionsClasses: 'datatable__actions',
      actionsRangeControlsClasses: 'datatable__actions__range-controls',
      actionsSelectClasses: 'datatable__actions__select',
      actionsPaginationClasses: 'datatable__actions__pagination'
    };
  },


  mixins: [DataIterable, Head, Body, Foot, Progress],

  props: {
    headers: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    headerText: {
      type: String,
      default: 'text'
    },
    hideHeaders: Boolean,
    rowsPerPageText: {
      type: String,
      default: 'Rows per page:'
    },
    customFilter: {
      type: Function,
      default: function _default(items, search, filter, headers) {
        search = search.toString().toLowerCase();
        if (search.trim() === '') return items;

        var props = headers.map(function (h) {
          return h.value;
        });

        return items.filter(function (item) {
          return props.some(function (prop) {
            return filter(getObjectValueByPath(item, prop), search);
          });
        });
      }
    }
  },

  computed: {
    classes: function classes() {
      return {
        'datatable table': true,
        'datatable--select-all': this.selectAll !== false,
        'theme--dark': this.dark,
        'theme--light': this.light
      };
    },
    filteredItems: function filteredItems() {
      return this.filteredItemsImpl(this.headers);
    }
  },

  methods: {
    needsTR: function needsTR(row) {
      return row.length && row.find(function (c) {
        return c.tag === 'td' || c.tag === 'th';
      });
    },
    genTR: function genTR(children) {
      var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return this.$createElement('tr', data, children);
    }
  },

  created: function created() {
    var firstSortable = this.headers.find(function (h) {
      return !('sortable' in h) || h.sortable;
    });

    this.defaultPagination.sortBy = !this.disableInitialSort && firstSortable ? firstSortable.value : null;

    this.initPagination();
  },
  render: function render(h) {
    var tableOverflow = h('v-table-overflow', {}, [h('table', {
      'class': this.classes
    }, [this.genTHead(), this.genTBody(), this.genTFoot()])]);

    return h('div', [tableOverflow, this.genActionsFooter()]);
  }
};
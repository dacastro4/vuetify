import { filterObjectOnKeys } from '../util/helpers';

export function factory() {
  var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var props = {
    absolute: Boolean,
    bottom: Boolean,
    fixed: Boolean,
    left: Boolean,
    right: Boolean,
    top: Boolean
  };

  return {
    name: 'positionable',
    props: selected.length && filterObjectOnKeys(props, selected) || props
  };
}

export default factory();
import createNativeLocaleFormatter from './createNativeLocaleFormatter';
import { test } from '@util/testing';

test('VDatePicker/util/createNativeLocaleFormatter.js', function (_ref) {
  var mount = _ref.mount;

  it('should format dates', function () {

    var formatter = createNativeLocaleFormatter(undefined, { day: 'numeric', timeZone: 'UTC' });
    expect(formatter('2013-2-07')).toBe('7');
  });

  it('should format dates if Intl is not defined', function () {
    var oldIntl = global.Intl;

    global.Intl = null;
    var formatter = createNativeLocaleFormatter(undefined, { day: 'numeric', timeZone: 'UTC' }, { start: 0, length: 10 });
    expect(formatter('2013-2-7')).toBe('2013-02-07');
    expect(formatter('2013-2')).toBe('2013-02-01');
    expect(formatter('2013')).toBe('2013-01-01');

    var nullFormatter = createNativeLocaleFormatter(undefined, { day: 'numeric', timeZone: 'UTC' });
    expect(nullFormatter).toBe(null);
    global.Intl = oldIntl;
  });
});
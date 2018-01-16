import monthChange from './monthChange';
import { test } from '@util/testing';

test('VDatePicker/util/monthChange.js', function (_ref) {
  var mount = _ref.mount;

  it('should change month', function () {
    expect(monthChange('2000-01', -1)).toBe('1999-12');
    expect(monthChange('2000-01', +1)).toBe('2000-02');
    expect(monthChange('2000-12', -1)).toBe('2000-11');
    expect(monthChange('2000-12', +1)).toBe('2001-01');
  });
});
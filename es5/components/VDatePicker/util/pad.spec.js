import pad from './pad';
import { test } from '@util/testing';

test('VDatePicker/util/pad.js', function (_ref) {
  var mount = _ref.mount;

  it('should pad 1-digit numbers', function () {
    expect(pad(0)).toBe('00');
    expect(pad('3', 3)).toBe('003');
  });

  it('should pad 2-digit numbers', function () {
    expect(pad(40)).toBe('40');
    expect(pad('98')).toBe('98');
  });

  it('should not pad 3-digit numbers', function () {
    expect(pad(400)).toBe('400');
    expect(pad('998')).toBe('998');
  });
});
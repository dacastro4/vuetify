import { test } from '@util/testing';
import { consoleWarn, consoleError } from '@util/console';

test('console.js', function () {
  it('should generate a warning', function () {
    consoleWarn('foo');
    expect('[Vuetify] foo').toHaveBeenTipped();

    consoleWarn('bar', { $options: { name: 'baz' } });
    expect('[Vuetify] bar in "baz"').toHaveBeenTipped();
  });

  it('should generate an error', function () {
    consoleError('foo');
    expect('[Vuetify] foo').toHaveBeenWarned();

    consoleError('bar', { $options: { name: 'baz' } });
    expect('[Vuetify] bar in "baz"').toHaveBeenWarned();
  });
});
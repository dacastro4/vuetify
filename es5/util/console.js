function createMessage(message, componentInstance) {
  var componentInfo = componentInstance ? ' in "' + componentInstance.$options.name + '"' : '';
  return '[Vuetify] ' + message + componentInfo;
}

export function consoleWarn(message) {
  var componentInstance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  console.warn(createMessage(message, componentInstance));
}

export function consoleError(message) {
  var componentInstance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  console.error(createMessage(message, componentInstance));
}
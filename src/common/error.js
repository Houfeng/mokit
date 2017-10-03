import info from '$info';

export default class LibError extends Error {
  constructor(message, ...other) {
    super(`[${info.name}]: ${message}`, ...other);
  }
}
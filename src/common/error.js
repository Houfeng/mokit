class InternalError extends Error {
  static prefix = null;
  constructor(message, ...other) {
    let prefix = InternalError.prefix;
    super(prefix ? `[${prefix}] ${message}` : message, ...other);
  }
}

module.exports = InternalError;
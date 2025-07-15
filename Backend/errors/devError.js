class DevError extends Error {
  constructor(message) {
    super(message);
    this.name = "DevError";
    this.isOperational = false; // Marks as internal error
    Error.captureStackTrace(this, this.constructor);
  }
}

export default DevError;

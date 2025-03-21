export const handleError = (
  res,
  error,
  message = "Internal Server Error",
  statusCode = 500
) => {
  console.error(message, error);
  return res.status(statusCode).json({
    message,
    error: error.message,
  });
};

export const handleApiError = (error) => {
  console.error('API Error:', error);

  return {
    status: error.response?.status || 500,
    error: true,
    message: error.response?.data?.message || 'An unexpected error occurred',
    details:
      process.env.NODE_ENV === 'development' ? error.toString() : undefined,
  };
};
export const createApiResponse = (data, status = 200) => {
  return NextResponse.json({
    status,
    data,
    timestamp: new Date().toISOString(),
  });
};
export const validateRequest = (request, requiredFields) => {
  const errors = [];

  requiredFields.forEach((field) => {
    if (!request[field]) {
      errors.push(`${field} is required`);
    }
  });

  return errors;
};

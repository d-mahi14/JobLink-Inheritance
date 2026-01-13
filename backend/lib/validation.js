// Validation utility functions

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password && password.length >= 6;
};

export const validateUserType = (userType) => {
  return ['candidate', 'company'].includes(userType);
};

export const validateJobStatus = (status) => {
  return ['active', 'closed', 'draft'].includes(status);
};

export const validateApplicationStatus = (status) => {
  return ['pending', 'reviewed', 'shortlisted', 'rejected', 'accepted'].includes(status);
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  // Remove potentially dangerous characters
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove < and >
    .slice(0, 1000); // Limit length
};

export const validateRequiredFields = (data, requiredFields) => {
  const missingFields = [];
  
  for (const field of requiredFields) {
    if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
      missingFields.push(field);
    }
  }
  
  if (missingFields.length > 0) {
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }
  
  return true;
};

export const validateUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};

export const isValidBase64 = (str) => {
  if (!str || typeof str !== 'string') return false;
  
  // Check if it's a data URL
  if (str.startsWith('data:')) {
    return true;
  }
  
  // Check if it's a valid base64 string
  const base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
  return base64Regex.test(str);
};

export const validateFileSize = (base64String, maxSizeMB = 5) => {
  // Calculate size from base64 string
  const sizeInBytes = (base64String.length * 3) / 4;
  const sizeInMB = sizeInBytes / (1024 * 1024);
  
  return sizeInMB <= maxSizeMB;
};

export const validatePaginationParams = (page, limit) => {
  const parsedPage = parseInt(page) || 1;
  const parsedLimit = parseInt(limit) || 10;
  
  return {
    page: Math.max(1, parsedPage),
    limit: Math.min(100, Math.max(1, parsedLimit)) // Max 100 items per page
  };
};
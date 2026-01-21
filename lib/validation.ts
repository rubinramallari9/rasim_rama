/**
 * Frontend validation utilities
 * These provide client-side validation for better UX.
 * Server-side validation is still the source of truth.
 */

// Sanitize user input - remove potential XSS
export function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

// Validate name
export function validateName(name: string): { valid: boolean; error?: string } {
  if (!name || name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters.' };
  }
  if (name.length > 100) {
    return { valid: false, error: 'Name must be less than 100 characters.' };
  }
  // Check for suspicious patterns
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
  ];
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(name)) {
      return { valid: false, error: 'Invalid characters in name.' };
    }
  }
  return { valid: true };
}

// Validate email
export function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || !email.trim()) {
    return { valid: false, error: 'Email is required.' };
  }
  if (!isValidEmail(email)) {
    return { valid: false, error: 'Please enter a valid email address.' };
  }
  return { valid: true };
}

// Validate message
export function validateMessage(message: string): { valid: boolean; error?: string } {
  if (!message || message.trim().length < 10) {
    return { valid: false, error: 'Message must be at least 10 characters.' };
  }
  if (message.length > 5000) {
    return { valid: false, error: 'Message must be less than 5000 characters.' };
  }
  // Check for excessive URLs
  const urlCount = (message.match(/https?:\/\//gi) || []).length;
  if (urlCount > 3) {
    return { valid: false, error: 'Too many links in message.' };
  }
  return { valid: true };
}

// Validate entire contact form
export function validateContactForm(data: {
  name: string;
  email: string;
  message: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const nameValidation = validateName(data.name);
  if (!nameValidation.valid) {
    errors.name = nameValidation.error!;
  }

  const emailValidation = validateEmail(data.email);
  if (!emailValidation.valid) {
    errors.email = emailValidation.error!;
  }

  const messageValidation = validateMessage(data.message);
  if (!messageValidation.valid) {
    errors.message = messageValidation.error!;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

// Rate limiting on client side (basic)
const submissionTimestamps: number[] = [];
const MAX_SUBMISSIONS = 3;
const TIME_WINDOW = 60 * 1000; // 1 minute

export function canSubmit(): boolean {
  const now = Date.now();
  // Remove old timestamps
  while (submissionTimestamps.length > 0 && submissionTimestamps[0] < now - TIME_WINDOW) {
    submissionTimestamps.shift();
  }
  return submissionTimestamps.length < MAX_SUBMISSIONS;
}

export function recordSubmission(): void {
  submissionTimestamps.push(Date.now());
}

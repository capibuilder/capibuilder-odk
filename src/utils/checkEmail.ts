export function isValidEmail(email: string): boolean {
  // Regular expression pattern for validating email format
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Test the email against the pattern and return the result
  return emailPattern.test(email);
}

export function isValidAddress(address: string): boolean {
  const re = /0x[\d\w]{40}/i;
  return re.test(address);
}

export function isValidEmail(email: string): boolean {
  const re = /[^\s@]+@[^\s@]+\.[^\s@]+/gi;
  return re.test(email);
}

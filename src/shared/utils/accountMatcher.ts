function normalize(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

export function isAccountForUser(customerName: string, email: string): boolean {
  const normalizedName = normalize(customerName);
  const normalizedEmail = normalize(email);

  const emailUsername = normalizedEmail.split("valtechcom")[0];

  return (
    normalizedEmail.includes(normalizedName) ||
    emailUsername.includes(normalizedName) ||
    normalizedName.includes(emailUsername)
  );
}

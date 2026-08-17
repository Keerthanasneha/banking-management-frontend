interface JwtPayload {
  sub?: string;
  customerId?: number;
  exp?: number;
  iat?: number;
}

export function getJwtPayload(): JwtPayload | null {
  const token = sessionStorage.getItem('banking_access_token');

  if (!token) {
    return null;
  }

  try {
    const payload = token.split('.')[1];

    const decodedPayload = JSON.parse(
      atob(payload.replace(/-/g, '+').replace(/_/g, '/')),
    );

    return decodedPayload;
  } catch {
    return null;
  }
}
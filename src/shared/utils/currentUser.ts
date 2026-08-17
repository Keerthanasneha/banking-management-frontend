import { getJwtPayload } from "./jwt";

export function getLoggedInEmail(): string | null {
  const payload = getJwtPayload();

  return payload?.sub ?? null;
}

export function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? "";
  const list = raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (!list.includes("prateekshakya3@gmail.com")) {
    list.push("prateekshakya3@gmail.com");
  }
  return list;
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const admins = getAdminEmails();
  if (admins.length === 0) return false;
  return admins.includes(email.trim().toLowerCase());
}

export function emailFromClaims(claims: Record<string, unknown> | undefined): string | null {
  if (!claims) return null;
  const email = claims.email;
  return typeof email === "string" ? email : null;
}

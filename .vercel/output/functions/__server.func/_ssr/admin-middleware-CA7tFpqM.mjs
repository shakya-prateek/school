import { a as createMiddleware } from "./server-CQXPTDvh.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-ovHzplJn.mjs";
function getAdminEmails() {
  const raw = process.env.ADMIN_EMAILS ?? "";
  return raw.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}
function isAdminEmail(email) {
  if (!email) return false;
  const admins = getAdminEmails();
  if (admins.length === 0) return false;
  return admins.includes(email.trim().toLowerCase());
}
function emailFromClaims(claims) {
  if (!claims) return null;
  const email = claims.email;
  return typeof email === "string" ? email : null;
}
const requireAdmin = createMiddleware({ type: "function" }).middleware([requireSupabaseAuth]).server(async ({ next, context }) => {
  const claims = context.claims;
  const email = emailFromClaims(claims);
  if (!isAdminEmail(email)) {
    throw new Error("Forbidden: Admin access required");
  }
  return next({
    context: {
      ...context,
      adminEmail: email
    }
  });
});
export {
  emailFromClaims as e,
  isAdminEmail as i,
  requireAdmin as r
};

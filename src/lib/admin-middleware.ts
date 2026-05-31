import { createMiddleware } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { emailFromClaims, isAdminEmail } from "@/lib/admin.server";

export const requireAdmin = createMiddleware({ type: "function" })
  .middleware([requireSupabaseAuth])
  .server(async ({ next, context }) => {
    const claims = (context as { claims?: Record<string, unknown> }).claims;
    const email = emailFromClaims(claims);
    if (!isAdminEmail(email)) {
      throw new Error("Forbidden: Admin access required");
    }
    return next({
      context: {
        ...context,
        adminEmail: email,
      },
    });
  });

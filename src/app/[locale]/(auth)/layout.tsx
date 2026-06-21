/**
 * Auth route group layout. Authentication is handled by Auth0 (see src/proxy.ts
 * and src/lib/auth0.ts) — there is no provider to wrap here, so we just render
 * the protected children.
 */
export default function AuthLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  return props.children;
}

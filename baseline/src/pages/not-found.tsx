import { Layout } from "@/components/layout";
import { Link } from "@/components/native-link";

// Served as the static 404 document. Public wording replaces the former
// developer note ("Did you forget to add the page to the router?").
export default function NotFound() {
  const links = [
    { href: "/", label: "Home" },
    { href: "/work", label: "Work" },
    { href: "/case-studies", label: "Case studies" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];
  return (
    <Layout>
      <div className="container mx-auto px-4 md:px-8 max-w-2xl py-24">
        <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">404</p>
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary" style={{ letterSpacing: "-0.02em" }}>
          Page not found
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          There is no page at this address. It may have moved, or the link may be out of date.
        </p>
        <ul className="flex flex-wrap gap-2">
          {links.map(link => (
            <li key={link.href}>
              <Link href={link.href} className="text-xs bg-muted border border-border rounded-full px-3 py-1.5 text-muted-foreground font-medium hover:text-secondary">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

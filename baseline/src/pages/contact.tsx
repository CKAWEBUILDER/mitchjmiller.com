import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Mail, Linkedin, Phone } from "lucide-react";
import { Link } from "@/components/native-link";

// Lane 3 contact contract (docs/cloudflare/README.md on claude/cloudflare-foundation):
// POST multipart/form-data with name, email, topic, message, turnstileToken, source_url.
// Progressive enhancement in site/components/parity/enhance.ts; the mailto path stays.
const CONTACT_ENDPOINT = "https://mitchjmiller-api.clearkayakrentalsoahu.workers.dev/contact";
const TURNSTILE_SITEKEY = "0x4AAAAAAEwq_uUlQ6tYWRDc";
const fieldClass = "block w-full rounded-md border border-border bg-card px-3 py-2 text-sm text-primary shadow-sm focus:outline-none focus:ring-1 focus:ring-ring";

export default function Contact() {
  return (
    <Layout>
      <SEO
        title="Contact · Mitchell Miller — Director of SEO, AEO/GEO & AI Search Systems"
        description="Get in touch with Mitchell Miller for SEO Director, AEO/GEO Lead, AI Search Strategist, or speaking engagement opportunities."
      />
      <div className="container mx-auto px-4 md:px-8 max-w-2xl py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-3 text-primary" style={{ letterSpacing: "-0.02em" }}>
          Contact
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          United States.
        </p>

        <div className="space-y-4 mb-12">
          <a
            href="mailto:mitchelljmillerjr26@gmail.com"
            className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-secondary/40 transition-all group"
            data-testid="link-email"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">Email</p>
              <p className="font-medium text-primary group-hover:text-secondary transition-colors">mitchelljmillerjr26@gmail.com</p>
            </div>
          </a>

          <a
            href="https://linkedin.com/in/mitchelljmillerjr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-secondary/40 transition-all group"
            data-testid="link-linkedin"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <Linkedin className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">LinkedIn</p>
              <p className="font-medium text-primary group-hover:text-secondary transition-colors">linkedin.com/in/mitchelljmillerjr</p>
            </div>
          </a>

          <a
            href="tel:+16263168682"
            className="flex items-center gap-4 bg-card border border-border rounded-xl p-5 hover:shadow-md hover:border-secondary/40 transition-all group"
            data-testid="link-phone"
          >
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
              <Phone className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider font-semibold text-muted-foreground mb-0.5">Phone</p>
              <p className="font-medium text-primary group-hover:text-secondary transition-colors">+1 (626) 316-8682</p>
            </div>
          </a>
        </div>

        <section aria-labelledby="contact-form-heading" className="border-t border-border pt-10 mb-12">
          <h2 id="contact-form-heading" className="text-lg font-bold text-primary mb-2">Send a message</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Tell me what you are trying to make possible. Messages go to a private inbox; I reply from the email above.
          </p>
          <noscript>
            <style>{"#contact-form{display:none}"}</style>
            <p className="text-sm text-muted-foreground mb-6">
              The message form needs JavaScript. Without it, email{" "}
              <a className="text-secondary hover:underline" href="mailto:mitchelljmillerjr26@gmail.com">mitchelljmillerjr26@gmail.com</a> directly.
            </p>
          </noscript>
          <form
            id="contact-form"
            method="post"
            action={CONTACT_ENDPOINT}
            className="space-y-5"
          >
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-primary mb-1.5">Name</label>
              <input id="contact-name" name="name" type="text" required maxLength={120} autoComplete="name" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-primary mb-1.5">Email</label>
              <input id="contact-email" name="email" type="email" required maxLength={254} autoComplete="email" className={fieldClass} />
            </div>
            <div>
              <label htmlFor="contact-topic" className="block text-sm font-medium text-primary mb-1.5">What are you trying to make possible?</label>
              <select id="contact-topic" name="topic" className={fieldClass} defaultValue="">
                <option value="">Choose a topic (optional)</option>
                <option value="role">A role: SEO, AEO/GEO or AI search leadership</option>
                <option value="consulting">Advisory or consulting</option>
                <option value="population-simulation">Population simulation on my own data</option>
                <option value="speaking">Speaking engagement</option>
                <option value="other">Something else</option>
              </select>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-primary mb-1.5">Message</label>
              <textarea id="contact-message" name="message" required maxLength={4000} rows={6} className={fieldClass} />
            </div>
            <div className="cf-turnstile" data-sitekey={TURNSTILE_SITEKEY} data-theme="light" data-size="flexible" />
            <p className="text-xs text-muted-foreground">Spam check by Cloudflare Turnstile. No account, no newsletter, no tracking beyond the site analytics.</p>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 disabled:opacity-60"
            >
              Send message
            </button>
            <p data-contact-status role="status" aria-live="polite" className="text-sm font-medium" hidden />
          </form>
          <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
        </section>

        <div className="border-t border-border pt-10">
          <h2 className="text-lg font-bold text-primary mb-4">Currently open to</h2>
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              "SEO Director",
              "AEO/GEO Lead",
              "AI Search Strategist",
              "Technical SEO/Product Manager",
              "Organic Growth Lead",
              "Website Growth Lead",
              "Speaking Engagements",
              "Advisory / Consulting",
            ].map(role => (
              <span key={role} className="text-xs bg-muted border border-border rounded-full px-3 py-1.5 text-muted-foreground font-medium">
                {role}
              </span>
            ))}
          </div>

          <a href="https://mitchjmiller.com/" className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:underline">
            View my personal portfolio
          </a>
        </div>
      </div>
    </Layout>
  );
}

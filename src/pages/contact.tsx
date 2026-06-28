import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { Mail, Linkedin, Phone, FileText } from "lucide-react";
import { Link } from "wouter";

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

          <Link
            href="/resume"
            className="inline-flex items-center gap-2 text-sm font-medium text-secondary hover:underline"
            data-testid="link-resume"
          >
            <FileText className="h-4 w-4" />
            Download resume (PDF)
          </Link>
        </div>
      </div>
    </Layout>
  );
}

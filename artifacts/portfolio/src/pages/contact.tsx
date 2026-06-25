import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";

export default function Contact() {
  return (
    <Layout>
      <SEO 
        title="Contact | Mitchell Miller" 
        description="Get in touch for roles in SEO, AEO/GEO, and AI Search strategy."
      />
      <div className="container mx-auto px-4 md:px-8 max-w-2xl py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact</h1>
        <p className="text-xl text-muted-foreground mb-12">
          San Jose, CA / Remote-first.
        </p>

        <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
          <form action="https://formsubmit.co/mitchelljmillerjr26@gmail.com" method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-primary mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                required 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-primary mb-2">Contact info / email</label>
              <input 
                type="text" 
                id="email" 
                name="email" 
                required 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-sm font-medium text-primary mb-2">Best time to connect</label>
              <select 
                id="time" 
                name="time" 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>

            <div>
              <label htmlFor="organization" className="block text-sm font-medium text-primary mb-2">Organization or collaboration type</label>
              <input 
                type="text" 
                id="organization" 
                name="organization" 
                required 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            <div>
              <label htmlFor="inquiry" className="block text-sm font-medium text-primary mb-2">Inquiry type</label>
              <select 
                id="inquiry" 
                name="inquiry" 
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="Job Opportunity">Job Opportunity</option>
                <option value="Consulting Inquiry">Consulting Inquiry</option>
                <option value="Speaking Engagement">Speaking Engagement</option>
                <option value="Collaboration">Collaboration</option>
                <option value="General">General</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2"
            >
              Send Message
            </button>
          </form>
        </div>

        <div className="mt-12 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <a href="mailto:mitchelljmillerjr26@gmail.com" className="hover:text-secondary transition-colors">mitchelljmillerjr26@gmail.com</a>
          <span>|</span>
          <a href="https://linkedin.com/in/mitchelljmillerjr" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors">LinkedIn</a>
        </div>
      </div>
    </Layout>
  );
}

import { Layout } from "@/components/layout";
import { SEO } from "@/components/seo";
import { vibeProjects } from "@/lib/data";
import { useState } from "react";

export default function VibeCoding() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "Research & AI", "Mobile & Web Apps", "Process Automation", "Volunteer & Community", "Finance Tools"];

  const filteredProjects = filter === "All" 
    ? vibeProjects 
    : vibeProjects.filter(p => p.category === filter);

  return (
    <Layout>
      <SEO 
        title="Vibe Coding | Mitchell Miller" 
        description="AI-assisted builds, experiments, prototypes, and workflow tools."
      />
      <div className="container mx-auto px-4 md:px-8 py-24">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Vibe Coding</h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
          AI-assisted builds, experiments, prototypes, and workflow tools. These are not products — they are research, exploration, and process automation. Some are useful, some are experiments.
        </p>
        
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === cat 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.name} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex flex-col">
              <div className="aspect-video bg-slate-100 flex items-center justify-center p-6 text-center border-b border-border relative">
                {(project as any).image ? (
                  <img src={(project as any).image} alt={project.placeholder} className="w-full h-full object-cover absolute inset-0" />
                ) : (
                  <span className="text-slate-500 text-sm font-medium">{project.placeholder}</span>
                )}
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="inline-block px-2 py-1 bg-secondary/10 text-secondary text-xs font-bold rounded mb-3 w-max">
                  {project.category}
                </span>
                <h3 className="font-bold text-xl mb-3 text-primary">{project.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1">
                  {project.description}
                </p>
                <p className="text-sm font-medium text-primary">
                  <span className="text-muted-foreground">Goal:</span> {project.goal}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

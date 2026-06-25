import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

import Home from "@/pages/home";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import Resume from "@/pages/resume";
import Systems from "@/pages/systems";
import Work from "@/pages/work";
import VibeCoding from "@/pages/vibe-coding";
import BlogIndex from "@/pages/blog-index";
import BlogPost from "@/pages/blog-post";
import CaseStudyDetail from "@/pages/case-study-detail";
import CaseStudiesIndex from "@/pages/case-studies-index";
import AeoGeo from "@/pages/aeo-geo";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/resume" component={Resume} />
      <Route path="/systems" component={Systems} />
      <Route path="/work" component={Work} />
      <Route path="/vibe-coding" component={VibeCoding} />
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/case-studies" component={CaseStudiesIndex} />
      <Route path="/case-studies/:slug" component={CaseStudyDetail} />
      <Route path="/aeo-geo" component={AeoGeo} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;

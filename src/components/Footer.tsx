import { Rocket } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border bg-background">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2 font-display font-bold">
            <Rocket className="w-5 h-5 text-primary" />
            <span>VR GravSim</span>
          </a>

          <p className="text-sm text-muted-foreground text-center">
            © 2026 VR Gravity Simulation Team. NASA HUNCH Project.
          </p>

          <div className="flex items-center gap-4">
            <a href="https://nasahunch.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              NASA HUNCH
            </a>
            <span className="text-muted-foreground/50">|</span>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Documentation
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

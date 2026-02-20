import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { name: "About", href: "/#about", isAnchor: true },
  { name: "Project", href: "/project", isAnchor: false },
  { name: "Testing Data", href: "/testing-data", isAnchor: false },
  { name: "Research", href: "/research", isAnchor: false },
  { name: "Team", href: "/#team", isAnchor: true },
  { name: "Contact", href: "/#contact", isAnchor: true },
];

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const [path, hash] = href.split('#');
    setMobileOpen(false);
    
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(hash);
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 mx-auto z-50 w-[90%] max-w-4xl"
    >
      <div className="glass-nav rounded-full px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <Rocket className="w-5 h-5 text-primary" />
          <span>VR GravSim</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            link.isAnchor ? (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.name}
              </Link>
            )
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Button asChild variant="default" size="sm" className="rounded-full glow-primary hidden md:inline-flex">
            <a href="https://www.nasahunch.com/" target="_blank" rel="noopener noreferrer">
              NASA HUNCH
            </a>
          </Button>
          <button
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 glass-nav rounded-2xl px-6 py-4 flex flex-col gap-3"
          >
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer py-1"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 py-1"
                >
                  {link.name}
                </Link>
              )
            ))}
            <Button asChild variant="default" size="sm" className="rounded-full glow-primary mt-2 w-full">
              <a href="https://www.nasahunch.com/" target="_blank" rel="noopener noreferrer">
                NASA HUNCH
              </a>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

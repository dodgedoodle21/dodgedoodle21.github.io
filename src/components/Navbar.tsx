import { motion } from "framer-motion";
import { Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { name: "About", href: "/" },
  { name: "Project", href: "/project" },
  { name: "Team", href: "/#team" },
  { name: "Contact", href: "/#contact" },
];

export const Navbar = () => {
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
            <Link
              key={link.name}
              to={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <Button variant="default" size="sm" className="rounded-full glow-primary">
          NASA HUNCH
        </Button>
      </div>
    </motion.nav>
  );
};

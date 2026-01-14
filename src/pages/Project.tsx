import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CheckCircle2, Clock, Circle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// ============================================
// EASY TO EDIT TEMPLATE - Modify sections below
// ============================================

// Project Overview Content
const projectOverview = {
  title: "VR Gravity Simulation",
  subtitle: "NASA HUNCH 2026",
  description: `Our team is developing an innovative Virtual Reality gravity simulation system 
    designed to help astronauts train for various gravitational environments. This cutting-edge 
    technology combines advanced physics engines with immersive VR experiences.`,
};

// Timeline/Milestones - Add or modify as needed
const milestones = [
  { 
    title: "Research & Concept Development", 
    status: "complete" as const,
    date: "September 2025",
    description: "Completed initial research and concept validation"
  },
  { 
    title: "Hardware Integration Testing", 
    status: "complete" as const,
    date: "October 2025",
    description: "Successfully integrated VR hardware components"
  },
  { 
    title: "Physics Engine Development", 
    status: "complete" as const,
    date: "November 2025",
    description: "Developed core physics simulation algorithms"
  },
  { 
    title: "VR Environment Design", 
    status: "in-progress" as const,
    date: "December 2025 - January 2026",
    description: "Creating immersive space environments"
  },
  { 
    title: "User Testing & Validation", 
    status: "upcoming" as const,
    date: "February 2026",
    description: "Conducting user testing sessions"
  },
  { 
    title: "NASA CDR Presentation", 
    status: "upcoming" as const,
    date: "March 2026",
    description: "Final presentation to NASA judges"
  },
];

// Key Features - Add your project features here
const features = [
  {
    title: "Realistic Physics",
    description: "Accurate gravity simulation based on real NASA data and physics models."
  },
  {
    title: "Immersive VR",
    description: "Full 360° virtual reality experience with intuitive controls."
  },
  {
    title: "Multiple Environments",
    description: "Simulate gravity on Moon, Mars, ISS, and other celestial bodies."
  },
  {
    title: "Training Modules",
    description: "Structured training scenarios for astronaut preparation."
  },
];

// Project Stats
const stats = [
  { value: "5", label: "Team Members" },
  { value: "200+", label: "Development Hours" },
  { value: "99.7%", label: "Physics Accuracy" },
  { value: "6", label: "Environments" },
];

// ============================================
// Component Code Below
// ============================================

const Project = () => {
  const getStatusIcon = (status: "complete" | "in-progress" | "upcoming") => {
    switch (status) {
      case "complete":
        return <CheckCircle2 className="w-5 h-5 text-primary" />;
      case "in-progress":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "upcoming":
        return <Circle className="w-5 h-5 text-muted-foreground" />;
    }
  };

  const getStatusStyle = (status: "complete" | "in-progress" | "upcoming") => {
    switch (status) {
      case "complete":
        return "bg-primary/20 border-primary/30";
      case "in-progress":
        return "bg-yellow-500/20 border-yellow-500/30 animate-pulse";
      case "upcoming":
        return "bg-muted border-muted-foreground/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="absolute inset-0 star-field opacity-30" />
        <div className="container mx-auto px-6 relative z-10">
          <Link to="/">
            <Button variant="ghost" className="mb-8 gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-medium mb-4 block">{projectOverview.subtitle}</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              {projectOverview.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {projectOverview.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <p className="font-display text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
              Key <span className="gradient-text">Features</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="glass-card p-6"
                >
                  <h3 className="font-display text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 star-field opacity-20" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-12 text-center">
              Project <span className="gradient-text">Timeline</span>
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  className={`glass-card p-6 border-l-4 ${getStatusStyle(milestone.status)}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      {getStatusIcon(milestone.status)}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                        <h3 className="font-display text-lg font-semibold">{milestone.title}</h3>
                        <span className="text-sm text-muted-foreground">{milestone.date}</span>
                      </div>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add More Sections Here - Copy the pattern above */}
      
      <Footer />
    </div>
  );
};

export default Project;

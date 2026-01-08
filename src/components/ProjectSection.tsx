import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const milestones = [
  { title: "Research & Concept Development", status: "complete" },
  { title: "Hardware Integration Testing", status: "complete" },
  { title: "Physics Engine Development", status: "complete" },
  { title: "VR Environment Design", status: "in-progress" },
  { title: "User Testing & Validation", status: "upcoming" },
  { title: "NASA CDR Presentation", status: "upcoming" },
];

export const ProjectSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="project" className="py-24 relative bg-background">
      <div className="absolute inset-0 star-field opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">
              Project <span className="gradient-text">Timeline</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Our team is working diligently to deliver an innovative VR gravity 
              simulation system. Here's where we are in our development journey.
            </p>

            <div className="space-y-4">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    milestone.status === 'complete' 
                      ? 'bg-primary/20' 
                      : milestone.status === 'in-progress'
                        ? 'bg-yellow-500/20 animate-pulse'
                        : 'bg-muted'
                  }`}>
                    {milestone.status === 'complete' ? (
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    ) : milestone.status === 'in-progress' ? (
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-muted-foreground/50" />
                    )}
                  </div>
                  <span className={`font-medium ${
                    milestone.status === 'upcoming' ? 'text-muted-foreground' : ''
                  }`}>
                    {milestone.title}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "5", label: "Team Members" },
              { value: "200+", label: "Hours Development" },
              { value: "99.7%", label: "Physics Accuracy" },
              { value: "2026", label: "Competition Year" },
            ].map((stat, index) => (
              <div key={stat.label} className="glass-card p-6 text-center">
                <p className="font-display text-4xl font-bold gradient-text mb-2">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

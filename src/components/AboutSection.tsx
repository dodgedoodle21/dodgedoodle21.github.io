import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Orbit, Glasses, Brain, Gauge } from "lucide-react";

const features = [
  {
    icon: Orbit,
    title: "Realistic Physics",
    description: "Experience true microgravity physics with our advanced simulation engine.",
  },
  {
    icon: Glasses,
    title: "Immersive VR",
    description: "Full 360° VR environment that replicates the ISS and space conditions.",
  },
  {
    icon: Brain,
    title: "Virtual Playground",
    description: "An open sandbox environment to freely experiment with zero-gravity interactions and scenarios.",
  },
  {
    icon: Gauge,
    title: "Real-time Metrics",
    description: "Track G-forces, realistic HUD overlays, and live mission telemetry data.",
  },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative bg-space-gradient">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            About the <span className="gradient-text">Project</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our NASA HUNCH project develops cutting-edge VR technology to simulate 
            zero-gravity environments for astronaut training and research.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 hover:border-primary/50 transition-all duration-300 group"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";

const team = [
  {
    name: "Aiden McKnight",
    role: "Team Lead, Safety Officer, Documentation",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aiden",
  },
  {
    name: "Ruby Melton",
    role: "Design Lead, Failure Analyst",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ruby",
  },
  {
    name: "Cody Penman",
    role: "Documentation Lead, Social Media",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cody",
  },
  {
    name: "Alex Shores",
    role: "Quality Control, Materials Manager",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
  },
  {
    name: "Ben Bacon",
    role: "Programming Lead, Fabrication Lead",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ben",
  },
];

export const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="team" className="py-24 relative bg-space-gradient">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Meet Our <span className="gradient-text">Team</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A dedicated group of students passionate about space technology and virtual reality.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card p-6 text-center group hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-muted border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-display font-semibold text-lg">{member.name}</h3>
              <p className="text-sm text-primary mb-4">{member.role}</p>
              <div className="flex justify-center gap-3">
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

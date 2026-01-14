import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import teamLogo from "@/assets/team-logo.png";
const team = [{
  name: "Aiden McKnight",
  role: "Team Lead, Safety Officer, Documentation",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=aiden"
}, {
  name: "Ruby Melton",
  role: "Design Lead, Failure Analyst",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ruby"
}, {
  name: "Cody Penman",
  role: "Documentation Lead, Social Media",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=cody"
}, {
  name: "Alex Shores",
  role: "Quality Control, Materials Manager",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex"
}, {
  name: "Ben Bacon",
  role: "Programming Lead, Fabrication Lead",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ben"
}];
export const TeamSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="team" className="py-24 relative bg-space-gradient">
      
    </section>;
};
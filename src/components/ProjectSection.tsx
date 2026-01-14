import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2 } from "lucide-react";
const milestones = [{
  title: "Research & Concept Development",
  status: "complete"
}, {
  title: "Hardware Integration Testing",
  status: "complete"
}, {
  title: "Physics Engine Development",
  status: "complete"
}, {
  title: "VR Environment Design",
  status: "in-progress"
}, {
  title: "User Testing & Validation",
  status: "upcoming"
}, {
  title: "NASA CDR Presentation",
  status: "upcoming"
}];
export const ProjectSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="project" className="py-24 relative bg-background">
      <div className="absolute inset-0 star-field opacity-30 my-0 py-0" />
      
      <div className="container mx-auto px-6 relative z-10">
        
      </div>
    </section>;
};
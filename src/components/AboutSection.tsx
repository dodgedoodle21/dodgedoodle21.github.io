import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Orbit, Glasses, Brain, Gauge } from "lucide-react";
const features = [{
  icon: Orbit,
  title: "Realistic Physics",
  description: "Experience true microgravity physics with our advanced simulation engine."
}, {
  icon: Glasses,
  title: "Immersive VR",
  description: "Full 360° VR environment that replicates the ISS and space conditions."
}, {
  icon: Brain,
  title: "Adaptive Training",
  description: "AI-driven scenarios that adapt to trainee skill levels and progress."
}, {
  icon: Gauge,
  title: "Real-time Metrics",
  description: "Track performance, reaction times, and mission completion rates."
}];
export const AboutSection = () => {
  return <section id="about" className="py-24 relative bg-background" />;
};
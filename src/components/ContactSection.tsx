import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MapPin, School } from "lucide-react";
export const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="contact" className="py-24 relative bg-background">
      <div className="absolute inset-0 star-field opacity-30" />
      
      
    </section>;
};
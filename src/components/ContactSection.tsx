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
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div ref={ref} initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6
      }} className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-muted-foreground mb-10">
            Interested in our project? Have questions about NASA HUNCH? 
            We'd love to hear from you.
          </p>

          <div className="glass-card p-8 mb-10">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">eriehsvrsim@gmail.com</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <School className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">School</p>
                <p className="font-medium">Erie High School</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">United States</p>
              </div>
            </div>
          </div>

          <Button size="lg" className="rounded-full glow-primary group">
            Contact Us
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>;
};
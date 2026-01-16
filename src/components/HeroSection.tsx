import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-space.jpg";
export const HeroSection = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-space-gradient">
      {/* Star field overlay */}
      <div className="absolute inset-0 star-field opacity-50" />
      
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{
      animationDelay: '1s'
    }} />

      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          delay: 0.2
        }} className="text-center lg:text-left">
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
              NASA HUNCH 2026
            </motion.div>

            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              VR Simulated
              <br />
              <span className="gradient-text">Gravity</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-xl mb-8 mx-auto lg:mx-0">
              Experience zero gravity training like never before. Our VR simulation 
              prepares astronauts for the challenges of space through immersive, 
              physics-accurate environments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="rounded-full glow-primary group">
                <Link to="/project">
                  Explore Project
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-glass-border hover:bg-card/50">
                <a href="https://www.canva.com/design/DAG19fplWQU/4L1Cb8-_wtygj4lOBsIlfg/edit?utm_content=DAG19fplWQU&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton" target="_blank" rel="noopener noreferrer">
                  <Play className="mr-2 w-4 h-4" />
                  CDR Presentation
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} transition={{
          duration: 0.8,
          delay: 0.4
        }} className="relative">
            <div className="relative rounded-2xl overflow-hidden glass-card p-2 floating-element">
              <img src={heroImage} alt="VR Gravity Simulation - Astronaut in space with VR headset" className="w-full h-auto rounded-xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent rounded-xl" />
            </div>
            
            {/* Floating stats card */}
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.6,
            delay: 0.8
          }} className="absolute -bottom-6 -left-6 glass-card p-4 rounded-xl">
              <p className="text-3xl font-display font-bold gradient-text">99.7%</p>
              <p className="text-sm text-muted-foreground">Physics Accuracy</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>;
};
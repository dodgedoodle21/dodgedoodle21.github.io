import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TestingData = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

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
            <span className="text-primary font-medium mb-4 block">Research & Validation</span>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Testing Data
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our collected testing data, experiment results, and validation metrics for the VR Gravity Simulation project.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-12 text-center"
          >
            <p className="text-muted-foreground text-lg">
              Testing data and results will be added here as experiments are conducted.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TestingData;

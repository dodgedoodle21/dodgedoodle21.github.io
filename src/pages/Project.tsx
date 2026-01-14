import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const Project = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Background Section - Add your content here */}
      <section className="pt-32 pb-16 relative min-h-[80vh]">
        <div className="absolute inset-0 star-field opacity-30" />
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </section>
      
      <Footer />
    </div>
  );
};

export default Project;

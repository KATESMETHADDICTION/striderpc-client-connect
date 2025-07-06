
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import FeaturedBuilds from "@/components/FeaturedBuilds";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <FeaturedBuilds />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

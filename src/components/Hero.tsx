
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

const Hero = () => {
  const handleBuildPC = () => {
    // Scroll to Services section
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGetSupport = () => {
    // Scroll to Contact section
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900"></div>
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <div className="flex items-center justify-center mb-6">
          <Zap className="w-12 h-12 text-cyan-400 mr-3" />
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            Strider<span className="text-cyan-400">PC's</span>
          </h1>
        </div>
        
        <h2 className="text-2xl md:text-3xl text-gray-300 mb-6 font-light">
          Custom Gaming Rigs & Professional Support
        </h2>
        
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          We build high-performance custom computers, offer premium prebuilt systems, 
          and provide expert 1-on-1 support with affordable repair services.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 text-lg"
            onClick={handleBuildPC}
          >
            Build Your PC
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 px-8 py-4 text-lg"
            onClick={handleGetSupport}
          >
            Get Support
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;

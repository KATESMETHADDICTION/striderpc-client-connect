
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Monitor, Wrench, Headphones, Package } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Monitor className="w-12 h-12 text-cyan-400" />,
      title: "Custom PC Builds",
      description: "Tailored gaming rigs and workstations built to your exact specifications and budget.",
      features: ["Performance optimized", "Latest components", "Warranty included", "Stress tested"]
    },
    {
      icon: <Package className="w-12 h-12 text-blue-400" />,
      title: "Prebuilt Systems",
      description: "Ready-to-ship computers for gaming, productivity, and specialized workloads.",
      features: ["Immediate availability", "Tested & certified", "Multiple configurations", "Best value picks"]
    },
    {
      icon: <Wrench className="w-12 h-12 text-green-400" />,
      title: "Repairs & Upgrades",
      description: "Professional computer repair services and component upgrades at competitive prices.",
      features: ["Quick diagnostics", "Transparent pricing", "Quality parts", "Data recovery"]
    },
    {
      icon: <Headphones className="w-12 h-12 text-purple-400" />,
      title: "1-on-1 Support",
      description: "Personalized technical support and consultation for all your computing needs.",
      features: ["Expert guidance", "Remote assistance", "Setup help", "Ongoing support"]
    }
  ];

  return (
    <section className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need for your computing journey, from custom builds to ongoing support
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="bg-slate-900/50 border-slate-700 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-white text-xl">{service.title}</CardTitle>
                <CardDescription className="text-gray-400">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-300 text-sm flex items-center">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;

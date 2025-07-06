
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const FeaturedBuilds = () => {
  const builds = [
    {
      name: "Gaming Beast",
      category: "High-End Gaming",
      price: "$2,499",
      specs: ["RTX 4080", "AMD Ryzen 7 7800X3D", "32GB DDR5", "1TB NVMe SSD"],
      image: "🎮",
      badge: "Most Popular"
    },
    {
      name: "Workstation Pro",
      category: "Content Creation",
      price: "$3,299",
      specs: ["RTX 4090", "Intel i9-13900K", "64GB DDR5", "2TB NVMe SSD"],
      image: "💼",
      badge: "Pro Choice"
    },
    {
      name: "Budget Builder",
      category: "Entry Level",
      price: "$899",
      specs: ["RTX 4060", "AMD Ryzen 5 7600", "16GB DDR5", "500GB NVMe SSD"],
      image: "💡",
      badge: "Best Value"
    }
  ];

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured Builds
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Explore our most popular configurations or let us build something custom for you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {builds.map((build, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-600 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105">
              <CardHeader className="text-center">
                <div className="relative mb-4">
                  <div className="text-6xl mb-4">{build.image}</div>
                  <Badge className="absolute top-0 right-0 bg-cyan-500 text-white">
                    {build.badge}
                  </Badge>
                </div>
                <CardTitle className="text-white text-2xl">{build.name}</CardTitle>
                <CardDescription className="text-gray-400 text-lg">
                  {build.category}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <span className="text-3xl font-bold text-cyan-400">{build.price}</span>
                  <p className="text-gray-400 text-sm">Starting from</p>
                </div>
                
                <div className="space-y-2">
                  {build.specs.map((spec, idx) => (
                    <div key={idx} className="flex items-center text-gray-300 text-sm">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></div>
                      {spec}
                    </div>
                  ))}
                </div>
                
                <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                  Customize Build
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedBuilds;

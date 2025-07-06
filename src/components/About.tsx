
import { Shield, Award, Users, Clock } from "lucide-react";

const About = () => {
  const stats = [
    { icon: <Users className="w-8 h-8" />, number: "500+", label: "Happy Customers" },
    { icon: <Award className="w-8 h-8" />, number: "5+", label: "Years Experience" },
    { icon: <Shield className="w-8 h-8" />, number: "99%", label: "Success Rate" },
    { icon: <Clock className="w-8 h-8" />, number: "24/7", label: "Support Available" }
  ];

  return (
    <section className="py-20 bg-slate-700">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose StriderPC's?
            </h2>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              We're passionate PC enthusiasts who understand that every user has unique needs. 
              Whether you're a competitive gamer, content creator, or business professional, 
              we deliver personalized solutions that exceed expectations.
            </p>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Our commitment goes beyond just building computers - we provide ongoing support, 
              honest advice, and transparent pricing. Your success is our success.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center text-cyan-400 mb-2">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-slate-800/50 p-8 rounded-lg border border-slate-600">
            <h3 className="text-2xl font-bold text-white mb-6">Our Promise</h3>
            <ul className="space-y-4">
              {[
                "Quality components from trusted brands",
                "Competitive pricing with no hidden fees",
                "Comprehensive testing before delivery",
                "Responsive customer support",
                "Warranty coverage on all builds",
                "Free consultation and advice"
              ].map((promise, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full mr-4"></div>
                  {promise}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

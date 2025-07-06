
import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <Zap className="w-8 h-8 text-cyan-400 mr-2" />
              <span className="text-2xl font-bold text-white">
                Strider<span className="text-cyan-400">PC's</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Building high-performance custom computers and providing expert support 
              to help you achieve your computing goals.
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 StriderPC's. All rights reserved.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Custom PC Builds</li>
              <li>Prebuilt Systems</li>
              <li>Computer Repairs</li>
              <li>Technical Support</li>
              <li>Upgrades</li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Contact Us</li>
              <li>Warranty Info</li>
              <li>FAQ</li>
              <li>Live Chat</li>
              <li>Remote Support</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

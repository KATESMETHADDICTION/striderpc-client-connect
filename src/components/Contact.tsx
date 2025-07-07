import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Ready to build your dream PC or need support? We're here to help every step of the way.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-gray-300">
                  <Phone className="w-6 h-6 text-cyan-400" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                  <Mail className="w-6 h-6 text-cyan-400" />
                  <span>support@striderpc.com</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                  <MapPin className="w-6 h-6 text-cyan-400" />
                  <span>123 Tech Street, Silicon Valley, CA</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300">
                  <MessageCircle className="w-6 h-6 text-cyan-400" />
                  <span>Live chat available 9 AM - 6 PM PST</span>
                </div>
              </div>
            </div>
            
            <Card className="bg-slate-900/50 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white">Business Hours</CardTitle>
                <CardDescription className="text-gray-400">
                  When you can reach us for immediate assistance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-slate-900/50 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white">Send us a Message</CardTitle>
              <CardDescription className="text-gray-400">
                Tell us about your project or support needs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Your Name" className="bg-slate-800 border-slate-600 text-white" />
                <Input type="email" placeholder="Email Address" className="bg-slate-800 border-slate-600 text-white" />
              </div>
              <Input placeholder="Phone Number (Optional)" className="bg-slate-800 border-slate-600 text-white" />
              <select className="w-full p-3 bg-slate-800 border border-slate-600 rounded-md text-white">
                <option>Select Service Type</option>
                <option>Custom PC Build</option>
                <option>Prebuilt System</option>
                <option>Repair Service</option>
                <option>Technical Support</option>
                <option>General Inquiry</option>
              </select>
              <Textarea 
                placeholder="Tell us about your needs, budget, or the issue you're experiencing..."
                className="bg-slate-800 border-slate-600 text-white min-h-32"
              />
              <Button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white">
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;

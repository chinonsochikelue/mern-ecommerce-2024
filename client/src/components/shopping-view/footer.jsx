import { Button } from "../ui/button";
import { Scissors, MapPin, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Logo from "../common/logo";
import { useNavigate } from "react-router-dom";

function ShoppingFooter() {
  const navigate = useNavigate();

  return (
    <footer className="bg-white border-t">
      {/* Bespoke Custom Tailoring Cta Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl relative group min-h-[400px] flex items-center">
          <div className="absolute inset-0 opacity-40 group-hover:scale-105 transition-transform duration-700">
            <img
              src="https://images.unsplash.com/photo-1593032465106-4c7499690f05?w=1200&auto=format&fit=crop&q=80"
              alt="Bespoke Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

          <div className="relative z-10 p-8 md:p-16 max-w-2xl text-white">
            <div className="flex items-center gap-3 mb-6">
              <Scissors className="w-8 h-8 text-yellow-500" />
              <span className="text-yellow-500 font-bold uppercase tracking-widest text-sm">
                Bespoke Excellence
              </span>
            </div>
            <h2
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Custom Fit for the Extraordinary
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Work directly with our master designers to create unique formalwear
              that fits perfectly and matches your specific aesthetic. From
              high-profile events to personalized local consultations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => navigate("/shop/bespoke")}
                className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold px-8 py-6 rounded-none text-lg"
              >
                Explore Bespoke
              </Button>
              <div className="flex items-center gap-2 text-gray-400 px-4">
                <MapPin className="w-5 h-5" />
                <span className="text-sm">
                  Available in Mississippi: Jackson, Madison, Biloxi & more
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Standard Footer Bottom Section */}
      <div className="bg-gray-50 py-12 border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 items-start">
            <div className="col-span-1 md:col-span-2">
              <Logo className="mb-6 scale-125 origin-left" />
              <p className="text-gray-600 max-w-sm">
                Redefining luxury through master craftsmanship and personalized service. Your vision, expertly tailored.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-gray-800">Quick Links</h4>
              <ul className="space-y-2 text-gray-600">
                <li className="hover:text-yellow-700 cursor-pointer" onClick={() => navigate("/shop/home")}>Home</li>
                <li className="hover:text-yellow-700 cursor-pointer" onClick={() => navigate("/shop/listing")}>Collections</li>
                <li className="hover:text-yellow-700 cursor-pointer" onClick={() => navigate("/shop/bespoke")}>Bespoke Service</li>
                <li className="hover:text-yellow-700 cursor-pointer" onClick={() => navigate("/shop/search")}>Search</li>
              </ul>
            </div>
          </div>
          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© 2026 Bespoke. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <span className="hover:text-gray-800 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gray-800 cursor-pointer">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default ShoppingFooter;

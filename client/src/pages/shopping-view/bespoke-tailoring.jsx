import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Scissors, MapPin, UserCheck, Sparkles, Ruler, Award, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BespokeTailoring() {
  const navigate = useNavigate();

  const mississippiLocations = [
    "Jackson",
    "Ridgeland",
    "Madison",
    "Southaven",
    "Biloxi",
  ];

  const features = [
    {
      icon: Ruler,
      title: "Perfect Fit",
      description: "Every suit is crafted to your exact proportions, ensuring a silhouette that's uniquely yours.",
    },
    {
      icon: Star,
      title: "Public Figure Expertise",
      description: "Trusted by public figures and celebrities to create statement pieces for the world stage.",
    },
    {
      icon: Scissors,
      title: "Handcrafted Detail",
      description: "Decades of tailoring tradition meet modern aesthetics in every stitch and seam.",
    },
    {
      icon: Award,
      title: "Premium Materials",
      description: "Access to the world's most exclusive fabric mills, from Super 180s wool to pure silk.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1593032465175-481ac7f401a0?w=1600&auto=format&fit=crop&q=80"
            alt="Tailoring"
            className="w-full h-full object-cover opacity-90 shadow-2xl"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000" style={{fontFamily: 'Georgia, serif'}}>
            Mastery in Every Stitch
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8 font-light italic">
            "The Bespoke Suit: An extension of your personality, crafted for the world to see."
          </p>
          <Button 
            className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-6 text-lg rounded-none transition-all duration-300"
            onClick={() => navigate("/shop/listing")}
          >
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Craftsmanship Section */}
      <section className="py-24 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{fontFamily: 'Georgia, serif'}}>
            The Bespoke Experience
          </h2>
          <div className="w-24 h-1 bg-yellow-600 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-gray-50 flex items-center justify-center rounded-full mb-6 group-hover:bg-yellow-600 transition-colors duration-300">
                <feature.icon className="w-8 h-8 text-yellow-700 group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Local Tailors Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gray-900" style={{fontFamily: 'Georgia, serif'}}>
              Tailoring Excellence in Mississippi
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              While we work directly with public figures on national platforms, our heart lies in local craftsmanship. In Mississippi, we've partnered with the finest custom suit designers to bring metropolitan luxury to your doorstep.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              {mississippiLocations.map((city) => (
                <div key={city} className="flex items-center gap-2 bg-white px-4 py-2 border border-gray-200 shadow-sm hover:border-yellow-600 transition-colors">
                  <MapPin className="w-4 h-4 text-yellow-600" />
                  <span className="font-semibold text-gray-700">{city}</span>
                </div>
              ))}
            </div>
            <p className="text-gray-600 italic">
              "Though they might not have celebrity clients, our Mississippi partners provide the exact same personalized service and obsessive attention to detail expected by the elite."
            </p>
          </div>
          <div className="relative">
             <div className="absolute -top-4 -left-4 w-full h-full border-2 border-yellow-600/20" />
             <img 
               src="https://plus.unsplash.com/premium_photo-1683129663272-6a157e9c493c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
               alt="Tailor Working" 
               className="relative z-10 w-full h-auto shadow-2xl"
             />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center bg-white px-4">
        <Sparkles className="w-12 h-12 text-yellow-600 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-6 text-gray-900" style={{fontFamily: 'Georgia, serif'}}>
          Ready for your transformation?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Book a consultation with our custom suit designers today. Whether for a wedding, a gala, or your daily business, we ensure you look your absolute best.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            className="bg-gray-900 text-white hover:bg-gray-800 px-10 py-6 text-lg transition-all"
            onClick={() => navigate("/shop/search")}
          >
            Find a Designer
          </Button>
          <Button 
            variant="outline"
            className="border-gray-900 text-gray-900 hover:bg-gray-50 px-10 py-6 text-lg transition-all"
            onClick={() => navigate("/shop/listing")}
          >
            Browse Samples
          </Button>
        </div>
      </section>
    </div>
  );
}

export default BespokeTailoring;

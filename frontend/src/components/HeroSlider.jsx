import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

const slides = [
    {
      id: 1,
      title: "Winter Sale Up To 50% Off",
      description: "Discover our cozy winter collection with amazing discounts",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "Summer Collection 2025",
      description: "Explore fresh styles for the perfect summer look",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      title: "New Year Special Offers",
      description: "Start your year with amazing deals on trending fashion",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
  ];
function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
  
      return () => clearInterval(timer);
    }, []);
    return (
        <div className="relative bg-gray-900 h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("${slide.image}")`,
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
            <div className="text-white max-w-xl">
              <h1 className="text-5xl font-bold mb-6">{slide.title}</h1>
              <p className="text-xl mb-8">{slide.description}</p>
              <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-semibold flex items-center space-x-2 hover:bg-gray-100 transition duration-300">
                <span>Shop Now</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      ))}
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
    )
}

export default HeroSlider

import { Button } from "@/components/ui/button";
import { ArrowDown, Heart, Users, Shield } from "lucide-react";
import heroImage from "@/assets/hero-autism-support.jpg";

const HeroSection = () => {
  const scrollToAbout = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToContact = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden bg-gradient-support">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-autism-blue-light rounded-full opacity-60 animate-gentle-float" />
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-hope-green-light rounded-full opacity-60 animate-gentle-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-warm-orange-light rounded-full opacity-60 animate-gentle-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
            Juntos <span className="bg-gradient-hero bg-clip-text text-transparent">Pelo</span>
            <br />
            <span className="text-primary">Autismo</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Oferecemos recursos, orientação e uma comunidade acolhedora para pessoas com autismo, 
            suas famílias e cuidadores. Juntos, construímos um mundo mais inclusivo.
          </p>

          {/* Key Features */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
              <Heart className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Apoio Especializado</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
              <Users className="w-5 h-5 text-hope-green" />
              <span className="text-sm font-medium">Comunidade Unida</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-soft">
              <Shield className="w-5 h-5 text-warm-orange" />
              <span className="text-sm font-medium">Ambiente Seguro</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="hero"
              size="lg"
              onClick={scrollToContact}
              className="text-lg px-8 py-6"
            >
              Buscar Apoio Agora
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={scrollToAbout}
              className="text-lg px-8 py-6 bg-white/80 backdrop-blur-sm hover:bg-white/90"
            >
              Saiba Mais
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-16 flex justify-center">
            <button
              onClick={scrollToAbout}
              className="text-muted-foreground hover:text-primary transition-colors duration-300 animate-pulse-soft"
            >
              <ArrowDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
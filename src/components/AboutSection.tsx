import { Card, CardContent } from "@/components/ui/card";
import { Brain, Heart, Lightbulb, Users } from "lucide-react";

const AboutSection = () => {
  const features = [
    {
      icon: Brain,
      title: "Entendimento",
      description: "Compreendemos as necessidades únicas de cada pessoa no espectro autista.",
      color: "autism-blue"
    },
    {
      icon: Heart,
      title: "Empatia",
      description: "Oferecemos um ambiente acolhedor e sem julgamentos para todos.",
      color: "warm-orange"
    },
    {
      icon: Lightbulb,
      title: "Orientação",
      description: "Fornecemos recursos e estratégias práticas para o dia a dia.",
      color: "hope-green"
    },
    {
      icon: Users,
      title: "Comunidade",
      description: "Conectamos famílias e cuidadores em uma rede de apoio forte.",
      color: "calm-purple"
    }
  ];

  const facts = [
    {
      number: "1 em 100",
      description: "Crianças são diagnosticadas com autismo no Brasil"
    },
    {
      number: "500+",
      description: "Famílias já atendidas por nossos serviços"
    },
    {
      number: "15 anos",
      description: "De experiência em apoio especializado"
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sobre o <span className="text-primary">Autismo</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            O Transtorno do Espectro Autista (TEA) é uma condição neurológica que afeta o desenvolvimento, 
            mas com o apoio adequado, pessoas com autismo podem viver vidas plenas e significativas.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={feature.title} 
                className="text-center p-6 hover:shadow-card transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-${feature.color}-light`}>
                    <IconComponent className={`w-8 h-8 text-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="animate-fade-in-up">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Características do Autismo
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Comunicação:</strong> Dificuldades na comunicação verbal e não-verbal
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-hope-green rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Interação Social:</strong> Desafios em relacionamentos e interações sociais
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-warm-orange rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Comportamentos:</strong> Padrões repetitivos e interesses específicos
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-calm-purple rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Sensibilidade:</strong> Sensibilidades sensoriais únicas
                </p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-autism-blue-light rounded-lg">
              <p className="text-foreground font-medium text-center">
                "Cada pessoa com autismo é única, com suas próprias forças, desafios e potenciais."
              </p>
            </div>
          </div>

          {/* Right Stats */}
          <div className="animate-fade-in-up">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
              Nosso Impacto
            </h3>
            <div className="space-y-6">
              {facts.map((fact, index) => (
                <div 
                  key={fact.number}
                  className="flex items-center gap-4 p-4 bg-gradient-warm rounded-lg shadow-soft"
                >
                  <div className="text-3xl font-bold text-primary">
                    {fact.number}
                  </div>
                  <div className="text-foreground">
                    {fact.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
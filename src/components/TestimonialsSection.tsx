import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Mãe do Gabriel, 8 anos",
      content: "Encontrar este apoio foi transformador para nossa família. Gabriel desenvolveu muito sua comunicação e hoje participa ativamente da escola. A equipe sempre nos orientou com muito carinho e profissionalismo.",
      avatar: "MS"
    },
    {
      name: "João Santos",
      role: "Pai da Ana, 12 anos",
      content: "Os recursos e orientações que recebemos aqui fizeram toda a diferença. Ana agora tem rotinas bem estabelecidas e conseguiu fazer amigos na escola. Somos muito gratos por todo o suporte.",
      avatar: "JS"
    },
    {
      name: "Dra. Carla Mendes",
      role: "Psicóloga Especialista",
      content: "Como profissional, recomendo este trabalho. A abordagem é humanizada e baseada em evidências científicas. As famílias recebem o suporte integral que merecem.",
      avatar: "CM"
    },
    {
      name: "Roberto Oliveira",
      role: "Educador e pai do Lucas, 15 anos",
      content: "O apoio que recebemos não foi apenas para o Lucas, mas para toda nossa família. Aprendemos a entender melhor suas necessidades e hoje ele está no ensino médio com excelente desempenho.",
      avatar: "RO"
    },
    {
      name: "Sandra Costa",
      role: "Mãe da Júlia, 6 anos",
      content: "Júlia era muito retraída e hoje ela brinca, se comunica e demonstra alegria todos os dias. O trabalho de vocês mudou nossa vida. Obrigada por não desistirem dela.",
      avatar: "SC"
    },
    {
      name: "Prof. André Lima",
      role: "Terapeuta Ocupacional",
      content: "A metodologia aplicada aqui é excepcional. Vejo crianças e adolescentes desenvolvendo autonomia e confiança. É muito gratificante fazer parte desta equipe.",
      avatar: "AL"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Histórias de <span className="text-primary">Sucesso</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Conheça algumas das famílias que encontraram esperança, orientação e crescimento 
            através de nossos serviços de apoio especializados.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.name}
              className="p-6 hover:shadow-card transition-all duration-300 transform hover:scale-[1.02] animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-0">
                {/* Quote Icon */}
                <div className="mb-4">
                  <Quote className="w-8 h-8 text-primary opacity-50" />
                </div>

                {/* Testimonial Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center p-6 bg-autism-blue-light rounded-lg animate-fade-in-up">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <p className="text-sm text-muted-foreground">Famílias Satisfeitas</p>
          </div>
          <div className="text-center p-6 bg-hope-green-light rounded-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="text-3xl font-bold text-hope-green mb-2">500+</div>
            <p className="text-sm text-muted-foreground">Crianças Atendidas</p>
          </div>
          <div className="text-center p-6 bg-warm-orange-light rounded-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold text-warm-orange mb-2">15</div>
            <p className="text-sm text-muted-foreground">Anos de Experiência</p>
          </div>
          <div className="text-center p-6 bg-calm-purple-light rounded-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="text-3xl font-bold text-calm-purple mb-2">24/7</div>
            <p className="text-sm text-muted-foreground">Suporte Disponível</p>
          </div>
        </div>

        {/* Video Testimonial Section */}
       
      </div>
    </section>
  );
};

export default TestimonialsSection;
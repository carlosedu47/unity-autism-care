import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

import { useState, useEffect } from 'react';

interface Testimonial {
  Nome: string;
  Cargo: string;
  Conteudo: string;
  Avatar: string;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchTestimonials();
    fetchStats();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/depoimentos');
      const data = await response.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Erro ao carregar depoimentos:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/estatisticas');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error);
    }
  };

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
              key={testimonial.Nome}
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
                  "{testimonial.Conteudo}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-hero rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.Avatar}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {testimonial.Nome}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.Cargo}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {stats.map((stat: any, index) => (
            <div key={stat.Nome} className={`text-center p-6 bg-${stat.Cor}-light rounded-lg animate-fade-in-up`} style={{ animationDelay: `${index * 0.1}s` }}>
              <div className={`text-3xl font-bold text-${stat.Cor} mb-2`}>{stat.Valor}</div>
              <p className="text-sm text-muted-foreground">{stat.Descricao}</p>
            </div>
          ))}
        </div>

        {/* Video Testimonial Section */}
       
      </div>
    </section>
  );
};

export default TestimonialsSection;
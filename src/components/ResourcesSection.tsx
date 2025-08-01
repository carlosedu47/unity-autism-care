import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Phone, Video, Download, ExternalLink } from "lucide-react";

const ResourcesSection = () => {
  const resources = [
    {
      category: "Guias e Orientações",
      icon: BookOpen,
      color: "autism-blue",
      items: [
        {
          title: "Guia para Pais de Primeira Viagem",
          description: "Informações essenciais para famílias que receberam o diagnóstico recentemente.",
          type: "PDF"
        },
        {
          title: "Estratégias de Comunicação",
          description: "Técnicas práticas para melhorar a comunicação com pessoas no espectro.",
          type: "PDF"
        },
        {
          title: "Rotinas e Estrutura",
          description: "Como criar ambientes previsíveis e organizados em casa e na escola.",
          type: "PDF"
        }
      ]
    },
    {
      category: "Apoio Profissional",
      icon: Phone,
      color: "hope-green",
      items: [
        {
          title: "Consulta com Especialistas",
          description: "Conecte-se com psicólogos e terapeutas especializados em autismo.",
          type: "Agendamento"
        },
        {
          title: "Terapia ABA",
          description: "Análise do Comportamento Aplicada para desenvolvimento de habilidades.",
          type: "Presencial"
        },
        {
          title: "Terapia Ocupacional",
          description: "Desenvolvimento de habilidades motoras e integração sensorial.",
          type: "Presencial"
        }
      ]
    },
    {
      category: "Recursos Online",
      icon: Video,
      color: "warm-orange",
      items: [
        {
          title: "Webinars Educativos",
          description: "Palestras online com especialistas sobre diversos aspectos do autismo.",
          type: "Online"
        },
        {
          title: "Grupos de Apoio Virtual",
          description: "Encontros online para troca de experiências entre famílias.",
          type: "Online"
        },
        {
          title: "Biblioteca Digital",
          description: "Acesso a artigos científicos e estudos atualizados sobre TEA.",
          type: "Online"
        }
      ]
    },
    {
      category: "Atividades e Eventos",
      icon: Calendar,
      color: "calm-purple",
      items: [
        {
          title: "Encontros Familiares",
          description: "Eventos presenciais para socialização e troca de experiências.",
          type: "Evento"
        },
        {
          title: "Oficinas Práticas",
          description: "Workshops sobre temas específicos como alimentação e sono.",
          type: "Workshop"
        },
        {
          title: "Atividades Adaptadas",
          description: "Esportes e recreação em ambientes amigáveis ao autismo.",
          type: "Atividade"
        }
      ]
    }
  ];

  return (
    <section id="resources" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recursos e <span className="text-primary">Apoio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Oferecemos uma ampla gama de recursos, desde orientações práticas até apoio especializado, 
            para ajudar você e sua família em cada etapa da jornada.
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {resources.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.category}
                className="shadow-card hover:shadow-warm transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${category.color}-light`}>
                      <IconComponent className={`w-6 h-6 text-${category.color}`} />
                    </div>
                    <CardTitle className="text-xl text-foreground">
                      {category.category}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.items.map((item, itemIndex) => (
                      <div 
                        key={item.title}
                        className="p-4 bg-background rounded-lg border border-border hover:border-primary/30 transition-colors duration-300"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-1">
                              {item.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mb-3">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${category.color}-light text-${category.color}`}>
                                {item.type}
                              </span>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            className="flex-shrink-0"
                          >
                            {item.type === "PDF" ? (
                              <Download className="w-4 h-4" />
                            ) : item.type === "Online" ? (
                              <ExternalLink className="w-4 h-4" />
                            ) : (
                              <Calendar className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 animate-fade-in-up">
          <div className="bg-gradient-hero p-8 rounded-2xl text-white shadow-card">
            <h3 className="text-2xl font-bold mb-4">
              Precisa de Ajuda Personalizada?
            </h3>
            <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
              Nossa equipe está pronta para oferecer suporte individualizado para suas necessidades específicas.
            </p>
            <Button variant="secondary" size="lg" className="text-lg px-8">
              Falar com Especialista
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
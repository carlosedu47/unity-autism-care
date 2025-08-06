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
          type: "PDF",
          

        },
        
        
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
       
      ]
    },
    {
      category: "Atividades e Eventos",
      icon: Calendar,
      color: "calm-purple",
      items: [
       
        {
          title: "Atividades Adaptadas",
          description: "sugestões de esportes para crianças com autismo",
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
  <a href="https://educapes.capes.gov.br/bitstream/capes/722086/4/Guita%20tutorial%20-%20Autismo%20completo.pdf" target="_blank" rel="noopener noreferrer">
    <ExternalLink className="w-4 h-4" />
  </a>
) : item.type === "Online" ? (
  <a href="https://youtu.be/dgiKusWMulk?si=64KH4Cu9bOHey0lW" target="_blank" rel="noopener noreferrer">
    <ExternalLink className="w-4 h-4" />
  </a>
) : <a href="https://www.esporteeinclusao.com.br/esporte-e-autismo/esportes-criancas-com-autismo/" target="_blank" rel="noopener noreferrer">
  <Calendar className="w-4 h-4" />
</a>}
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
     
      </div>
    </section>
  );
};

export default ResourcesSection;
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Video, ExternalLink } from "lucide-react";

interface ResourceItem {
  title: string;
  description: string;
  type: string;
  url: string;
}

interface ResourceCategory {
  category: string;
  icon: string;
  color: string;
  items: ResourceItem[];
}

interface ContentData {
  resources: ResourceCategory[];
}

const iconMap = {
  BookOpen,
  Calendar,
  Video,
};

const DynamicResourcesSection = () => {
  const [content, setContent] = useState<ContentData | null>(null);

  useEffect(() => {
    fetch('/content.json')
      .then(response => response.json())
      .then(data => setContent(data))
      .catch(error => console.error('Erro ao carregar conteúdo:', error));
  }, []);

  if (!content) {
    return <div>Carregando...</div>;
  }

  return (
    <section id="resources" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recursos e <span className="text-primary">Apoio</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Oferecemos uma ampla gama de recursos, desde orientações práticas até apoio especializado, 
            para ajudar você e sua família em cada etapa da jornada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {content.resources.map((category, categoryIndex) => {
            const IconComponent = iconMap[category.icon as keyof typeof iconMap] || BookOpen;
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
                            asChild
                          >
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="w-4 h-4" />
                            </a>
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
      </div>
    </section>
  );
};

export default DynamicResourcesSection;
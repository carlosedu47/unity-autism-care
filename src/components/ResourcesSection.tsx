import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Calendar, Phone, Video, Download, ExternalLink, FileText } from "lucide-react";

const ResourcesSection = () => {
  const [recursos, setRecursos] = useState([]);

  useEffect(() => {
    fetchRecursos();
    
    // Listener para atualizar quando recursos forem modificados
    const handleStorageChange = () => {
      fetchRecursos();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('recursos-updated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('recursos-updated', handleStorageChange);
    };
  }, []);

  const fetchRecursos = () => {
    const recursos = JSON.parse(localStorage.getItem('recursos') || '[]');
    console.log('Recursos carregados:', recursos);
    const recursosAtivos = recursos.filter((r: any) => r.ativo);
    console.log('Recursos ativos:', recursosAtivos);
    setRecursos(recursosAtivos);
  };

  const getIconByCategory = (categoria: string) => {
    switch (categoria) {
      case 'Educacional': return BookOpen;
      case 'Terapeutico': return Video;
      case 'Familiar': return Calendar;
      case 'Profissional': return FileText;
      default: return FileText;
    }
  };

  const getColorByCategory = (categoria: string) => {
    switch (categoria) {
      case 'Educacional': return 'autism-blue';
      case 'Terapeutico': return 'warm-orange';
      case 'Familiar': return 'hope-green';
      case 'Profissional': return 'calm-purple';
      default: return 'primary';
    }
  };

  const categorias = ['Educacional', 'Terapeutico', 'Familiar', 'Profissional'];
  const resourcesByCategory = categorias.map(categoria => {
    const items = recursos.filter((r: any) => r.categoria === categoria);
    return {
      category: categoria === 'Terapeutico' ? 'Terapêutico' : categoria,
      icon: getIconByCategory(categoria),
      color: getColorByCategory(categoria),
      items
    };
  }).filter(cat => cat.items.length > 0);

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
          {resourcesByCategory.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Nenhum recurso disponível no momento.</p>
            </div>
          ) : (
            resourcesByCategory.map((category, categoryIndex) => {
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
                      {category.items.map((item: any, itemIndex: number) => (
                        <div 
                          key={item.id}
                          className="p-4 bg-background rounded-lg border border-border hover:border-primary/30 transition-colors duration-300"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground mb-1">
                                {item.titulo}
                              </h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                {item.descricao}
                              </p>
                              <div className="flex items-center gap-2">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${category.color}-light text-${category.color}`}>
                                  {item.tipo}
                                </span>
                              </div>
                            </div>
                            {item.url && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                className="flex-shrink-0"
                                onClick={() => {
                                  try {
                                    window.open(item.url, '_blank', 'noopener,noreferrer');
                                  } catch (error) {
                                    console.error('Erro ao abrir link:', error);
                                    window.location.href = item.url;
                                  }
                                }}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>


      </div>
    </section>
  );
};

export default ResourcesSection;
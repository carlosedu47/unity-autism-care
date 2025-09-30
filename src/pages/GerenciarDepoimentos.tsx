import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare, Eye, EyeOff, Check, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "@/utils/notifications";

const GerenciarDepoimentos = () => {
  const [depoimentos, setDepoimentos] = useState([]);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userAuth");
    if (!userData) {
      navigate("/login");
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.Tipo !== 'Admin') {
      navigate("/dashboard");
      return;
    }
    setUser(parsedUser);
    fetchDepoimentos();
  }, []);

  const fetchDepoimentos = () => {
    const depoimentos = JSON.parse(localStorage.getItem('depoimentos') || '[]');
    setDepoimentos(depoimentos.sort((a: any, b: any) => new Date(b.dataEnvio).getTime() - new Date(a.dataEnvio).getTime()));
  };

  const aprovarDepoimento = (id: number) => {
    const depoimentos = JSON.parse(localStorage.getItem('depoimentos') || '[]');
    const depoimentoIndex = depoimentos.findIndex((d: any) => d.id === id);
    
    if (depoimentoIndex !== -1) {
      depoimentos[depoimentoIndex].aprovado = true;
      depoimentos[depoimentoIndex].dataAprovacao = new Date().toISOString();
      localStorage.setItem('depoimentos', JSON.stringify(depoimentos));
      fetchDepoimentos();
      showSuccess("Depoimento aprovado!");
    }
  };

  const rejeitarDepoimento = (id: number) => {
    const depoimentos = JSON.parse(localStorage.getItem('depoimentos') || '[]');
    const novosDepoimentos = depoimentos.filter((d: any) => d.id !== id);
    localStorage.setItem('depoimentos', JSON.stringify(novosDepoimentos));
    fetchDepoimentos();
    showSuccess("Depoimento rejeitado!");
  };

  const toggleVisibilidade = (id: number) => {
    const depoimentos = JSON.parse(localStorage.getItem('depoimentos') || '[]');
    const depoimentoIndex = depoimentos.findIndex((d: any) => d.id === id);
    
    if (depoimentoIndex !== -1) {
      depoimentos[depoimentoIndex].visivel = !depoimentos[depoimentoIndex].visivel;
      localStorage.setItem('depoimentos', JSON.stringify(depoimentos));
      fetchDepoimentos();
      showSuccess(`Depoimento ${depoimentos[depoimentoIndex].visivel ? 'publicado' : 'ocultado'}!`);
    }
  };

  const formatarData = (dataISO: string) => {
    return new Date(dataISO).toLocaleString('pt-BR');
  };

  if (!user) return null;

  const pendentes = depoimentos.filter((d: any) => !d.aprovado);
  const aprovados = depoimentos.filter((d: any) => d.aprovado);

  return (
    <div className="min-h-screen bg-gradient-support">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button onClick={() => navigate("/dashboard")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">Gerenciar Depoimentos</h1>
          <Badge variant="destructive">
            {pendentes.length} pendentes
          </Badge>
          <Badge variant="secondary">
            {aprovados.length} aprovados
          </Badge>
        </div>

        {pendentes.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Depoimentos Pendentes</h2>
            <div className="grid gap-4">
              {pendentes.map((depoimento: any) => (
                <Card key={depoimento.id} className="border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{depoimento.nome}</h3>
                            <p className="text-sm text-muted-foreground">
                              {formatarData(depoimento.dataEnvio)}
                            </p>
                          </div>
                          <Badge variant="outline" className="text-orange-600 border-orange-600">
                            Pendente
                          </Badge>
                        </div>
                        
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md mb-3">
                          "{depoimento.depoimento}"
                        </p>
                        
                        {depoimento.email && (
                          <p className="text-sm text-muted-foreground">
                            Email: {depoimento.email}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => aprovarDepoimento(depoimento.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Aprovar
                        </Button>
                        
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => rejeitarDepoimento(depoimento.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Rejeitar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold mb-4">Depoimentos Aprovados</h2>
          <div className="grid gap-4">
            {aprovados.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhum depoimento aprovado ainda.</p>
                </CardContent>
              </Card>
            ) : (
              aprovados.map((depoimento: any) => (
                <Card key={depoimento.id} className={!depoimento.visivel ? "opacity-60" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <MessageSquare className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{depoimento.nome}</h3>
                            <p className="text-sm text-muted-foreground">
                              Enviado: {formatarData(depoimento.dataEnvio)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Aprovado: {formatarData(depoimento.dataAprovacao)}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="default" className="bg-green-600">
                              Aprovado
                            </Badge>
                            <Badge variant={depoimento.visivel ? "secondary" : "outline"}>
                              {depoimento.visivel ? "Visível" : "Oculto"}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                          "{depoimento.depoimento}"
                        </p>
                      </div>
                      
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleVisibilidade(depoimento.id)}
                        className="ml-4"
                      >
                        {depoimento.visivel ? (
                          <>
                            <EyeOff className="w-4 h-4 mr-1" />
                            Ocultar
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-1" />
                            Publicar
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GerenciarDepoimentos;
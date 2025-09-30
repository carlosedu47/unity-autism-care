import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Mail, Phone, MessageCircle, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "@/utils/notifications";

const GerenciarContatos = () => {
  const [contatos, setContatos] = useState([]);
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
    fetchContatos();
  }, []);

  const fetchContatos = () => {
    const contatos = JSON.parse(localStorage.getItem('contatos') || '[]');
    setContatos(contatos.sort((a: any, b: any) => new Date(b.dataEnvio).getTime() - new Date(a.dataEnvio).getTime()));
  };

  const marcarComoLido = (id: number) => {
    const contatos = JSON.parse(localStorage.getItem('contatos') || '[]');
    const contatoIndex = contatos.findIndex((c: any) => c.id === id);
    
    if (contatoIndex !== -1) {
      contatos[contatoIndex].lido = !contatos[contatoIndex].lido;
      localStorage.setItem('contatos', JSON.stringify(contatos));
      fetchContatos();
      showSuccess(`Contato marcado como ${contatos[contatoIndex].lido ? 'lido' : 'não lido'}!`);
    }
  };

  const formatarData = (dataISO: string) => {
    return new Date(dataISO).toLocaleString('pt-BR');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-support">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button onClick={() => navigate("/dashboard")} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">Gerenciar Contatos</h1>
          <Badge variant="secondary">
            {contatos.filter((c: any) => !c.lido).length} não lidos
          </Badge>
        </div>

        <div className="grid gap-4">
          {contatos.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum contato recebido ainda.</p>
              </CardContent>
            </Card>
          ) : (
            contatos.map((contato: any) => (
              <Card key={contato.id} className={!contato.lido ? "border-primary" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <MessageCircle className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{contato.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {formatarData(contato.dataEnvio)}
                          </p>
                        </div>
                        {!contato.lido && (
                          <Badge variant="destructive" className="ml-2">
                            Novo
                          </Badge>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{contato.email}</span>
                        </div>
                        {contato.phone && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{contato.phone}</span>
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <Badge variant="outline" className="mb-2">
                          {contato.subject}
                        </Badge>
                        <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">
                          {contato.message}
                        </p>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => marcarComoLido(contato.id)}
                      className="ml-4"
                    >
                      {contato.lido ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-1" />
                          Marcar não lido
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-1" />
                          Marcar como lido
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
  );
};

export default GerenciarContatos;
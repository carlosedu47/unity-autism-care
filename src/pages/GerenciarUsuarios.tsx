import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Shield, User, ToggleLeft, ToggleRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
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
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/usuarios');
      const data = await response.json();
      setUsuarios(data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    }
  };

  const alterarTipo = async (id: number, novoTipo: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/usuarios/${id}/tipo`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: novoTipo }),
      });
      
      if (response.ok) {
        fetchUsuarios();
      }
    } catch (error) {
      console.error('Erro ao alterar tipo:', error);
    }
  };

  const alterarStatus = async (id: number, ativo: boolean) => {
    try {
      const response = await fetch(`http://localhost:3001/api/usuarios/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ativo }),
      });
      
      if (response.ok) {
        fetchUsuarios();
      }
    } catch (error) {
      console.error('Erro ao alterar status:', error);
    }
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
          <h1 className="text-3xl font-bold">Gerenciar Usuários</h1>
        </div>

        <div className="grid gap-4">
          {usuarios.map((usuario: any) => (
            <Card key={usuario.Id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      {usuario.Tipo === 'Admin' ? 
                        <Shield className="w-6 h-6 text-red-600" /> : 
                        <User className="w-6 h-6 text-blue-600" />
                      }
                    </div>
                    <div>
                      <h3 className="font-semibold">{usuario.Nome}</h3>
                      <p className="text-sm text-muted-foreground">{usuario.Email}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant={usuario.Tipo === 'Admin' ? 'destructive' : 'default'}>
                          {usuario.Tipo}
                        </Badge>
                        <Badge variant={usuario.Ativo ? 'default' : 'secondary'}>
                          {usuario.Ativo ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alterarTipo(usuario.Id, usuario.Tipo === 'Admin' ? 'Editor' : 'Admin')}
                      disabled={usuario.Id === user.Id}
                    >
                      {usuario.Tipo === 'Admin' ? 'Tornar Editor' : 'Tornar Admin'}
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => alterarStatus(usuario.Id, !usuario.Ativo)}
                      disabled={usuario.Id === user.Id}
                    >
                      {usuario.Ativo ? 
                        <><ToggleRight className="w-4 h-4 mr-1" />Desativar</> : 
                        <><ToggleLeft className="w-4 h-4 mr-1" />Ativar</>
                      }
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GerenciarUsuarios;
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, MessageSquare, FileText, Settings, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showInfo } from "@/utils/notifications";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userAuth");
    if (!userData) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(userData));
    fetchStats();
  }, []);

  const fetchStats = () => {
    const contatos = JSON.parse(localStorage.getItem('contatos') || '[]');
    const recursos = JSON.parse(localStorage.getItem('recursos') || '[]');
    const depoimentos = JSON.parse(localStorage.getItem('depoimentos') || '[]');
    
    const contatosNaoLidos = contatos.filter((c: any) => !c.lido).length;
    const contatos30Dias = contatos.filter((c: any) => {
      const dataContato = new Date(c.dataEnvio);
      const agora = new Date();
      const diferenca = agora.getTime() - dataContato.getTime();
      return diferenca <= (30 * 24 * 60 * 60 * 1000);
    }).length;
    const recursosAtivos = recursos.filter((r: any) => r.ativo).length;
    const depoimentosPendentes = depoimentos.filter((d: any) => !d.aprovado).length;
    
    setStats({
      ContatosPendentes: contatosNaoLidos,
      DepoimentosPendentes: depoimentosPendentes,
      RecursosAtivos: recursosAtivos,
      ContatosUltimos30Dias: contatos30Dias
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-support">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Bem-vindo, {user.Nome}</p>
            <span className={`px-2 py-1 rounded text-xs ${user.Tipo === 'Admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}>
              {user.Tipo === 'Usuario' ? 'Usuário' : user.Tipo}
            </span>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contatos Pendentes</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.ContatosPendentes || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Depoimentos Pendentes</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.DepoimentosPendentes || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recursos Ativos</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.RecursosAtivos || 0}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contatos (30 dias)</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.ContatosUltimos30Dias || 0}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Gerenciar Contatos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Visualizar e responder mensagens recebidas
              </p>
              <Button className="w-full" onClick={() => navigate('/gerenciar-contatos')}>Acessar</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Gerenciar Recursos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Adicionar, editar e organizar recursos
              </p>
              <Button className="w-full" onClick={() => navigate('/gerenciar-recursos')}>Acessar</Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Gerenciar Depoimentos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Aprovar e gerenciar depoimentos
              </p>
              <Button className="w-full" onClick={() => navigate('/gerenciar-depoimentos')}>Acessar</Button>
            </CardContent>
          </Card>

          {user.Tipo === 'Admin' && (
            <Card className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Gerenciar Usuários
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Administrar usuários e permissões
                </p>
                <Button className="w-full" onClick={() => navigate('/gerenciar-usuarios')}>Acessar</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
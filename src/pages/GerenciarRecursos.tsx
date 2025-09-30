import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Trash2, FileText, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { showSuccess } from "@/utils/notifications";

const GerenciarRecursos = () => {
  const [recursos, setRecursos] = useState([]);
  const [user, setUser] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    tipo: "PDF",
    categoria: "Educacional",
    url: "",
    ativo: true
  });
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
    fetchRecursos();
  }, []);

  const fetchRecursos = () => {
    const recursos = JSON.parse(localStorage.getItem('recursos') || '[]');
    setRecursos(recursos.sort((a: any, b: any) => new Date(b.dataCriacao).getTime() - new Date(a.dataCriacao).getTime()));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recursos = JSON.parse(localStorage.getItem('recursos') || '[]');
    
    const novoRecurso = {
      id: Date.now(),
      ...formData,
      dataCriacao: new Date().toISOString(),
      autor: user.Nome
    };
    
    recursos.push(novoRecurso);
    localStorage.setItem('recursos', JSON.stringify(recursos));
    
    // Disparar evento para atualizar outras páginas
    window.dispatchEvent(new Event('recursos-updated'));
    
    setFormData({
      titulo: "",
      descricao: "",
      tipo: "PDF",
      categoria: "Educacional",
      url: "",
      ativo: true
    });
    setShowForm(false);
    fetchRecursos();
    showSuccess("Recurso adicionado com sucesso!");
  };

  const toggleStatus = (id: number) => {
    const recursos = JSON.parse(localStorage.getItem('recursos') || '[]');
    const recursoIndex = recursos.findIndex((r: any) => r.id === id);
    
    if (recursoIndex !== -1) {
      recursos[recursoIndex].ativo = !recursos[recursoIndex].ativo;
      localStorage.setItem('recursos', JSON.stringify(recursos));
      window.dispatchEvent(new Event('recursos-updated'));
      fetchRecursos();
      showSuccess(`Recurso ${recursos[recursoIndex].ativo ? 'ativado' : 'desativado'}!`);
    }
  };

  const deleteRecurso = (id: number) => {
    const recursos = JSON.parse(localStorage.getItem('recursos') || '[]');
    const novosRecursos = recursos.filter((r: any) => r.id !== id);
    localStorage.setItem('recursos', JSON.stringify(novosRecursos));
    window.dispatchEvent(new Event('recursos-updated'));
    fetchRecursos();
    showSuccess("Recurso removido com sucesso!");
  };

  const formatarData = (dataISO: string) => {
    return new Date(dataISO).toLocaleDateString('pt-BR');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-support">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate("/dashboard")} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
            <h1 className="text-3xl font-bold">Gerenciar Recursos</h1>
            <Badge variant="secondary">
              {recursos.filter((r: any) => r.ativo).length} ativos
            </Badge>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="w-4 h-4 mr-2" />
            Novo Recurso
          </Button>
        </div>

        {showForm && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Adicionar Novo Recurso</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Título *</label>
                    <Input
                      required
                      value={formData.titulo}
                      onChange={(e) => setFormData({...formData, titulo: e.target.value})}
                      placeholder="Título do recurso"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Tipo *</label>
                    <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PDF">PDF</SelectItem>
                        <SelectItem value="Video">Vídeo</SelectItem>
                        <SelectItem value="Link">Link</SelectItem>
                        <SelectItem value="Atividade">Atividade</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Categoria *</label>
                    <Select value={formData.categoria} onValueChange={(value) => setFormData({...formData, categoria: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Educacional">Educacional</SelectItem>
                        <SelectItem value="Terapeutico">Terapêutico</SelectItem>
                        <SelectItem value="Familiar">Familiar</SelectItem>
                        <SelectItem value="Profissional">Profissional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">URL/Link</label>
                    <Input
                      value={formData.url}
                      onChange={(e) => setFormData({...formData, url: e.target.value})}
                      placeholder="https://..."
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Descrição *</label>
                  <Textarea
                    required
                    value={formData.descricao}
                    onChange={(e) => setFormData({...formData, descricao: e.target.value})}
                    placeholder="Descrição do recurso"
                    rows={3}
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit">Salvar Recurso</Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-4">
          {recursos.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum recurso cadastrado ainda.</p>
              </CardContent>
            </Card>
          ) : (
            recursos.map((recurso: any) => (
              <Card key={recurso.id} className={!recurso.ativo ? "opacity-60" : ""}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <FileText className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">{recurso.titulo}</h3>
                          <p className="text-sm text-muted-foreground">
                            Por {recurso.autor} • {formatarData(recurso.dataCriacao)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="outline">{recurso.tipo}</Badge>
                          <Badge variant="secondary">{recurso.categoria}</Badge>
                          <Badge variant={recurso.ativo ? "default" : "destructive"}>
                            {recurso.ativo ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">
                        {recurso.descricao}
                      </p>
                      
                      {recurso.url && (
                        <p className="text-sm text-blue-600 break-all">
                          {recurso.url}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex gap-2 ml-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleStatus(recurso.id)}
                      >
                        {recurso.ativo ? (
                          <>
                            <EyeOff className="w-4 h-4 mr-1" />
                            Desativar
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-1" />
                            Ativar
                          </>
                        )}
                      </Button>
                      
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteRecurso(recurso.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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

export default GerenciarRecursos;
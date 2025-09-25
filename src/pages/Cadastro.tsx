import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus, Shield, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    tipo: "Usuario"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateEmail(formData.email)) {
      setError("Email inválido");
      return;
    }

    if (!validatePassword(formData.senha)) {
      setError("Senha deve ter pelo menos 8 caracteres, 1 maiúscula e 1 número");
      return;
    }

    if (formData.senha !== formData.confirmarSenha) {
      setError("Senhas não coincidem");
      return;
    }

    // Salvar no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    
    // Verificar se email já existe
    if (usuarios.find((u: any) => u.email === formData.email)) {
      setError("Email já cadastrado");
      return;
    }
    
    const novoUsuario = {
      id: Date.now(),
      nome: formData.nome,
      email: formData.email,
      senha: formData.senha,
      tipo: formData.tipo,
      ativo: true,
      dataCriacao: new Date().toISOString()
    };
    
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    alert("Cadastro realizado com sucesso!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-support">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
            <UserPlus className="w-6 h-6 text-primary" />
          </div>
          <CardTitle>Criar Conta</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                type="text"
                required
                minLength={2}
                placeholder="Seu nome completo"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                required
                placeholder="seu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="senha">Senha</Label>
              <Input
                id="senha"
                type="password"
                required
                value={formData.senha}
                onChange={(e) => setFormData({...formData, senha: e.target.value})}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Mínimo 8 caracteres, 1 maiúscula e 1 número
              </p>
            </div>
            <div>
              <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
              <Input
                id="confirmarSenha"
                type="password"
                required
                placeholder="Digite a senha novamente"
                value={formData.confirmarSenha}
                onChange={(e) => setFormData({...formData, confirmarSenha: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="tipo">Tipo de Conta</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Usuario">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Usuário Normal
                    </div>
                  </SelectItem>
                  <SelectItem value="Admin">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Administrador
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                {formData.tipo === 'Admin' ? 'Pode gerenciar conteúdo e usuários' : 'Acesso básico ao sistema'}
              </p>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Cadastrar</Button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              Já tem conta?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cadastro;
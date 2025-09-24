import express from 'express';
import cors from 'cors';
import { connectDB, getPool, sql } from './database.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Conectar ao banco
await connectDB();

// Recursos
app.get('/api/recursos', async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request().execute('sp_BuscarRecursosPorCategoria');
    
    const recursos = result.recordset.reduce((acc, item) => {
      const categoria = acc.find(c => c.category === item.CategoriaNome);
      if (categoria) {
        categoria.items.push({
          title: item.Titulo,
          description: item.Descricao,
          type: item.Tipo,
          url: item.Url
        });
      } else {
        acc.push({
          category: item.CategoriaNome,
          icon: item.CategoriaIcone,
          color: item.CategoriaCor,
          items: [{
            title: item.Titulo,
            description: item.Descricao,
            type: item.Tipo,
            url: item.Url
          }]
        });
      }
      return acc;
    }, []);
    
    res.json({ resources: recursos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Depoimentos
app.get('/api/depoimentos', async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request().execute('sp_BuscarDepoimentosAprovados');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contato
app.post('/api/contato', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    const pool = getPool();
    
    await pool.request()
      .input('Nome', sql.NVarChar, name)
      .input('Email', sql.NVarChar, email)
      .input('Telefone', sql.NVarChar, phone)
      .input('Assunto', sql.NVarChar, subject)
      .input('Mensagem', sql.NVarChar, message)
      .execute('sp_InserirContato');
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Estatísticas
app.get('/api/estatisticas', async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request()
      .query('SELECT Nome, Valor, Descricao, Cor FROM Estatisticas WHERE Ativo = 1 ORDER BY Ordem');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }
    
    const pool = getPool();
    
    const result = await pool.request()
      .input('Email', sql.NVarChar, email.toLowerCase())
      .input('Senha', sql.NVarChar, password)
      .query('SELECT Id, Nome, Email, Tipo FROM Usuarios WHERE LOWER(Email) = @Email AND Senha = @Senha AND Ativo = 1');
    
    if (result.recordset.length > 0) {
      // Atualizar último login
      await pool.request()
        .input('Id', sql.Int, result.recordset[0].Id)
        .query('UPDATE Usuarios SET UltimoLogin = GETDATE() WHERE Id = @Id');
      
      res.json({ success: true, user: result.recordset[0] });
    } else {
      res.status(401).json({ error: 'Email ou senha incorretos' });
    }
  } catch (err) {
    console.error('Erro no login:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Cadastro
app.post('/api/cadastro', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    
    // Validações
    if (!nome || nome.length < 2) {
      return res.status(400).json({ error: 'Nome deve ter pelo menos 2 caracteres' });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }
    
    if (senha.length < 8 || !/[A-Z]/.test(senha) || !/[0-9]/.test(senha)) {
      return res.status(400).json({ error: 'Senha deve ter pelo menos 8 caracteres, 1 maiúscula e 1 número' });
    }
    
    const pool = getPool();
    
    // Verificar se email já existe
    const existingUser = await pool.request()
      .input('Email', sql.NVarChar, email)
      .query('SELECT Id FROM Usuarios WHERE Email = @Email');
    
    if (existingUser.recordset.length > 0) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }
    
    // Inserir novo usuário
    await pool.request()
      .input('Nome', sql.NVarChar, nome)
      .input('Email', sql.NVarChar, email)
      .input('Senha', sql.NVarChar, senha)
      .input('Tipo', sql.NVarChar, 'Editor')
      .query('INSERT INTO Usuarios (Nome, Email, Senha, Tipo) VALUES (@Nome, @Email, @Senha, @Tipo)');
    
    res.json({ success: true, message: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    console.error('Erro no cadastro:', err);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

// Dashboard stats
app.get('/api/dashboard', async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request().query('SELECT * FROM vw_DashboardAdmin');
    res.json(result.recordset[0] || {});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Gerenciar usuários (apenas Admin)
app.get('/api/usuarios', async (req, res) => {
  try {
    const pool = getPool();
    const result = await pool.request()
      .query('SELECT Id, Nome, Email, Tipo, Ativo, DataCriacao, UltimoLogin FROM Usuarios ORDER BY DataCriacao DESC');
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Atualizar tipo de usuário (apenas Admin)
app.put('/api/usuarios/:id/tipo', async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo } = req.body;
    
    if (!['Admin', 'Editor'].includes(tipo)) {
      return res.status(400).json({ error: 'Tipo inválido' });
    }
    
    const pool = getPool();
    await pool.request()
      .input('Id', sql.Int, id)
      .input('Tipo', sql.NVarChar, tipo)
      .query('UPDATE Usuarios SET Tipo = @Tipo WHERE Id = @Id');
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Ativar/desativar usuário (apenas Admin)
app.put('/api/usuarios/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { ativo } = req.body;
    
    const pool = getPool();
    await pool.request()
      .input('Id', sql.Int, id)
      .input('Ativo', sql.Bit, ativo)
      .query('UPDATE Usuarios SET Ativo = @Ativo WHERE Id = @Id');
    
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
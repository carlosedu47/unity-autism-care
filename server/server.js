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

// Login admin
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = getPool();
    
    const result = await pool.request()
      .input('Email', sql.NVarChar, email)
      .input('Senha', sql.NVarChar, password)
      .query('SELECT Id, Nome, Email FROM Usuarios WHERE Email = @Email AND Senha = @Senha AND Ativo = 1');
    
    if (result.recordset.length > 0) {
      res.json({ success: true, user: result.recordset[0] });
    } else {
      res.status(401).json({ error: 'Credenciais inválidas' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
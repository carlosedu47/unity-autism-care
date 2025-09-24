# Integração com Banco de Dados SQL Server

## Configuração

### 1. Instalar SQL Server
- Baixe e instale o SQL Server Express
- Configure com autenticação mista (Windows + SQL Server)

### 2. Executar Script do Banco
```sql
-- Execute o arquivo: database/autism_care_database.sql
-- no SQL Server Management Studio
```

### 3. Configurar Backend
```bash
cd server
npm install
```

### 4. Configurar Variáveis de Ambiente
Edite o arquivo `server/.env`:
```
DB_SERVER=localhost
DB_DATABASE=UnityAutismCare
DB_USER=sa
DB_PASSWORD=SuaSenha123
DB_PORT=1433
PORT=3001
```

### 5. Iniciar Servidor
```bash
# Terminal 1 - Backend
cd server
npm run dev

# Terminal 2 - Frontend
npm run dev
```

## Endpoints da API

- `GET /api/recursos` - Lista recursos por categoria
- `GET /api/depoimentos` - Lista depoimentos aprovados
- `GET /api/estatisticas` - Lista estatísticas do site
- `POST /api/contato` - Envia mensagem de contato
- `POST /api/login` - Autenticação admin

## Credenciais Padrão
- Email: admin@unityautismcare.com
- Senha: admin123

## Estrutura do Banco
- **Usuarios** - Administradores
- **Recursos** - Materiais de apoio
- **Depoimentos** - Testemunhos
- **Contatos** - Mensagens recebidas
- **Estatisticas** - Números de impacto
- **ConfiguracoesSite** - Configurações gerais
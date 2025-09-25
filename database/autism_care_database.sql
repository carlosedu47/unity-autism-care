-- =============================================
-- Banco de Dados: Unity Autism Care
-- Sistema de Gestão para Site de Apoio ao Autismo
-- SGBD: SQL Server
-- =============================================

-- Criar o banco de dados
CREATE DATABASE UnityAutismCare;
GO

USE UnityAutismCare;
GO

-- =============================================
-- TABELAS PRINCIPAIS
-- =============================================

-- Tabela de Usuários
CREATE TABLE Usuarios (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    Senha NVARCHAR(255) NOT NULL,
    Tipo NVARCHAR(20) DEFAULT 'Usuario' CHECK (Tipo IN ('Admin', 'Usuario')),
    Ativo BIT DEFAULT 1,
    DataCriacao DATETIME2 DEFAULT GETDATE(),
    UltimoLogin DATETIME2
);

-- Tabela de Categorias de Recursos
CREATE TABLE CategoriasRecursos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Icone NVARCHAR(50) NOT NULL,
    Cor NVARCHAR(50) NOT NULL,
    Descricao NVARCHAR(500),
    Ordem INT DEFAULT 0,
    Ativo BIT DEFAULT 1,
    DataCriacao DATETIME2 DEFAULT GETDATE()
);

-- Tabela de Recursos
CREATE TABLE Recursos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CategoriaId INT NOT NULL,
    Titulo NVARCHAR(200) NOT NULL,
    Descricao NVARCHAR(1000) NOT NULL,
    Tipo NVARCHAR(50) NOT NULL,
    Url NVARCHAR(500) NOT NULL,
    Ordem INT DEFAULT 0,
    Ativo BIT DEFAULT 1,
    DataCriacao DATETIME2 DEFAULT GETDATE(),
    DataAtualizacao DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (CategoriaId) REFERENCES CategoriasRecursos(Id)
);

-- Tabela de Depoimentos
CREATE TABLE Depoimentos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Cargo NVARCHAR(150) NOT NULL,
    Conteudo NVARCHAR(1000) NOT NULL,
    Avatar NVARCHAR(10) NOT NULL,
    Aprovado BIT DEFAULT 0,
    Destaque BIT DEFAULT 0,
    DataCriacao DATETIME2 DEFAULT GETDATE(),
    DataAprovacao DATETIME2
);

-- Tabela de Contatos/Mensagens
CREATE TABLE Contatos (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Telefone NVARCHAR(20),
    Assunto NVARCHAR(100) NOT NULL,
    Mensagem NVARCHAR(2000) NOT NULL,
    Status NVARCHAR(20) DEFAULT 'Pendente' CHECK (Status IN ('Pendente', 'Em Andamento', 'Respondido', 'Arquivado')),
    DataContato DATETIME2 DEFAULT GETDATE(),
    DataResposta DATETIME2,
    ResponsavelId INT,
    FOREIGN KEY (ResponsavelId) REFERENCES Usuarios(Id)
);

-- Tabela de Configurações do Site
CREATE TABLE ConfiguracoesSite (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Chave NVARCHAR(100) UNIQUE NOT NULL,
    Valor NVARCHAR(MAX) NOT NULL,
    Descricao NVARCHAR(500),
    Tipo NVARCHAR(20) DEFAULT 'Texto' CHECK (Tipo IN ('Texto', 'Numero', 'Boolean', 'JSON')),
    DataAtualizacao DATETIME2 DEFAULT GETDATE()
);

-- Tabela de Estatísticas
CREATE TABLE Estatisticas (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Nome NVARCHAR(100) NOT NULL,
    Valor NVARCHAR(50) NOT NULL,
    Descricao NVARCHAR(200) NOT NULL,
    Cor NVARCHAR(50) NOT NULL,
    Ordem INT DEFAULT 0,
    Ativo BIT DEFAULT 1,
    DataAtualizacao DATETIME2 DEFAULT GETDATE()
);

-- Tabela de Informações de Contato
CREATE TABLE InformacoesContato (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Tipo NVARCHAR(50) NOT NULL,
    Titulo NVARCHAR(100) NOT NULL,
    Conteudo NVARCHAR(200) NOT NULL,
    Descricao NVARCHAR(300),
    Icone NVARCHAR(50) NOT NULL,
    Cor NVARCHAR(50) NOT NULL,
    Ordem INT DEFAULT 0,
    Ativo BIT DEFAULT 1
);

-- Tabela de Horários de Atendimento
CREATE TABLE HorariosAtendimento (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    DiaSemana NVARCHAR(20) NOT NULL,
    HorarioInicio TIME,
    HorarioFim TIME,
    Observacao NVARCHAR(100),
    Ativo BIT DEFAULT 1
);

-- Tabela de Log de Atividades
CREATE TABLE LogAtividades (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    UsuarioId INT,
    Acao NVARCHAR(100) NOT NULL,
    Tabela NVARCHAR(50),
    RegistroId INT,
    DetalhesAntes NVARCHAR(MAX),
    DetalhesDepois NVARCHAR(MAX),
    DataAcao DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UsuarioId) REFERENCES Usuarios(Id)
);

-- =============================================
-- INSERÇÃO DE DADOS INICIAIS
-- =============================================

-- Usuário Administrador Padrão
INSERT INTO Usuarios (Nome, Email, Senha, Tipo) 
VALUES ('Administrador', 'admin@unityautismcare.com', 'admin123', 'Admin');

-- Categorias de Recursos
INSERT INTO CategoriasRecursos (Nome, Icone, Cor, Descricao, Ordem) VALUES
('Guias e Orientações', 'BookOpen', 'autism-blue', 'Materiais informativos e guias práticos', 1),
('Recursos Online', 'Video', 'warm-orange', 'Conteúdos digitais e webinars', 2),
('Atividades e Eventos', 'Calendar', 'calm-purple', 'Eventos e atividades adaptadas', 3);

-- Recursos Iniciais
INSERT INTO Recursos (CategoriaId, Titulo, Descricao, Tipo, Url, Ordem) VALUES
(1, 'Guia para Pais de Primeira Viagem', 'Informações essenciais para famílias que receberam o diagnóstico recentemente.', 'PDF', 'https://educapes.capes.gov.br/bitstream/capes/722086/4/Guita%20tutorial%20-%20Autismo%20completo.pdf', 1),
(2, 'Webinars Educativos', 'Palestras online com especialistas sobre diversos aspectos do autismo.', 'Online', 'https://youtu.be/dgiKusWMulk?si=64KH4Cu9bOHey0lW', 1),
(3, 'Atividades Adaptadas', 'Sugestões de esportes para crianças com autismo', 'Atividade', 'https://www.esporteeinclusao.com.br/esporte-e-autismo/esportes-criancas-com-autismo/', 1);

-- Depoimentos Iniciais
INSERT INTO Depoimentos (Nome, Cargo, Conteudo, Avatar, Aprovado, Destaque) VALUES
('Maria Silva', 'Mãe do Gabriel, 8 anos', 'Encontrar este apoio foi transformador para nossa família. Gabriel desenvolveu muito sua comunicação e hoje participa ativamente da escola.', 'MS', 1, 1),
('João Santos', 'Pai da Ana, 12 anos', 'Os recursos e orientações que recebemos aqui fizeram toda a diferença. Ana agora tem rotinas bem estabelecidas e conseguiu fazer amigos na escola.', 'JS', 1, 1),
('Dra. Carla Mendes', 'Psicóloga Especialista', 'Como profissional, recomendo este trabalho. A abordagem é humanizada e baseada em evidências científicas.', 'CM', 1, 1),
('Roberto Oliveira', 'Educador e pai do Lucas, 15 anos', 'O apoio que recebemos não foi apenas para o Lucas, mas para toda nossa família. Aprendemos a entender melhor suas necessidades.', 'RO', 1, 0),
('Sandra Costa', 'Mãe da Júlia, 6 anos', 'Júlia era muito retraída e hoje ela brinca, se comunica e demonstra alegria todos os dias. O trabalho de vocês mudou nossa vida.', 'SC', 1, 0),
('Prof. André Lima', 'Terapeuta Ocupacional', 'A metodologia aplicada aqui é excepcional. Vejo crianças e adolescentes desenvolvendo autonomia e confiança.', 'AL', 1, 0);

-- Estatísticas
INSERT INTO Estatisticas (Nome, Valor, Descricao, Cor, Ordem) VALUES
('Famílias Satisfeitas', '98%', 'Famílias Satisfeitas', 'autism-blue', 1),
('Crianças Atendidas', '500+', 'Crianças Atendidas', 'hope-green', 2),
('Anos de Experiência', '15', 'Anos de Experiência', 'warm-orange', 3),
('Suporte Disponível', '24/7', 'Suporte Disponível', 'calm-purple', 4);

-- Informações de Contato
INSERT INTO InformacoesContato (Tipo, Titulo, Conteudo, Descricao, Icone, Cor, Ordem) VALUES
('Telefone', 'Telefone', '(11) 4000-0000', 'Segunda a sexta, 8h às 18h', 'Phone', 'autism-blue', 1),
('WhatsApp', 'WhatsApp', '(11) 99999-9999', 'Atendimento 24/7 para emergências', 'MessageCircle', 'hope-green', 2),
('Email', 'E-mail', 'contato@apoioautismo.com.br', 'Resposta em até 24 horas', 'Mail', 'warm-orange', 3);

-- Horários de Atendimento
INSERT INTO HorariosAtendimento (DiaSemana, HorarioInicio, HorarioFim, Observacao) VALUES
('Segunda a Sexta', '08:00', '18:00', NULL),
('Sábado', '08:00', '12:00', NULL),
('Domingo', NULL, NULL, 'Emergências'),
('WhatsApp', NULL, NULL, '24/7');

-- Configurações do Site
INSERT INTO ConfiguracoesSite (Chave, Valor, Descricao, Tipo) VALUES
('site_titulo', 'Unity Autism Care', 'Título principal do site', 'Texto'),
('site_descricao', 'Apoio especializado para famílias e pessoas com autismo', 'Descrição do site', 'Texto'),
('endereco_completo', 'Rua das Flores, 123 - São Paulo/SP', 'Endereço completo da organização', 'Texto'),
('telefone_emergencia', '(11) 99999-9999', 'Telefone para emergências', 'Texto'),
('email_contato', 'contato@apoioautismo.com.br', 'Email principal de contato', 'Texto');

-- =============================================
-- ÍNDICES PARA PERFORMANCE
-- =============================================

CREATE INDEX IX_Recursos_CategoriaId ON Recursos(CategoriaId);
CREATE INDEX IX_Recursos_Ativo ON Recursos(Ativo);
CREATE INDEX IX_Contatos_Status ON Contatos(Status);
CREATE INDEX IX_Contatos_DataContato ON Contatos(DataContato);
CREATE INDEX IX_Depoimentos_Aprovado ON Depoimentos(Aprovado);
CREATE INDEX IX_LogAtividades_UsuarioId ON LogAtividades(UsuarioId);
CREATE INDEX IX_LogAtividades_DataAcao ON LogAtividades(DataAcao);

-- =============================================
-- STORED PROCEDURES
-- =============================================

-- Procedure para buscar recursos por categoria
CREATE PROCEDURE sp_BuscarRecursosPorCategoria
    @CategoriaId INT = NULL
AS
BEGIN
    SELECT 
        r.Id,
        r.Titulo,
        r.Descricao,
        r.Tipo,
        r.Url,
        c.Nome as CategoriaNome,
        c.Icone as CategoriaIcone,
        c.Cor as CategoriaCor
    FROM Recursos r
    INNER JOIN CategoriasRecursos c ON r.CategoriaId = c.Id
    WHERE (@CategoriaId IS NULL OR r.CategoriaId = @CategoriaId)
        AND r.Ativo = 1 
        AND c.Ativo = 1
    ORDER BY c.Ordem, r.Ordem;
END;
GO

-- Procedure para inserir contato
CREATE PROCEDURE sp_InserirContato
    @Nome NVARCHAR(100),
    @Email NVARCHAR(100),
    @Telefone NVARCHAR(20) = NULL,
    @Assunto NVARCHAR(100),
    @Mensagem NVARCHAR(2000)
AS
BEGIN
    INSERT INTO Contatos (Nome, Email, Telefone, Assunto, Mensagem)
    VALUES (@Nome, @Email, @Telefone, @Assunto, @Mensagem);
    
    SELECT SCOPE_IDENTITY() as NovoId;
END;
GO

-- Procedure para buscar depoimentos aprovados
CREATE PROCEDURE sp_BuscarDepoimentosAprovados
AS
BEGIN
    SELECT 
        Nome,
        Cargo,
        Conteudo,
        Avatar,
        DataCriacao
    FROM Depoimentos
    WHERE Aprovado = 1
    ORDER BY Destaque DESC, DataCriacao DESC;
END;
GO

-- =============================================
-- TRIGGERS
-- =============================================

-- Trigger para log de alterações em recursos
CREATE TRIGGER tr_Recursos_Log
ON Recursos
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    DECLARE @Acao NVARCHAR(10);
    
    IF EXISTS(SELECT * FROM inserted) AND EXISTS(SELECT * FROM deleted)
        SET @Acao = 'UPDATE';
    ELSE IF EXISTS(SELECT * FROM inserted)
        SET @Acao = 'INSERT';
    ELSE
        SET @Acao = 'DELETE';
    
    INSERT INTO LogAtividades (Acao, Tabela, RegistroId, DetalhesDepois)
    SELECT 
        @Acao,
        'Recursos',
        COALESCE(i.Id, d.Id),
        CASE WHEN @Acao != 'DELETE' THEN 
            CONCAT('Título: ', i.Titulo, ', Categoria: ', i.CategoriaId)
        ELSE NULL END
    FROM inserted i
    FULL OUTER JOIN deleted d ON i.Id = d.Id;
END;
GO

-- =============================================
-- VIEWS
-- =============================================

-- View para dashboard administrativo
CREATE VIEW vw_DashboardAdmin AS
SELECT 
    (SELECT COUNT(*) FROM Contatos WHERE Status = 'Pendente') as ContatosPendentes,
    (SELECT COUNT(*) FROM Depoimentos WHERE Aprovado = 0) as DepoimentosPendentes,
    (SELECT COUNT(*) FROM Recursos WHERE Ativo = 1) as RecursosAtivos,
    (SELECT COUNT(*) FROM Contatos WHERE DataContato >= DATEADD(day, -30, GETDATE())) as ContatosUltimos30Dias;
GO

-- View para recursos com categoria
CREATE VIEW vw_RecursosCompletos AS
SELECT 
    r.Id,
    r.Titulo,
    r.Descricao,
    r.Tipo,
    r.Url,
    r.Ordem as RecursoOrdem,
    r.Ativo as RecursoAtivo,
    r.DataCriacao,
    c.Id as CategoriaId,
    c.Nome as CategoriaNome,
    c.Icone as CategoriaIcone,
    c.Cor as CategoriaCor,
    c.Ordem as CategoriaOrdem
FROM Recursos r
INNER JOIN CategoriasRecursos c ON r.CategoriaId = c.Id;
GO

-- =============================================
-- FUNÇÕES
-- =============================================

-- Função para contar recursos por categoria
CREATE FUNCTION fn_ContarRecursosPorCategoria(@CategoriaId INT)
RETURNS INT
AS
BEGIN
    DECLARE @Contador INT;
    
    SELECT @Contador = COUNT(*)
    FROM Recursos
    WHERE CategoriaId = @CategoriaId AND Ativo = 1;
    
    RETURN @Contador;
END;
GO

-- =============================================
-- PERMISSÕES E SEGURANÇA
-- =============================================

-- Criar role para administradores
CREATE ROLE db_admin_autism_care;
GRANT SELECT, INSERT, UPDATE, DELETE ON SCHEMA::dbo TO db_admin_autism_care;

-- Criar role para usuários (apenas leitura e inserção de contatos)
CREATE ROLE db_usuario_autism_care;
GRANT SELECT ON SCHEMA::dbo TO db_usuario_autism_care;
GRANT INSERT ON Contatos TO db_usuario_autism_care;

PRINT 'Banco de dados Unity Autism Care criado com sucesso!';
PRINT 'Usuário padrão: admin@unityautismcare.com / admin123';
export const initializeData = () => {
  // Recursos iniciais sobre autismo
  const recursosIniciais = [
    {
      id: 1,
      titulo: "Cartilha dos Direitos da Pessoa com Autismo",
      descricao: "Cartilha oficial do governo brasileiro sobre direitos e benefícios para pessoas com TEA.",
      tipo: "PDF",
      categoria: "Profissional",
      url: "https://www.gov.br/mdh/pt-br/navegue-por-temas/pessoa-com-deficiencia/publicacoes/cartilha-direitos-da-pessoa-com-autismo.pdf",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 2,
      titulo: "Autismo: Orientações para Pais",
      descricao: "Vídeo educativo do Hospital Israelita Albert Einstein sobre orientações para famílias.",
      tipo: "Video",
      categoria: "Familiar",
      url: "https://www.youtube.com/watch?v=wmKTmkk7gns",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 3,
      titulo: "Atividades Lúdicas para Autismo",
      descricao: "Sugestões práticas de brincadeiras e atividades sensoriais para crianças com TEA.",
      tipo: "Link",
      categoria: "Terapeutico",
      url: "https://neurosaber.com.br/10-atividades-ludicas-para-criancas-com-autismo/",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 4,
      titulo: "Inclusão Escolar",
      descricao: "Orientações para professores e escolas sobre como promover a inclusão de alunos com autismo.",
      tipo: "Link",
      categoria: "Educacional",
      url: "https://diversa.org.br/artigos/inclusao-escolar-de-pessoas-com-autismo/",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 5,
      titulo: "Rotina Visual para Autismo",
      descricao: "Como criar e usar rotinas visuais para ajudar crianças com autismo no dia a dia.",
      tipo: "Link",
      categoria: "Familiar",
      url: "https://institutopensi.org.br/blog-saude-infantil/rotina-visual-para-criancas-com-autismo/",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 6,
      titulo: "Sinais Precoces do Autismo",
      descricao: "Vídeo informativo sobre identificação precoce dos sinais do Transtorno do Espectro Autista.",
      tipo: "Video",
      categoria: "Educacional",
      url: "https://www.youtube.com/watch?v=YbskKXrBqh0",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 7,
      titulo: "Terapia ABA - Fundamentos",
      descricao: "Introdução aos princípios da Análise do Comportamento Aplicada no tratamento do autismo.",
      tipo: "Video",
      categoria: "Terapeutico",
      url: "https://www.youtube.com/watch?v=Lq5U3TzQcWs",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 8,
      titulo: "Esportes Adaptados",
      descricao: "Sugestões de atividades físicas e esportes adequados para crianças e jovens com autismo.",
      tipo: "Link",
      categoria: "Familiar",
      url: "https://www.esporteeinclusao.com.br/esporte-e-autismo/esportes-criancas-com-autismo/",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 9,
      titulo: "Atividades Sensoriais",
      descricao: "Conjunto de atividades para estimulação sensorial adequada para crianças com autismo.",
      tipo: "Atividade",
      categoria: "Terapeutico",
      url: "https://www.tempojunto.com/2016/04/07/10-brincadeiras-sensoriais-para-criancas-com-autismo/",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 10,
      titulo: "Rotinas e Estruturação",
      descricao: "Como criar rotinas estruturadas que ajudam no desenvolvimento e bem-estar de crianças com autismo.",
      tipo: "Link",
      categoria: "Familiar",
      url: "https://institutopensi.org.br/blog-saude-infantil/rotina-para-criancas-com-autismo/",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    }
  ];

  // Depoimentos iniciais
  const depoimentosIniciais = [
    {
      id: 1,
      nome: "Maria Silva",
      email: "maria@email.com",
      depoimento: "Encontrar este centro de apoio mudou completamente nossa vida. Meu filho João, de 8 anos, estava tendo dificuldades na escola e em casa. Com o apoio da equipe, aprendemos estratégias que transformaram nosso dia a dia. Hoje ele está mais comunicativo e feliz!",
      dataEnvio: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      aprovado: true,
      visivel: true,
      dataAprovacao: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      nome: "Carlos Oliveira",
      email: "carlos@email.com",
      depoimento: "Como pai de uma criança com autismo, me sentia perdido e sem direção. Os recursos e orientações que recebi aqui me deram confiança para apoiar minha filha da melhor forma. A diferença no desenvolvimento dela é notável!",
      dataEnvio: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      aprovado: true,
      visivel: true,
      dataAprovacao: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      nome: "Ana Santos",
      email: "ana@email.com",
      depoimento: "A equipe de profissionais é excepcional. Eles não apenas ajudaram meu filho, mas também nos ensinaram como ser uma família mais unida e compreensiva. Recomendo a todos que precisam de apoio especializado.",
      dataEnvio: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      aprovado: true,
      visivel: true,
      dataAprovacao: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 4,
      nome: "Roberto Lima",
      email: "roberto@email.com",
      depoimento: "Minha esposa e eu estávamos desesperados após o diagnóstico. Aqui encontramos não apenas informação, mas uma comunidade que nos acolheu. Nosso filho Pedro está progredindo muito bem com as terapias recomendadas.",
      dataEnvio: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      aprovado: true,
      visivel: true,
      dataAprovacao: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 5,
      nome: "Fernanda Costa",
      email: "fernanda@email.com",
      depoimento: "Os workshops e grupos de apoio foram fundamentais para nossa família. Conhecer outras famílias passando pela mesma situação nos deu força e esperança. Muito obrigada por todo o suporte!",
      dataEnvio: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      aprovado: true,
      visivel: true,
      dataAprovacao: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  // Verificar se já existem dados
  const recursosExistentes = localStorage.getItem('recursos');
  const depoimentosExistentes = localStorage.getItem('depoimentos');

  // Adicionar recursos se não existirem
  if (!recursosExistentes || JSON.parse(recursosExistentes).length === 0) {
    localStorage.setItem('recursos', JSON.stringify(recursosIniciais));
  }

  // Adicionar depoimentos se não existirem
  if (!depoimentosExistentes || JSON.parse(depoimentosExistentes).length === 0) {
    localStorage.setItem('depoimentos', JSON.stringify(depoimentosIniciais));
  }

  // Disparar evento para atualizar interface
  window.dispatchEvent(new Event('recursos-updated'));
};
export const initializeData = () => {
  // Recursos iniciais sobre autismo
  const recursosIniciais = [
    {
      id: 1,
      titulo: "Leis e Direitos - Autismo e Realidade",
      descricao: "Informações completas sobre leis e direitos das pessoas com Transtorno do Espectro Autista no Brasil.",
      tipo: "Link",
      categoria: "Profissional",
      url: "https://autismoerealidade.org.br/convivendo-com-o-tea/leis-e-direitos/",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 18,
      titulo: "Direitos das Pessoas com Autismo no Brasil",
      descricao: "Guia detalhado sobre como funcionam as principais leis que garantem direitos às pessoas com autismo no país.",
      tipo: "Link",
      categoria: "Profissional",
      url: "https://www.canalautismo.com.br/artigos/direitos-das-pessoas-com-autismo-no-brasil-entenda-como-funcionam-as-principais-leis/#google_vignette",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 19,
      titulo: "Direitos da Pessoa com Autismo - Explicação Completa",
      descricao: "Vídeo educativo explicando de forma clara os direitos garantidos por lei às pessoas com Transtorno do Espectro Autista.",
      tipo: "Video",
      categoria: "Profissional",
      url: "https://youtu.be/-JWtPeWe0GA?si=8kDNeXVcgq_awF1s",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },






    {
      id: 9,
      titulo: "Principais Terapias no Autismo",
      descricao: "Guia completo sobre as principais terapias utilizadas no tratamento do autismo e como elas ajudam no desenvolvimento.",
      tipo: "Link",
      categoria: "Terapeutico",
      url: "https://neuroconecta.com.br/quais-sao-as-principais-terapias-no-autismo-e-como-elas-ajudam-no-desenvolvimento/",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 14,
      titulo: "5 Tipos de Terapia para Crianças Autistas",
      descricao: "Artigo detalhado sobre os diferentes tipos de terapia disponíveis para crianças com Transtorno do Espectro Autista.",
      tipo: "Link",
      categoria: "Terapeutico",
      url: "https://institutoneurosaber.com.br/artigos/5-tipos-de-terapia-para-criancas-autistas/",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 15,
      titulo: "Terapias para Autismo - Guia Completo",
      descricao: "Vídeo educativo sobre as diferentes abordagens terapêuticas utilizadas no tratamento do autismo.",
      tipo: "Video",
      categoria: "Terapeutico",
      url: "https://youtu.be/YD-vkaTv6js?si=nHTxvuoW6gEYNocS",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 10,
      titulo: "O Papel da Família no Suporte a Crianças com Autismo",
      descricao: "Guia completo sobre como a família pode oferecer o melhor suporte para crianças com Transtorno do Espectro Autista.",
      tipo: "Link",
      categoria: "Familiar",
      url: "https://www.redepsi.com.br/2023/10/25/o-papel-da-familia-no-suporte-a-criancas-com-autismo-um-guia-completo/",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 16,
      titulo: "Autismo e Família - A Importância do Núcleo Familiar",
      descricao: "Artigo sobre a importância do núcleo familiar na vida de crianças autistas e como fortalecer esses laços.",
      tipo: "Link",
      categoria: "Familiar",
      url: "https://www.familiaejuventude.df.gov.br/autismo-e-familia-a-importancia-do-nucleo-familiar-na-vida-de-criancas-autistas/",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 17,
      titulo: "Como a Família Pode Ajudar Crianças com Autismo",
      descricao: "Vídeo educativo sobre estratégias práticas que a família pode usar para apoiar o desenvolvimento de crianças com TEA.",
      tipo: "Video",
      categoria: "Familiar",
      url: "https://youtu.be/hgL34Q2cfcs?si=oMVAxTE1TJRm2EyE",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 11,
      titulo: "Inclusão e Socialização de Alunos com TEA",
      descricao: "Guia prático sobre como começar o processo de inclusão e socialização de estudantes com autismo.",
      tipo: "Link",
      categoria: "Educacional",
      url: "https://fazeducacao.com.br/inclusao-e-socializacao-de-alunos-com-tea-por-onde-comecar/",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 12,
      titulo: "Autismo na Escola - Práticas Pedagógicas",
      descricao: "Estratégias e práticas pedagógicas eficazes para trabalhar com alunos autistas em sala de aula.",
      tipo: "Link",
      categoria: "Educacional",
      url: "https://educacional.com.br/praticas-pedagogicas/autismo-na-escola/",
      ativo: true,
      dataCriacao: new Date().toISOString(),
      autor: "Administrador"
    },
    {
      id: 13,
      titulo: "Autismo e Educação Inclusiva",
      descricao: "Vídeo educativo sobre estratégias de educação inclusiva para estudantes com Transtorno do Espectro Autista.",
      tipo: "Video",
      categoria: "Educacional",
      url: "https://youtu.be/H33UFg94PEI?si=Z2YhPt4Z8rcJFsYT",
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

  // Sempre garantir que os recursos estejam atualizados
  localStorage.setItem('recursos', JSON.stringify(recursosIniciais));

  // Adicionar depoimentos se não existirem
  if (!depoimentosExistentes || JSON.parse(depoimentosExistentes).length === 0) {
    localStorage.setItem('depoimentos', JSON.stringify(depoimentosIniciais));
  }

  // Disparar evento para atualizar interface
  setTimeout(() => {
    window.dispatchEvent(new Event('recursos-updated'));
  }, 100);
};
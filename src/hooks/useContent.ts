import { useState, useEffect } from 'react';

interface ResourceItem {
  title: string;
  description: string;
  type: string;
  url: string;
}

interface ResourceCategory {
  category: string;
  icon: string;
  color: string;
  items: ResourceItem[];
}

interface ContentData {
  resources: ResourceCategory[];
}

const defaultContent: ContentData = {
  resources: [
    {
      category: "Guias e Orientações",
      icon: "BookOpen",
      color: "autism-blue",
      items: [
        {
          title: "Guia para Pais de Primeira Viagem",
          description: "Informações essenciais para famílias que receberam o diagnóstico recentemente.",
          type: "PDF",
          url: "https://educapes.capes.gov.br/bitstream/capes/722086/4/Guita%20tutorial%20-%20Autismo%20completo.pdf"
        }
      ]
    },
    {
      category: "Recursos Online",
      icon: "Video",
      color: "warm-orange",
      items: [
        {
          title: "Webinars Educativos",
          description: "Palestras online com especialistas sobre diversos aspectos do autismo.",
          type: "Online",
          url: "https://youtu.be/dgiKusWMulk?si=64KH4Cu9bOHey0lW"
        }
      ]
    },
    {
      category: "Atividades e Eventos",
      icon: "Calendar",
      color: "calm-purple",
      items: [
        {
          title: "Atividades Adaptadas",
          description: "Sugestões de esportes para crianças com autismo",
          type: "Atividade",
          url: "https://www.esporteeinclusao.com.br/esporte-e-autismo/esportes-criancas-com-autismo/"
        }
      ]
    }
  ]
};

export const useContent = () => {
  const [content, setContent] = useState<ContentData>(defaultContent);

  useEffect(() => {
    const saved = localStorage.getItem('siteContent');
    if (saved) {
      setContent(JSON.parse(saved));
    }
  }, []);

  const updateContent = (newContent: ContentData) => {
    setContent(newContent);
    localStorage.setItem('siteContent', JSON.stringify(newContent));
    window.dispatchEvent(new CustomEvent('contentUpdated'));
  };

  const resetToDefault = () => {
    setContent(defaultContent);
    localStorage.setItem('siteContent', JSON.stringify(defaultContent));
    window.dispatchEvent(new CustomEvent('contentUpdated'));
  };

  return { content, updateContent, resetToDefault };
};

export { defaultContent };
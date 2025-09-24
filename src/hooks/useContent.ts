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

const API_URL = 'http://localhost:3001/api';

export const useContent = () => {
  const [content, setContent] = useState<ContentData>({ resources: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await fetch(`${API_URL}/recursos`);
      const data = await response.json();
      setContent(data);
    } catch (error) {
      console.error('Erro ao carregar recursos:', error);
      // Fallback para dados locais se API falhar
      const saved = localStorage.getItem('siteContent');
      if (saved) {
        setContent(JSON.parse(saved));
      }
    } finally {
      setLoading(false);
    }
  };

  const updateContent = (newContent: ContentData) => {
    setContent(newContent);
    localStorage.setItem('siteContent', JSON.stringify(newContent));
    window.dispatchEvent(new CustomEvent('contentUpdated'));
  };

  const resetToDefault = () => {
    fetchContent();
  };

  return { content, updateContent, resetToDefault, loading };
};
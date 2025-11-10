import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. DADOS INICIAIS

// Dados iniciais para o estado do currículo
const initialResumeData = {
  personalInfo: { name: "", title: "", email: "", phone: "", address: "", linkedIn: "", portfolio: "" },
  summary: "",
  experience: [],
  education: [],
  certifications: [],
  skills: [],
  languages: [],
  projects: [],
};

// Estado inicial para fontes e layout
const initialFontSettings = {
  // Fontes
  heading: "'Georgia', var(--font-secondary)",
  body: "'Inter', var(--font-primary)",
  // Tamanhos
  sizeName: '3rem',
  sizeSectionTitle: '1.4rem',
  sizeItemTitle: '1.15rem',
  sizeBody: '1rem',
  // Cor
  accentColor: '#005f73',
  // Espaçamento
  letterSpacing: 'normal',
  lineHeight: '1.6',
  sectionSpacing: '20px',
  // Layout Específico
  modernSidebarWidth: '35%',
};

// Ordem padrão das seções (SEMPRE UMA ARRAY)
const initialLayoutOrder = [
  'summary', 'experience', 'education', 'certifications', 'skills', 'languages', 'projects'
];

// Estado inicial para visibilidade das seções
const initialSectionVisibility = {
  summary: true,
  experience: true,
  education: true,
  certifications: true,
  skills: true,
  languages: true,
  projects: true,
};

// 2. FUNÇÃO HELPER DE LOADSTATE (CORRIGIDA)

// Carrega o estado do localStorage. Se falhar, retorna o estado inicial.
const loadState = (key, initialState) => {
  try {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      return JSON.parse(savedData);
    }
  } catch (error) {
    console.error(`Falha ao carregar ${key} do localStorage`, error);
  }
  return initialState;
};

// 3. CRIAÇÃO DO CONTEXTO E PROVIDER

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  // Estados de Navegação
  const [page, setPage] = useState('select');
  const [template, setTemplate] = useState('modern');
  
  // --- CARREGAMENTO DE ESTADO CORRIGIDO ---
  
  // Estados que são OBJETOS (fundimos para garantir que novas chaves sejam adicionadas)
  const [resumeData, setResumeData] = useState(() => {
    const saved = loadState('resumeData', initialResumeData);
    return { ...initialResumeData, ...saved };
  });
  const [fontSettings, setFontSettings] = useState(() => {
    const saved = loadState('fontSettings', initialFontSettings);
    return { ...initialFontSettings, ...saved };
  });
  const [sectionVisibility, setSectionVisibility] = useState(() => {
    const saved = loadState('sectionVisibility', initialSectionVisibility);
    return { ...initialSectionVisibility, ...saved };
  });
  
  // Estado que é uma ARRAY (NÃO PODE ser fundido como um objeto)
  const [layoutOrder, setLayoutOrder] = useState(() => 
    loadState('layoutOrder', initialLayoutOrder)
  );
  // --- FIM DA CORREÇÃO ---

  // Salva todos os estados no localStorage
  useEffect(() => { localStorage.setItem('resumeData', JSON.stringify(resumeData)); }, [resumeData]);
  useEffect(() => { localStorage.setItem('fontSettings', JSON.stringify(fontSettings)); }, [fontSettings]);
  useEffect(() => { localStorage.setItem('sectionVisibility', JSON.stringify(sectionVisibility)); }, [sectionVisibility]);
  useEffect(() => { localStorage.setItem('layoutOrder', JSON.stringify(layoutOrder)); }, [layoutOrder]);

  // 4. HANDLERS (FUNÇÕES DE ATUALIZAÇÃO)

  // Handler para reordenar o layout
  const handleLayoutOrderChange = (newOrder) => {
    setLayoutOrder(newOrder);
  };

  // Handler genérico para fontes, tamanhos, cores e espaçamentos
  const handleFontChange = (field, value) => {
    setFontSettings(prev => ({ ...prev, [field]: value }));
  };

  // Handler para ligar/desligar seções
  const handleSectionToggle = (sectionName) => {
    setSectionVisibility(prev => ({
      ...prev,
      [sectionName]: !prev[sectionName]
    }));
  };
  
  // Handler para campos de texto simples
  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (dataset.section) {
      setResumeData(prev => ({ ...prev, [dataset.section]: { ...prev[dataset.section], [name]: value } }));
    } else {
      setResumeData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handler para itens em seções dinâmicas (experiência, etc.)
  const handleSectionChange = (section, id, e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, [name]: value } : item
      )
    }));
  };

  // Adicionar um novo item (experiência, educação, etc.)
  const addSectionItem = (section) => {
    const newItem = { id: Date.now() };
    switch (section) {
      case 'experience': newItem.title = ""; newItem.company = ""; newItem.location = ""; newItem.start = ""; newItem.end = ""; newItem.description = ""; break;
      case 'education': newItem.degree = ""; newItem.school = ""; newItem.location = ""; newItem.start = ""; newItem.end = ""; break;
      case 'certifications': newItem.name = ""; newItem.issuer = ""; newItem.year = ""; break;
      case 'skills': newItem.name = ""; newItem.category = "Técnica"; break;
      case 'languages': newItem.name = ""; newItem.level = "Básico"; break;
      case 'projects': newItem.name = ""; newItem.description = ""; newItem.link = ""; break;
    }
    setResumeData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  // Remover um item
  const removeSectionItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  // Navegação
  const selectTemplate = (templateId) => {
    setTemplate(templateId);
    setPage('build');
  };
  const goHome = () => {
    setPage('select');
  };

  // 5. VALORES FORNECIDOS PELO PROVIDER

  const value = {
    page, template, resumeData, fontSettings,
    sectionVisibility,
    layoutOrder,
    handleLayoutOrderChange,
    handleSectionToggle,
    handleFontChange, handleChange, handleSectionChange,
    addSectionItem, removeSectionItem, selectTemplate, goHome
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

// 6. HOOK CUSTOMIZADO
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
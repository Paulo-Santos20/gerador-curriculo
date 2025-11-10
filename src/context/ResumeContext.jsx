import React, { createContext, useState, useContext, useEffect } from 'react';

// Dados iniciais para o estado do currículo
const initialResumeData = {
  personalInfo: {
    name: "",
    title: "",
    email: "",
    phone: "",
    address: "",
    linkedIn: "",
    portfolio: "",
  },
  summary: "",
  experience: [],
  education: [],
  skills: [],
  languages: [],
  projects: [],
};

// Estado inicial das fontes
const initialFontSettings = {
  heading: "'Georgia', var(--font-secondary)",
  body: "'Inter', var(--font-primary)",
  sizeName: '3rem',
  sizeSectionTitle: '1.4rem',
  sizeItemTitle: '1.15rem',
  sizeBody: '1rem',
};

// --- NOVA FUNÇÃO ---
// Helper para carregar o estado do localStorage
// Isso garante que o localStorage só seja lido UMA VEZ no carregamento.
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
// --- FIM DA NOVA FUNÇÃO ---

// 1. Criar o Contexto
const ResumeContext = createContext();

// 2. Criar o Provedor (Provider)
export const ResumeProvider = ({ children }) => {
  const [page, setPage] = useState('select');
  const [template, setTemplate] = useState('modern');

  // --- ATUALIZAÇÃO AQUI ---
  // Os 'useStates' agora usam a função 'loadState' para
  // carregar dados salvos ou usar o valor inicial.
  const [resumeData, setResumeData] = useState(() => loadState('resumeData', initialResumeData));
  const [fontSettings, setFontSettings] = useState(() => loadState('fontSettings', initialFontSettings));
  // --- FIM DA ATUALIZAÇÃO ---


  // --- NOVO 'useEffect' PARA SALVAR DADOS ---
  // Este hook é acionado sempre que 'resumeData' muda
  useEffect(() => {
    try {
      localStorage.setItem('resumeData', JSON.stringify(resumeData));
    } catch (error) {
      console.error("Falha ao salvar 'resumeData' no localStorage", error);
    }
  }, [resumeData]);

  // Este hook é acionado sempre que 'fontSettings' muda
  useEffect(() => {
    try {
      localStorage.setItem('fontSettings', JSON.stringify(fontSettings));
    } catch (error) {
      console.error("Falha ao salvar 'fontSettings' no localStorage", error);
    }
  }, [fontSettings]);
  // --- FIM DOS NOVOS 'useEffect's ---


  // --- (Todas as funções de handler permanecem as mesmas) ---
  const handleFontChange = (field, value) => {
    setFontSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleChange = (e) => {
    const { name, value, dataset } = e.target;
    if (dataset.section) {
      setResumeData(prev => ({ ...prev, [dataset.section]: { ...prev[dataset.section], [name]: value } }));
    } else {
      setResumeData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSectionChange = (section, id, e) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map(item =>
        item.id === id ? { ...item, [name]: value } : item
      )
    }));
  };

  const addSectionItem = (section) => {
    const newItem = { id: Date.now() };
    switch (section) {
      case 'experience':
        newItem.title = ""; newItem.company = ""; newItem.location = ""; newItem.start = ""; newItem.end = ""; newItem.description = "";
        break;
      case 'education':
        newItem.degree = ""; newItem.school = ""; newItem.location = ""; newItem.start = ""; newItem.end = "";
        break;
      case 'skills':
        newItem.name = "";
        break;
      case 'languages':
        newItem.name = ""; newItem.level = "Básico";
        break;
      case 'projects':
        newItem.name = ""; newItem.description = ""; newItem.link = "";
        break;
    }
    setResumeData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
  };

  const removeSectionItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const selectTemplate = (templateId) => {
    setTemplate(templateId);
    setPage('build');
  };

  const goHome = () => {
    setPage('select');
  };

  // Valores a serem compartilhados com os componentes
  const value = {
    page,
    template,
    resumeData,
    fontSettings,
    handleFontChange,
    handleChange,
    handleSectionChange,
    addSectionItem,
    removeSectionItem,
    selectTemplate,
    goHome
  };

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  );
};

// 3. Criar o Hook customizado para consumir o contexto
export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
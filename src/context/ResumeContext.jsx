import React, { createContext, useState, useContext } from 'react';

// Dados iniciais para o estado do currículo
const initialResumeData = {
  // ... (código existente) ...
  personalInfo: { name: "", title: "", email: "", phone: "", address: "", linkedIn: "", portfolio: "" },
  summary: "", experience: [], education: [], skills: [], languages: [], projects: [],
};

// --- ATUALIZADO ---
// Estado inicial das fontes (agora inclui tamanhos)
// Os valores em 'rem' são baseados nos padrões dos templates
const initialFontSettings = {
  heading: "'Georgia', var(--font-secondary)",
  body: "'Inter', var(--font-primary)",
  // Novos estados de tamanho
  sizeName: '3rem',           // Tamanho do Nome Principal
  sizeSectionTitle: '1.4rem', // Tamanho dos Títulos (Experiência, etc.)
  sizeItemTitle: '1.15rem',   // Tamanho dos Sub-títulos (Cargo, Curso)
  sizeBody: '1rem',           // Tamanho do texto normal
};
// --- FIM DA ATUALIZAÇÃO ---

// 1. Criar o Contexto
const ResumeContext = createContext();

// 2. Criar o Provedor (Provider)
export const ResumeProvider = ({ children }) => {
  const [page, setPage] = useState('select');
  const [template, setTemplate] = useState('modern');
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [fontSettings, setFontSettings] = useState(initialFontSettings);

  // --- ATUALIZADO ---
  // Handler para fontes (agora um handler genérico)
  const handleFontChange = (field, value) => {
    setFontSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };
  // --- FIM DA ATUALIZAÇÃO ---

  // ... (handleChange, handleSectionChange, addSectionItem, removeSectionItem) ...
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
  // ... (selectTemplate, goHome) ...
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
    fontSettings, // Passa o objeto de fontes completo
    handleFontChange, // Passa o handler genérico
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
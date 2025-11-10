import React, { createContext, useState, useContext, useEffect } from 'react';

// ... (initialResumeData) ...
const initialResumeData = {
  personalInfo: { name: "", title: "", email: "", phone: "", address: "", linkedIn: "", portfolio: "" },
  summary: "", experience: [], education: [], certifications: [], skills: [], languages: [], projects: [],
};

// --- ATUALIZAÇÃO AQUI ---
const initialFontSettings = {
  heading: "'Georgia', var(--font-secondary)",
  body: "'Inter', var(--font-primary)",
  sizeName: '3rem',
  sizeSectionTitle: '1.4rem',
  sizeItemTitle: '1.15rem',
  sizeBody: '1rem',
  accentColor: '#005f73' // Cor de destaque padrão (o nosso azul escuro)
};
// --- FIM DA ATUALIZAÇÃO ---

// --- ATUALIZAÇÃO AQUI ---
// Funde o estado inicial com os dados salvos
const loadState = (key, initialState) => {
  try {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Funde o inicial com o salvo para garantir que novas chaves existam
      return { ...initialState, ...parsedData }; 
    }
  } catch (error) {
    console.error(`Falha ao carregar ${key} do localStorage`, error);
  }
  return initialState;
};
// --- FIM DA ATUALIZAÇÃO ---

const initialSectionVisibility = {
  summary: true, experience: true, education: true,
  certifications: true, skills: true, languages: true, projects: true,
};

const ResumeContext = createContext();

export const ResumeProvider = ({ children }) => {
  const [page, setPage] = useState('select');
  const [template, setTemplate] = useState('modern');
  const [resumeData, setResumeData] = useState(() => loadState('resumeData', initialResumeData));
  const [fontSettings, setFontSettings] = useState(() => loadState('fontSettings', initialFontSettings));
  const [sectionVisibility, setSectionVisibility] = useState(() => loadState('sectionVisibility', initialSectionVisibility));

  // ... (useEffects) ...
  useEffect(() => { localStorage.setItem('resumeData', JSON.stringify(resumeData)); }, [resumeData]);
  useEffect(() => { localStorage.setItem('fontSettings', JSON.stringify(fontSettings)); }, [fontSettings]);
  useEffect(() => { localStorage.setItem('sectionVisibility', JSON.stringify(sectionVisibility)); }, [sectionVisibility]);

  // O handleFontChange genérico já funciona para 'accentColor'
  const handleFontChange = (field, value) => {
    setFontSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSectionToggle = (sectionName) => {
    setSectionVisibility(prev => ({ ...prev, [sectionName]: !prev[sectionName] }));
  };

  // ... (handleChange, handleSectionChange, addSectionItem, removeSectionItem, selectTemplate, goHome) ...
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
      case 'experience': newItem.title = ""; newItem.company = ""; newItem.location = ""; newItem.start = ""; newItem.end = ""; newItem.description = ""; break;
      case 'education': newItem.degree = ""; newItem.school = ""; newItem.location = ""; newItem.start = ""; newItem.end = ""; break;
      case 'certifications': newItem.name = ""; newItem.issuer = ""; newItem.year = ""; break;
      case 'skills': newItem.name = ""; newItem.category = "Técnica"; break;
      case 'languages': newItem.name = ""; newItem.level = "Básico"; break;
      case 'projects': newItem.name = ""; newItem.description = ""; newItem.link = ""; break;
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

  const value = {
    page, template, resumeData, fontSettings,
    sectionVisibility,
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

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
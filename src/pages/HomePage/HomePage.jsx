import React from 'react';
import { useResume } from '../../context/ResumeContext';
import Card from '../../components/ui/Card';
import styles from './HomePage.module.css';

// Importar os templates reais
import TemplateModern from '../../components/templates/TemplateModern';
import TemplateClassic from '../../components/templates/TemplateClassic';
import TemplateMinimalist from '../../components/templates/TemplateMinimalist';
import TemplateExecutivo from '../../components/templates/TemplateExecutivo';
import TemplateProfissional from '../../components/templates/TemplateProfissional';

const templates = [
  { id: 'modern', name: 'Moderno', description: 'Design com barra lateral, ideal para destacar habilidades.' },
  { id: 'classic', name: 'Clássico', description: 'Layout tradicional, focado em experiência. Fonte serifada.' },
  { id: 'minimalist', name: 'Minimalista', description: 'Design limpo, com foco em tipografia e espaço em branco.' },
  { id: 'executivo', name: 'Executivo', description: 'Layout de coluna única, limpo e profissional (Baseado em Paulo S.)' },
  { id: 'profissional', name: 'Profissional', description: 'Clássico com ênfase em habilidades no rodapé (Baseado em Rafhaela H.)' },
];


const placeholderData = {
  personalInfo: {},
  summary: "",
  experience: [],
  education: [],
  certifications: [], // <-- ESTA LINHA ESTAVA EM FALTA
  skills: [],
  languages: [],
  projects: []
};
// --- FIM DA ATUALIZAÇÃO ---

// Função para renderizar o componente correto
const getTemplateComponent = (id) => {
  switch (id) {
    case 'modern':
      return <TemplateModern data={placeholderData} />;
    case 'classic':
      return <TemplateClassic data={placeholderData} />;
    case 'minimalist':
      return <TemplateMinimalist data={placeholderData} />;
    case 'executivo':
      return <TemplateExecutivo data={placeholderData} />;
    case 'profissional':
      return <TemplateProfissional data={placeholderData} />;
    default:
      return null;
  }
};

const HomePage = () => {
  const { selectTemplate } = useResume();

  return (
    <div className={styles.homePage}>
      <div className={styles.container}>
        <h2 className={styles.title}>1. Selecione um Modelo para Começar</h2>
        <div className={styles.templateGrid}>
          {templates.map((template) => (
            <Card key={template.id}>
              <div className={styles.previewPlaceholder}>
                <div className={styles.previewWrapper}>
                  {getTemplateComponent(template.id)}
                </div>
              </div>
              
              <div className={styles.cardContent}>
                <h3>{template.name}</h3>
                <p>{template.description}</p>
                <button 
                  className={styles.selectButton}
                  onClick={() => selectTemplate(template.id)}
                >
                  Usar este Modelo
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
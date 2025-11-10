import React from 'react';
import { useResume } from '../../context/ResumeContext';
import TemplateModern from './TemplateModern';
import TemplateClassic from './TemplateClassic';
import TemplateMinimalist from './TemplateMinimalist';
import TemplateExecutivo from './TemplateExecutivo';
import TemplateProfissional from './TemplateProfissional';
import styles from './ResumePreview.module.css';

const ResumePreview = () => {
  const { resumeData, template, fontSettings, sectionVisibility } = useResume();
  const data = resumeData;

  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return <TemplateClassic data={data} />;
      case 'modern':
        return <TemplateModern data={data} />;
      case 'minimalist':
        return <TemplateMinimalist data={data} />;
      case 'executivo':
        return <TemplateExecutivo data={data} />;
      case 'profissional':
        return <TemplateProfissional data={data} />;
      default:
        return <TemplateModern data={data} />;
    }
  };

  // Injeta TODAS as variáveis de estilo
  const styleVariables = {
    // Cor
    '--template-accent-color': fontSettings.accentColor,
    // Fontes
    '--font-heading-family': fontSettings.heading,
    '--font-body-family': fontSettings.body,
    // Tamanhos
    '--font-size-name': fontSettings.sizeName,
    '--font-size-section-title': fontSettings.sizeSectionTitle,
    '--font-size-item-title': fontSettings.sizeItemTitle,
    '--font-size-body': fontSettings.sizeBody,
    // Espaçamento
    '--template-letter-spacing': fontSettings.letterSpacing,
    '--template-line-height': fontSettings.lineHeight,
    '--template-section-spacing': fontSettings.sectionSpacing,
    // Layout
    '--template-modern-sidebar-width': fontSettings.modernSidebarWidth,
  };

  return (
    <div className={styles.previewContainer} style={styleVariables}>
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
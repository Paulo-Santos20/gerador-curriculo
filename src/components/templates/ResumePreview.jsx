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

  // --- ATUALIZAÇÃO AQUI ---
  const fontStyleVariables = {
    '--font-heading-family': fontSettings.heading,
    '--font-body-family': fontSettings.body,
    '--font-size-name': fontSettings.sizeName,
    '--font-size-section-title': fontSettings.sizeSectionTitle,
    '--font-size-item-title': fontSettings.sizeItemTitle,
    '--font-size-body': fontSettings.sizeBody,
    '--template-accent-color': fontSettings.accentColor, // NOVO
  };
  // --- FIM DA ATUALIZAÇÃO ---

  return (
    <div className={styles.previewContainer} style={fontStyleVariables}>
      {renderTemplate()}
    </div>
  );
};

export default ResumePreview;
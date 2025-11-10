import React, { forwardRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import TemplateModern from './TemplateModern';
import TemplateClassic from './TemplateClassic';
import TemplateMinimalist from './TemplateMinimalist';
import styles from './ResumePreview.module.css';

const ResumePreview = forwardRef((props, ref) => {
  const { resumeData, template, fontSettings } = useResume();
  const data = resumeData;

  const renderTemplate = () => {
    switch (template) {
      case 'classic':
        return <TemplateClassic data={data} />;
      case 'modern':
        return <TemplateModern data={data} />;
      case 'minimalist':
        return <TemplateMinimalist data={data} />;
      default:
        return <TemplateModern data={data} />;
    }
  };

  // --- ATUALIZADO ---
  // Injeta TODAS as configurações de fonte como variáveis CSS
  const fontStyleVariables = {
    '--font-heading-family': fontSettings.heading,
    '--font-body-family': fontSettings.body,
    '--font-size-name': fontSettings.sizeName,
    '--font-size-section-title': fontSettings.sizeSectionTitle,
    '--font-size-item-title': fontSettings.sizeItemTitle,
    '--font-size-body': fontSettings.sizeBody,
  };
  // --- FIM DA ATUALIZAÇÃO ---

  return (
    <div ref={ref} className={styles.previewContainer} style={fontStyleVariables}>
      {renderTemplate()}
    </div>
  );
});

export default ResumePreview;
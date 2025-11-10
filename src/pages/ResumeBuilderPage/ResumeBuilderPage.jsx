import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useResume } from '../../context/ResumeContext';
import MasterResumeForm from '../../components/forms/MasterResumeForm';
import ResumePreview from '../../components/templates/ResumePreview';
import Button from '../../components/ui/Button';
import { IconChevronLeft, IconDownload } from '../../components/icons';
import styles from './ResumeBuilderPage.module.css';

const ResumeBuilderPage = () => {
  const { resumeData, template, goHome } = useResume();
  const previewRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => previewRef.current,
    documentTitle: `${resumeData.personalInfo.name || 'Meu-Curriculo'}-${template}`,
    pageStyle: `@page { size: A4; margin: 0; }`,
    onBeforePrint: () => document.body.classList.add('print-container'),
    onAfterPrint: () => document.body.classList.remove('print-container'),
  });

  return (
    <div className={styles.builderPage}>
      {/* Coluna do Formulário (Esquerda) */}
      <div className={styles.formColumn}>
        <div className={styles.header}>
          <Button onClick={goHome} variant="secondary">
            <IconChevronLeft />
            Trocar Modelo
          </Button>
          <Button onClick={handlePrint} variant="success">
            <IconDownload />
            Baixar PDF
          </Button>
        </div>
        <h2 className={styles.title}>2. Preencha seus Dados</h2>
        <MasterResumeForm />
      </div>

      {/* Coluna da Pré-visualização (Direita) */}
      <div className={styles.previewColumn}>
        <div className={styles.previewWrapper}>
          <ResumePreview ref={previewRef} />
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
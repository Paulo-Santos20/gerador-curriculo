import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useResume } from '../../context/ResumeContext';
import MasterResumeForm from '../../components/forms/MasterResumeForm';
import ResumePreview from '../../components/templates/ResumePreview';
import Button from '../../components/ui/Button';
// 1. IMPORTAR O NOVO ÍCONE
import { IconChevronLeft, IconDownload, IconFileText } from '../../components/icons';
import styles from './ResumeBuilderPage.module.css';

// 2. IMPORTAR OS ARQUIVOS CSS COMO TEXTO (PARA EMBUTIR NO HTML)
import globalCSS from '../../styles/global.css?inline';
import previewCSS from '../../components/templates/ResumePreview.module.css?inline';
import modernCSS from '../../components/templates/TemplateModern.module.css?inline';
import classicCSS from '../../components/templates/TemplateClassic.module.css?inline';
import minimalistCSS from '../../components/templates/TemplateMinimalist.module.css?inline';
import executivoCSS from '../../components/templates/TemplateExecutivo.module.css?inline';
import profissionalCSS from '../../components/templates/TemplateProfissional.module.css?inline';


const ResumeBuilderPage = () => {
  const { resumeData, template, goHome } = useResume();
  const printableRef = useRef(); // Ref para a versão de impressão/PDF

  // Lógica de Impressão (PDF)
  const handlePrint = useReactToPrint({
    content: () => printableRef.current,
    documentTitle: `${resumeData.personalInfo.name || 'Meu-Curriculo'}-${template}`,
    pageStyle: `@page { size: A4; margin: 0; }`,
  });

  // 3. NOVA LÓGICA DE DOWNLOAD (HTML)
  const handleDownloadHtml = () => {
    // Pega o HTML do currículo da nossa área de impressão
    const resumeHtml = printableRef.current.innerHTML;

    // Seleciona o CSS do template correto
    let templateCSS = '';
    switch (template) {
      case 'modern': templateCSS = modernCSS; break;
      case 'classic': templateCSS = classicCSS; break;
      case 'minimalist': templateCSS = minimalistCSS; break;
      case 'executivo': templateCSS = executivoCSS; break;
      case 'profissional': templateCSS = profissionalCSS; break;
    }

    // Cria um documento HTML completo como uma string
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="pt-br">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Meu Currículo</title>
        <style>
          /* Embutir CSS Global */
          ${globalCSS}
          
          /* Embutir CSS do Wrapper de Preview */
          ${previewCSS}
          
          /* Embutir CSS do Template Específico */
          ${templateCSS}

          /* Overrides para o arquivo HTML (para se parecer com o PDF) */
          body {
            background-color: #f0f0f0 !important;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
          }
          .previewContainer {
            width: 210mm;
            height: 297mm;
            font-size: 10pt !important; /* Tamanho de fonte padrão para Word */
            box-shadow: 0 0 10px rgba(0,0,0,0.5);
            margin: 0;
            overflow: visible;
          }
        </style>
      </head>
      <body>
        ${resumeHtml}
      </body>
      </html>
    `;

    // Cria um "Blob" (arquivo em memória)
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);

    // Cria um link falso para acionar o download
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resumeData.personalInfo.name || 'Meu-Curriculo'}.html`;
    document.body.appendChild(a);
    a.click();
    
    // Limpa
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.builderPage}>
      {/* Coluna do Formulário (Esquerda) */}
      <div className={styles.formColumn}>
        <div className={styles.header}>
          <Button onClick={goHome} variant="secondary">
            <IconChevronLeft />
            Trocar Modelo
          </Button>

          {/* 4. NOVO BOTÃO DE DOWNLOAD HTML */}
          <Button onClick={handleDownloadHtml} variant="secondary">
            <IconFileText />
            Baixar .HTML
          </Button>

          <Button onClick={handlePrint} variant="success">
            <IconDownload />
            Baixar PDF
          </Button>
        </div>
        <h2 className={styles.title}>2. Preencha seus Dados</h2>
        <MasterResumeForm />
      </div>

      {/* ... (Coluna da Pré-visualização e área de Impressão) ... */}
      <div className={styles.previewColumn}>
        <div className={styles.previewWrapper}>
          <ResumePreview />
        </div>
      </div>
      <div ref={printableRef} className={styles.printableArea}>
        <ResumePreview />
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
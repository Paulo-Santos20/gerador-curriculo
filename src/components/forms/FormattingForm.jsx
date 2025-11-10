import React from 'react';
import { useResume } from '../../context/ResumeContext';
import Select from '../ui/Select';
import Section from '../ui/Section';
import FormColorInput from '../ui/FormColorInput';
import styles from './MasterResumeForm.module.css'; // Reutiliza o .grid e .divider

// Opções de Fonte
const fontOptions = [
  { name: 'Padrão (Inter)', value: "'Inter', var(--font-primary)" },
  { name: 'Padrão (Georgia)', value: "'Georgia', var(--font-secondary)" },
  { name: 'Arial', value: "Arial, sans-serif" },
  { name: 'Verdana', value: "Verdana, sans-serif" },
  { name: 'Times New Roman', value: "'Times New Roman', serif" },
];
// Opções de Tamanho
const sizeOptions = {
  name: [
    { name: 'Padrão (3rem)', value: '3rem' },
    { name: 'Médio (2.5rem)', value: '2.5rem' },
    { name: 'Grande (3.5rem)', value: '3.5rem' },
  ],
  sectionTitle: [
    { name: 'Padrão (1.4rem)', value: '1.4rem' },
    { name: 'Pequeno (1.2rem)', value: '1.2rem' },
    { name: 'Médio (1.6rem)', value: '1.6rem' },
  ],
  itemTitle: [
    { name: 'Padrão (1.15rem)', value: '1.15rem' },
    { name: 'Pequeno (1rem)', value: '1rem' },
    { name: 'Médio (1.25rem)', value: '1.25rem' },
  ],
  body: [
    { name: 'Padrão (1rem)', value: '1rem' },
    { name: 'Pequeno (0.9rem)', value: '0.9rem' },
    { name: 'Médio (1.1rem)', value: '1.1rem' },
  ],
};
// Novas Opções de Espaçamento
const letterSpacingOptions = [
  { name: 'Apertado', value: '-0.05em' },
  { name: 'Normal', value: 'normal' },
  { name: 'Largo', value: '0.05em' },
];
const lineHeightOptions = [
  { name: 'Apertado (1.3)', value: '1.3' },
  { name: 'Normal (1.6)', value: '1.6' },
  { name: 'Relaxado (1.9)', value: '1.9' },
];
const sectionSpacingOptions = [
  { name: 'Pequeno', value: '15px' },
  { name: 'Médio', value: '20px' },
  { name: 'Grande', value: '30px' },
];
const sidebarWidthOptions = [
  { name: 'Estreita (25%)', value: '25%' },
  { name: 'Padrão (35%)', value: '35%' },
  { name: 'Larga (45%)', value: '45%' },
];

const FormattingForm = () => {
  const { fontSettings, handleFontChange, template } = useResume();

  return (
    <Section title="Estilo & Formatação" open={false}>
      
      <FormColorInput
        label="Cor de Destaque"
        name="accentColor"
        value={fontSettings.accentColor}
        onChange={(e) => handleFontChange('accentColor', e.target.value)}
      />
      <hr className={styles.divider} />

      <div className={styles.grid}>
        <Select
          label="Fonte (Títulos)"
          name="heading"
          value={fontSettings.heading}
          onChange={(e) => handleFontChange('heading', e.target.value)}
        >
          {fontOptions.map(font => <option key={font.value} value={font.value}>{font.name}</option>)}
        </Select>
        <Select
          label="Fonte (Corpo)"
          name="body"
          value={fontSettings.body}
          onChange={(e) => handleFontChange('body', e.target.value)}
        >
          {fontOptions.map(font => <option key={font.value} value={font.value}>{font.name}</option>)}
        </Select>
      </div>
      <hr className={styles.divider} /> 

      <div className={styles.grid}>
        <Select
          label="Tamanho (Nome)"
          name="sizeName"
          value={fontSettings.sizeName}
          onChange={(e) => handleFontChange('sizeName', e.target.value)}
        >
          {sizeOptions.name.map(size => <option key={size.value} value={size.value}>{size.name}</option>)}
        </Select>
        <Select
          label="Tamanho (Títulos de Seção)"
          name="sizeSectionTitle"
          value={fontSettings.sizeSectionTitle}
          onChange={(e) => handleFontChange('sizeSectionTitle', e.target.value)}
        >
          {sizeOptions.sectionTitle.map(size => <option key={size.value} value={size.value}>{size.name}</option>)}
        </Select>
        <Select
          label="Tamanho (Títulos de Itens)"
          name="sizeItemTitle"
          value={fontSettings.sizeItemTitle}
          onChange={(e) => handleFontChange('sizeItemTitle', e.target.value)}
        >
          {sizeOptions.itemTitle.map(size => <option key={size.value} value={size.value}>{size.name}</option>)}
        </Select>
        <Select
          label="Tamanho (Corpo)"
          name="sizeBody"
          value={fontSettings.sizeBody}
          onChange={(e) => handleFontChange('sizeBody', e.target.value)}
        >
          {sizeOptions.body.map(size => <option key={size.value} value={size.value}>{size.name}</option>)}
        </Select>
      </div>
      <hr className={styles.divider} />

      <div className={styles.grid}>
        <Select
          label="Espaçamento entre Letras"
          name="letterSpacing"
          value={fontSettings.letterSpacing}
          onChange={(e) => handleFontChange('letterSpacing', e.target.value)}
        >
          {letterSpacingOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
        </Select>
        <Select
          label="Espaçamento entre Parágrafos"
          name="lineHeight"
          value={fontSettings.lineHeight}
          onChange={(e) => handleFontChange('lineHeight', e.target.value)}
        >
          {lineHeightOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
        </Select>
        <Select
          label="Espaçamento entre Seções"
          name="sectionSpacing"
          value={fontSettings.sectionSpacing}
          onChange={(e) => handleFontChange('sectionSpacing', e.target.value)}
        >
          {sectionSpacingOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
        </Select>

        {/* Controlo de layout condicional (só aparece se o template for 'modern') */}
        {template === 'modern' && (
          <Select
            label="Largura Barra Lateral (Moderno)"
            name="modernSidebarWidth"
            value={fontSettings.modernSidebarWidth}
            onChange={(e) => handleFontChange('modernSidebarWidth', e.target.value)}
          >
            {sidebarWidthOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.name}</option>)}
          </Select>
        )}
      </div>
    </Section>
  );
};

export default FormattingForm;
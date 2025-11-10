import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormInput from '../ui/FormInput';
import Select from '../ui/Select';
import Section from '../ui/Section';
import Button from '../ui/Button';
import { IconPlus, IconTrash } from '../icons';
import styles from './FormStyles.module.css';

const LanguagesForm = () => {
  const { resumeData, handleSectionChange, addSectionItem, removeSectionItem } = useResume();
  const data = resumeData.languages;

  return (
    <Section title="Idiomas">
      <div className={styles.itemContainer}>
        {data.map((lang) => (
          <div key={lang.id} className={styles.simpleItem}>
            <FormInput label="" name="name" value={lang.name} onChange={(e) => handleSectionChange('languages', lang.id, e)} placeholder="Ex: Inglês"/>
            <Select label="" name="level" value={lang.level} onChange={(e) => handleSectionChange('languages', lang.id, e)}>
              <option>Básico</option>
              <option>Intermediário</option>
              <option>Avançado</option>
              <option>Fluente</option>
              <option>Nativo</option>
            </Select>
            <button
              type="button"
              className={styles.removeButton}
              style={{ position: 'static', padding: 'var(--spacing-sm)'}} // Override
              title="Remover Idioma"
              onClick={() => removeSectionItem('languages', lang.id)}
            >
              <IconTrash width="18" height="18" />
            </button>
          </div>
        ))}
        <Button variant="secondary" onClick={() => addSectionItem('languages')}>
          <IconPlus width="16" height="16" />
          Adicionar Idioma
        </Button>
      </div>
    </Section>
  );
};

export default LanguagesForm;
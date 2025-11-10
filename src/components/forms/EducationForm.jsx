import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormInput from '../ui/FormInput';
import Section from '../ui/Section';
import Button from '../ui/Button';
import { IconPlus, IconTrash } from '../icons';
import styles from './FormStyles.module.css';

const EducationForm = () => {
  const { resumeData, handleSectionChange, addSectionItem, removeSectionItem } = useResume();
  const data = resumeData.education;

  return (
    <Section title="Educação">
      <div className={styles.itemContainer}>
        {data.map((edu, index) => (
          <div key={edu.id} className={styles.item}>
            <button
              type="button"
              className={styles.removeButton}
              title="Remover Formação"
              onClick={() => removeSectionItem('education', edu.id)}
            >
              <IconTrash width="18" height="18" />
            </button>
            <div className={styles.grid}>
              <FormInput label={`Curso/Formação #${index + 1}`} name="degree" value={edu.degree} onChange={(e) => handleSectionChange('education', edu.id, e)} />
              <FormInput label="Instituição" name="school" value={edu.school} onChange={(e) => handleSectionChange('education', edu.id, e)} />
              <FormInput label="Local" name="location" value={edu.location} onChange={(e) => handleSectionChange('education', edu.id, e)} />
              <FormInput label="Data de Início" name="start" value={edu.start} onChange={(e) => handleSectionChange('education', edu.id, e)} placeholder="Ex: Jan/2018"/>
              <FormInput label="Data de Fim" name="end" value={edu.end} onChange={(e) => handleSectionChange('education', edu.id, e)} placeholder="Ex: Dez/2021"/>
            </div>
          </div>
        ))}
        <Button variant="secondary" onClick={() => addSectionItem('education')}>
          <IconPlus width="16" height="16" />
          Adicionar Formação
        </Button>
      </div>
    </Section>
  );
};

export default EducationForm;
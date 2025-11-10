import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormInput from '../ui/FormInput';
import FormTextarea from '../ui/FormTextarea';
import Section from '../ui/Section';
import Button from '../ui/Button';
import { IconPlus, IconTrash } from '../icons';
import styles from './FormStyles.module.css';

const ExperienceForm = () => {
  const { resumeData, handleSectionChange, addSectionItem, removeSectionItem } = useResume();
  const data = resumeData.experience;

  return (
    <Section title="Experiência Profissional">
      <div className={styles.itemContainer}>
        {data.map((exp, index) => (
          <div key={exp.id} className={styles.item}>
            <button
              type="button"
              className={styles.removeButton}
              title="Remover Experiência"
              onClick={() => removeSectionItem('experience', exp.id)}
            >
              <IconTrash width="18" height="18" />
            </button>
            <div className={styles.grid}>
              <FormInput label={`Cargo #${index + 1}`} name="title" value={exp.title} onChange={(e) => handleSectionChange('experience', exp.id, e)} />
              <FormInput label="Empresa" name="company" value={exp.company} onChange={(e) => handleSectionChange('experience', exp.id, e)} />
              <FormInput label="Local" name="location" value={exp.location} onChange={(e) => handleSectionChange('experience', exp.id, e)} />
              <FormInput label="Data de Início" name="start" value={exp.start} onChange={(e) => handleSectionChange('experience', exp.id, e)} placeholder="Ex: Jan/2020"/>
              <FormInput label="Data de Fim" name="end" value={exp.end} onChange={(e) => handleSectionChange('experience', exp.id, e)} placeholder="Ex: Dez/2022 ou Atual"/>
            </div>
            <FormTextarea
              label="Descrição"
              name="description"
              value={exp.description}
              onChange={(e) => handleSectionChange('experience', exp.id, e)}
              placeholder="Descrição das responsabilidades e conquistas..."
            />
          </div>
        ))}
        <Button variant="secondary" onClick={() => addSectionItem('experience')}>
          <IconPlus width="16" height="16" />
          Adicionar Experiência
        </Button>
      </div>
    </Section>
  );
};

export default ExperienceForm;
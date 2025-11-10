import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormInput from '../ui/FormInput';
import Section from '../ui/Section';
import Button from '../ui/Button';
import { IconPlus, IconTrash } from '../icons';
import styles from './FormStyles.module.css';

const SkillsForm = () => {
  const { resumeData, handleSectionChange, addSectionItem, removeSectionItem } = useResume();
  const data = resumeData.skills;

  return (
    <Section title="Habilidades">
      <div className={styles.itemContainer}>
        {data.map((skill) => (
          <div key={skill.id} className={styles.simpleItem}>
            <FormInput label="" name="name" value={skill.name} onChange={(e) => handleSectionChange('skills', skill.id, e)} placeholder="Ex: React"/>
            <button
              type="button"
              className={styles.removeButton}
              style={{ position: 'static', padding: 'var(--spacing-sm)'}} // Override
              title="Remover Habilidade"
              onClick={() => removeSectionItem('skills', skill.id)}
            >
              <IconTrash width="18" height="18" />
            </button>
          </div>
        ))}
        <Button variant="secondary" onClick={() => addSectionItem('skills')}>
          <IconPlus width="16" height="16" />
          Adicionar Habilidade
        </Button>
      </div>
    </Section>
  );
};

export default SkillsForm;
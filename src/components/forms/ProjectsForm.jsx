import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormInput from '../ui/FormInput';
import FormTextarea from '../ui/FormTextarea';
import Section from '../ui/Section';
import Button from '../ui/Button';
import { IconPlus, IconTrash } from '../icons';
import styles from './FormStyles.module.css';

const ProjectsForm = () => {
  const { resumeData, handleSectionChange, addSectionItem, removeSectionItem } = useResume();
  const data = resumeData.projects;

  return (
    <Section title="Projetos (Opcional)" open={false}>
      <div className={styles.itemContainer}>
        {data.map((proj, index) => (
          <div key={proj.id} className={styles.item}>
            <button
              type="button"
              className={styles.removeButton}
              title="Remover Projeto"
              onClick={() => removeSectionItem('projects', proj.id)}
            >
              <IconTrash width="18" height="18" />
            </button>
            <FormInput label={`Nome do Projeto #${index + 1}`} name="name" value={proj.name} onChange={(e) => handleSectionChange('projects', proj.id, e)} />
            <FormInput label="Link" name="link" value={proj.link} onChange={(e) => handleSectionChange('projects', proj.id, e)} placeholder="https://github.com/..."/>
            <FormTextarea
              label="Descrição"
              name="description"
              value={proj.description}
              onChange={(e) => handleSectionChange('projects', proj.id, e)}
              placeholder="Descrição breve do projeto..."
            />
          </div>
        ))}
        <Button variant="secondary" onClick={() => addSectionItem('projects')}>
          <IconPlus width="16" height="16" />
          Adicionar Projeto
        </Button>
      </div>
    </Section>
  );
};

export default ProjectsForm;
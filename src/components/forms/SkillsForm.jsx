import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormInput from '../ui/FormInput';
import Section from '../ui/Section';
import Button from '../ui/Button';
import { IconPlus, IconTrash } from '../icons';
import styles from './FormStyles.module.css'; // Usamos estilos já existentes

const SkillsForm = () => {
  const { resumeData, handleSectionChange, addSectionItem, removeSectionItem } = useResume();
  const data = resumeData.skills;

  return (
    <Section title="Habilidades">
      <div className={styles.itemContainer}>
        {data.map((skill) => (
          // --- ATUALIZAÇÃO AQUI ---
          // Trocamos 'simpleItem' por 'item' para um layout mais robusto
          <div key={skill.id} className={styles.item}>
            <button
              type="button"
              className={styles.removeButton}
              title="Remover Habilidade"
              onClick={() => removeSectionItem('skills', skill.id)}
            >
              <IconTrash width="18" height="18" />
            </button>
            
            {/* Usamos o .grid para alinhar os inputs */}
            <div className={styles.grid}>
              <FormInput 
                label="Habilidade" 
                name="name" 
                value={skill.name} 
                onChange={(e) => handleSectionChange('skills', skill.id, e)} 
                placeholder="Ex: React"
              />
              {/* NOVO INPUT PARA CATEGORIA */}
              <FormInput 
                label="Categoria" 
                name="category" 
                value={skill.category} 
                onChange={(e) => handleSectionChange('skills', skill.id, e)} 
                placeholder="Ex: Técnica, Pessoal"
              />
            </div>
          </div>
          // --- FIM DA ATUALIZAÇÃO ---
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
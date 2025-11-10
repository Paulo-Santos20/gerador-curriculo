import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormInput from '../ui/FormInput';
import Section from '../ui/Section';
import Button from '../ui/Button';
import { IconPlus, IconTrash } from '../icons';
import styles from './FormStyles.module.css';

const CertificationsForm = () => {
  const { resumeData, handleSectionChange, addSectionItem, removeSectionItem } = useResume();
  const data = resumeData.certifications;

  return (
    <Section title="Cursos & Certificações" open={false}>
      <div className={styles.itemContainer}>
        {data.map((cert, index) => (
          <div key={cert.id} className={styles.item}>
            <button
              type="button"
              className={styles.removeButton}
              title="Remover Certificação"
              onClick={() => removeSectionItem('certifications', cert.id)}
            >
              <IconTrash width="18" height="18" />
            </button>
            
            <FormInput 
              label={`Curso/Certificação #${index + 1}`} 
              name="name" 
              value={cert.name} 
              onChange={(e) => handleSectionChange('certifications', cert.id, e)} 
              placeholder="Ex: AWS Cloud Practitioner"
            />
            
            <div className={styles.grid}>
              <FormInput 
                label="Organização/Plataforma" 
                name="issuer" 
                value={cert.issuer} 
                onChange={(e) => handleSectionChange('certifications', cert.id, e)} 
                placeholder="Ex: AWS, Udemy"
              />
              <FormInput 
                label="Ano" 
                name="year" 
                value={cert.year} 
                onChange={(e) => handleSectionChange('certifications', cert.id, e)} 
                placeholder="Ex: 2024"
              />
            </div>
          </div>
        ))}
        <Button variant="secondary" onClick={() => addSectionItem('certifications')}>
          <IconPlus width="16" height="16" />
          Adicionar Certificação
        </Button>
      </div>
    </Section>
  );
};

export default CertificationsForm;
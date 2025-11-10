import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import CertificationsForm from './CertificationsForm';
import SkillsForm from './SkillsForm';
import LanguagesForm from './LanguagesForm';
import ProjectsForm from './ProjectsForm';
import FormattingForm from './FormattingForm'; // Nome atualizado
import SectionToggleForm from './SectionToggleForm';
import LayoutEditorForm from './LayoutEditorForm'; // Novo formulário
import styles from './MasterResumeForm.module.css';

const MasterResumeForm = () => {
  return (
    <form className={styles.masterForm}>
      <SectionToggleForm />
      <FormattingForm /> 
      <LayoutEditorForm /> {/* Adicionado */}
      <PersonalInfoForm />
      <SummaryForm />
      <ExperienceForm />
      <EducationForm />
      <CertificationsForm />
      
      <div className={styles.grid}>
        <SkillsForm />
        <LanguagesForm />
      </div>
      
      <ProjectsForm />
    </form>
  );
};

export default MasterResumeForm;
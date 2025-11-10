import React from 'react';
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import SkillsForm from './SkillsForm';
import LanguagesForm from './LanguagesForm';
import ProjectsForm from './ProjectsForm';
import FontSettingsForm from './FontSettingsForm'; // --- NOVO: Importar ---
import styles from './MasterResumeForm.module.css';

const MasterResumeForm = () => {
  return (
    <form className={styles.masterForm}>
      <FontSettingsForm /> {/* --- NOVO: Adicionar --- */}
      <PersonalInfoForm />
      <SummaryForm />
      <ExperienceForm />
      <EducationForm />
      <div className={styles.grid}>
        <SkillsForm />
        <LanguagesForm />
      </div>
      <ProjectsForm />
    </form>
  );
};

export default MasterResumeForm;
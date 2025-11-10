import React from 'react';
// Não precisamos mais do 'useResume' aqui, pois os formulários são sempre exibidos
import PersonalInfoForm from './PersonalInfoForm';
import SummaryForm from './SummaryForm';
import ExperienceForm from './ExperienceForm';
import EducationForm from './EducationForm';
import CertificationsForm from './CertificationsForm';
import SkillsForm from './SkillsForm';
import LanguagesForm from './LanguagesForm';
import ProjectsForm from './ProjectsForm';
import FontSettingsForm from './FontSettingsForm';
import SectionToggleForm from './SectionToggleForm';
import styles from './MasterResumeForm.module.css';

const MasterResumeForm = () => {
  // Não precisamos mais obter o 'sectionVisibility' aqui

  return (
    <form className={styles.masterForm}>
      {/* Estes 3 formulários estão sempre visíveis */}
      <SectionToggleForm />
      <FontSettingsForm /> 
      <PersonalInfoForm />

      {/* --- ATUALIZAÇÃO AQUI --- */}
      {/* Removemos a lógica condicional (&&) para que os formulários
          de entrada de dados estejam SEMPRE visíveis. */}
      
      <SummaryForm />
      <ExperienceForm />
      <EducationForm />
      <CertificationsForm />
      
      <div className={styles.grid}>
        <SkillsForm />
        <LanguagesForm />
      </div>
      
      <ProjectsForm />
      
      {/* --- FIM DA ATUALIZAÇÃO --- */}
    </form>
  );
};

export default MasterResumeForm;
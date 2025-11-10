import React from 'react';
import { useResume } from '../../context/ResumeContext';
import Section from '../ui/Section';
import ToggleSwitch from '../ui/ToggleSwitch';
import styles from './FormStyles.module.css';

const SectionToggleForm = () => {
  const { sectionVisibility, handleSectionToggle } = useResume();

  return (
    <Section title="Exibir Seções" open={false}>
      <div className={styles.itemContainer}>
        <ToggleSwitch
          label="Resumo"
          name="summary"
          checked={sectionVisibility.summary}
          onChange={() => handleSectionToggle('summary')}
        />
        <ToggleSwitch
          label="Experiência"
          name="experience"
          checked={sectionVisibility.experience}
          onChange={() => handleSectionToggle('experience')}
        />
        <ToggleSwitch
          label="Educação"
          name="education"
          checked={sectionVisibility.education}
          onChange={() => handleSectionToggle('education')}
        />
        {/* --- NOVO TOGGLE --- */}
        <ToggleSwitch
          label="Cursos & Certificações"
          name="certifications"
          checked={sectionVisibility.certifications}
          onChange={() => handleSectionToggle('certifications')}
        />
        {/* --- FIM NOVO TOGGLE --- */}
        <ToggleSwitch
          label="Habilidades"
          name="skills"
          checked={sectionVisibility.skills}
          onChange={() => handleSectionToggle('skills')}
        />
        <ToggleSwitch
          label="Idiomas"
          name="languages"
          checked={sectionVisibility.languages}
          onChange={() => handleSectionToggle('languages')}
        />
        <ToggleSwitch
          label="Projetos"
          name="projects"
          checked={sectionVisibility.projects}
          onChange={() => handleSectionToggle('projects')}
        />
      </div>
    </Section>
  );
};

export default SectionToggleForm;
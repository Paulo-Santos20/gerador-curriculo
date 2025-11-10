import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormTextarea from '../ui/FormTextarea';
import Section from '../ui/Section';

const SummaryForm = () => {
  const { resumeData, handleChange } = useResume();

  return (
    <Section title="Resumo Profissional">
      <FormTextarea
        label=""
        name="summary"
        value={resumeData.summary}
        onChange={handleChange}
        placeholder="Fale sobre suas principais qualificações, experiências e objetivos..."
        rows={5}
      />
    </Section>
  );
};

export default SummaryForm;
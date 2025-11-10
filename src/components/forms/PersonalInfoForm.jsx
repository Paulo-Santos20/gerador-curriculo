import React from 'react';
import { useResume } from '../../context/ResumeContext';
import FormInput from '../ui/FormInput';
import Section from '../ui/Section';
import styles from './FormStyles.module.css';

const PersonalInfoForm = () => {
  const { resumeData, handleChange } = useResume();
  const data = resumeData.personalInfo;

  return (
    <Section title="Informações Pessoais">
      <div className={styles.grid}>
        <FormInput label="Nome Completo" name="name" value={data.name} onChange={handleChange} placeholder="Seu Nome" data-section="personalInfo" />
        <FormInput label="Cargo Desejado" name="title" value={data.title} onChange={handleChange} placeholder="Ex: Desenvolvedor Front-end" data-section="personalInfo" />
        <FormInput label="E-mail" name="email" value={data.email} onChange={handleChange} placeholder="seu.email@exemplo.com" data-section="personalInfo" />
        <FormInput label="Telefone" name="phone" value={data.phone} onChange={handleChange} placeholder="(XX) 9XXXX-XXXX" data-section="personalInfo" />
        <FormInput label="Endereço" name="address" value={data.address} onChange={handleChange} placeholder="Cidade, Estado" data-section="personalInfo" />
        <FormInput label="LinkedIn (URL)" name="linkedIn" value={data.linkedIn} onChange={handleChange} placeholder="linkedin.com/in/seu-perfil" data-section="personalInfo" />
        <FormInput label="Portfólio (URL)" name="portfolio" value={data.portfolio} onChange={handleChange} placeholder="seuportfolio.com" data-section="personalInfo" />
      </div>
    </Section>
  );
};

export default PersonalInfoForm;
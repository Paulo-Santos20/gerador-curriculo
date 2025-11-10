import React from 'react';
import styles from './TemplateExecutivo.module.css';
import { useResume } from '../../context/ResumeContext';

const TemplateExecutivo = ({ data }) => {
  const { personalInfo, summary, experience, education, certifications, skills, languages, projects } = data;
  const { sectionVisibility, layoutOrder } = useResume();

  // --- CORREÇÃO AQUI ---
  const sectionMap = {
    summary: (
      <section key="summary" className={styles.section}>
        <h3 className={styles.sectionTitle}>Resumo</h3>
        <p className={styles.summary}>{summary || "Profissional com experiência em... buscando oportunidades..."}</p>
      </section>
    ),
    experience: (
      <section key="experience" className={styles.section}>
        <h3 className={styles.sectionTitle}>Experiência Profissional</h3>
        {experience.length > 0 ? (
          experience.map(exp => (
            <div key={exp.id} className={styles.item}>
              <p className={styles.itemSubtitle}><strong>{exp.company || "Empresa"}</strong></p>
              <p className={styles.itemHeader}>
                <span className={styles.itemTitle}>{exp.title || "Cargo"}</span>
                <span className={styles.itemDate}>{exp.start || "Mês/Ano"} - {exp.end || "Mês/Ano"}</span>
              </p>
              <p className={styles.itemDesc}>{exp.description || "Descrição de suas responsabilidades e conquistas."}</p>
            </div>
          ))
        ) : (
           <div className={styles.item}>
            <p className={styles.itemSubtitle}><strong>Empresa</strong></p>
            <p className={styles.itemHeader}>
              <span className={styles.itemTitle}>Cargo</span>
              <span className={styles.itemDate}>Mês/Ano - Mês/Ano</span>
            </p>
           </div>
        )}
      </section>
    ),
    education: (
      <section key="education" className={styles.section}>
        <h3 className={styles.sectionTitle}>Formação Acadêmica</h3>
        {education.length > 0 ? (
          education.map(edu => (
            <div key={edu.id} className={styles.item}>
              <p className={styles.itemSubtitle}><strong>{edu.degree || "Curso ou Formação"}</strong></p>
              <p className={styles.itemDesc}>{edu.school || "Instituição de Ensino"} | {edu.start || "Mês/Ano"} - {edu.end || "Mês/Ano"}</p>
            </div>
          ))
        ) : (
          <div className={styles.item}>
            <p className={styles.itemSubtitle}><strong>Curso ou Formação</strong></p>
            <p className={styles.itemDesc}>Instituição de Ensino | Mês/Ano - Mês/Ano</p>
          </div>
        )}
      </section>
    ),
    certifications: (
      <section key="certifications" className={styles.section}>
        <h3 className={styles.sectionTitle}>Cursos & Aprimoramentos</h3>
        <ul className={styles.skillsList}>
          {certifications.length > 0 ? (
            certifications.map(cert => (
              <li key={cert.id}>
                <strong>{cert.name || "Nome do Curso"}</strong> ({cert.issuer || "Organização"} - {cert.year || "Ano"})
              </li>
            ))
          ) : (
            <li><strong>Nome do Curso</strong> (Organização - Ano)</li>
          )}
        </ul>
      </section>
    ),
    skills: (
      <section key="skills" className={styles.section}>
        <h3 className={styles.sectionTitle}>Habilidades</h3>
        <ul className={styles.skillsList}>
          {skills.length > 0 ? (
            skills.map(skill => <li key={skill.id}>{skill.name}</li>)
          ) : (
            <li>Habilidade 1</li>
          )}
        </ul>
      </section>
    ),
    languages: (
       <section key="languages" className={styles.section}>
        <h3 className={styles.sectionTitle}>Idiomas</h3>
        <ul className={styles.skillsList}>
          {languages.map(lang => (
            <li key={lang.id}>
              {lang.name} <span>({lang.level})</span>
            </li>
          ))}
        </ul>
      </section>
    ),
    projects: (
      <section key="projects" className={styles.section}>
        <h3 className={styles.sectionTitle}>Projetos</h3>
        {projects.map(proj => (
          <div key={proj.id} className={styles.item}>
            <h4 className={styles.itemTitle}>{proj.name || "Nome do Projeto"}</h4>
            <p className={styles.itemSubtitleLink}>{proj.link || "link-do-projeto.com"}</p>
            <p className={styles.itemDesc}>{proj.description || "Descrição do projeto."}</p>
          </div>
        ))}
      </section>
    ),
  };
  // --- FIM DA CORREÇÃO ---

  const safeLayoutOrder = Array.isArray(layoutOrder) 
    ? layoutOrder 
    : ['summary', 'experience', 'education', 'certifications', 'skills', 'languages', 'projects'];

  return (
    <div className={styles.executivo}>
      <header className={styles.header}>
        <h1 className={styles.name}>{personalInfo.name || "Seu Nome"}</h1>
        <p className={styles.address}>{personalInfo.address || "Cidade, Estado"}</p>
        <div className={styles.contactInfo}>
          <span>{personalInfo.email || "seu.email@exemplo.com"}</span>
          <span>&bull;</span>
          <span>{personalInfo.phone || "(XX) XXXX-XXXX"}</span>
        </div>
         <div className={styles.links}>
          <span>{personalInfo.linkedIn || "linkedin.com/in/..."}</span>
          {personalInfo.portfolio && <span>&bull;</span>}
          <span>{personalInfo.portfolio}</span>
        </div>
      </header>

      {safeLayoutOrder.map(key => {
        if (!sectionMap[key] || !sectionVisibility[key]) return null;
        if (key === 'languages' && languages.length === 0) return null;
        if (key === 'projects' && projects.length === 0) return null;
        return sectionMap[key];
      })}
    </div>
  );
};

export default TemplateExecutivo;
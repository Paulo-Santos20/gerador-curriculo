import React from 'react';
import styles from './TemplateClassic.module.css';
import { useResume } from '../../context/ResumeContext';

const TemplateClassic = ({ data }) => {
  const { personalInfo, summary, experience, education, certifications, skills, languages, projects } = data;
  const { sectionVisibility, layoutOrder } = useResume();

  // --- CORREÇÃO AQUI ---
  // O 'sectionMap' agora é preenchido IMEDIATAMENTE dentro do componente.
  const sectionMap = {
    summary: (
      <section key="summary" className={styles.section}>
        <h3 className={styles.sectionTitle}>Resumo Profissional</h3>
        <p className={styles.summary}>{summary || "Escreva um breve resumo sobre suas qualificações e objetivos."}</p>
      </section>
    ),
    experience: (
      <section key="experience" className={styles.section}>
        <h3 className={styles.sectionTitle}>Experiência Profissional</h3>
        {experience.length > 0 ? (
          experience.map(exp => (
            <div key={exp.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <h4 className={styles.itemTitle}>{exp.title || "Cargo"}</h4>
                <span className={styles.itemDate}>{exp.start || "Mês/Ano"} - {exp.end || "Mês/Ano"}</span>
              </div>
              <p className={styles.itemSubtitle}>{exp.company || "Empresa"} | {exp.location || "Local"}</p>
              <p className={styles.itemDesc}>{exp.description || "Descrição de suas responsabilidades e conquistas."}</p>
            </div>
          ))
        ) : (
          <div className={styles.item}>
            <div className={styles.itemHeader}><h4 className={styles.itemTitle}>Cargo</h4></div>
            <p className={styles.itemSubtitle}>Empresa | Local</p>
          </div>
        )}
      </section>
    ),
    education: (
      <section key="education" className={styles.section}>
        <h3 className={styles.sectionTitle}>Educação</h3>
        {education.length > 0 ? (
          education.map(edu => (
            <div key={edu.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <h4 className={styles.itemTitle}>{edu.degree || "Curso ou Formação"}</h4>
                <span className={styles.itemDate}>{edu.start || "Mês/Ano"} - {edu.end || "Mês/Ano"}</span>
              </div>
              <p className={styles.itemSubtitle}>{edu.school || "Instituição"} | {edu.location || "Local"}</p>
            </div>
          ))
        ) : (
          <div className={styles.item}>
            <div className={styles.itemHeader}><h4 className={styles.itemTitle}>Curso ou Formação</h4></div>
            <p className={styles.itemSubtitle}>Instituição | Local</p>
          </div>
        )}
      </section>
    ),
    certifications: (
      <section key="certifications" className={styles.section}>
        <h3 className={styles.sectionTitle}>Cursos & Certificações</h3>
        {certifications.length > 0 ? (
          certifications.map(cert => (
            <div key={cert.id} className={styles.item}>
              <h4 className={styles.itemTitle}>{cert.name || "Nome do Curso"}</h4>
              <p className={styles.itemSubtitle}>{cert.issuer || "Organização"} - {cert.year || "Ano"}</p>
            </div>
          ))
        ) : (
          <div className={styles.item}>
            <h4 className={styles.itemTitle}>Nome do Curso</h4>
            <p className={styles.itemSubtitle}>Organização - Ano</p>
          </div>
        )}
      </section>
    ),
    skills: (
      <section key="skills" className={styles.section}>
        <h3 className={styles.sectionTitle}>Habilidades</h3>
        <ul className={styles.list}>
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
        <ul className={styles.list}>
          {languages.length > 0 ? (
            languages.map(lang => (
              <li key={lang.id}>{lang.name} <span>({lang.level})</span></li>
            ))
          ) : (
            <li>Idioma (Nível)</li>
          )}
        </ul>
      </section>
    ),
    projects: (
      <section key="projects" className={styles.section}>
        <h3 className={styles.sectionTitle}>Projetos</h3>
        {projects.length > 0 ? (
          projects.map(proj => (
            <div key={proj.id} className={styles.item}>
              <h4 className={styles.itemTitle}>{proj.name || "Nome do Projeto"}</h4>
              <p className={styles.itemSubtitleLink}>{proj.link || "link-do-projeto.com"}</p>
              <p className={styles.itemDesc}>{proj.description || "Descrição do projeto."}</p>
            </div>
          ))
        ) : (
          <div className={styles.item}>
            <h4 className={styles.itemTitle}>Nome do Projeto</h4>
          </div>
        )}
      </section>
    ),
  };
  // --- FIM DA CORREÇÃO ---

  const safeLayoutOrder = Array.isArray(layoutOrder) 
    ? layoutOrder 
    : ['summary', 'experience', 'education', 'certifications', 'skills', 'languages', 'projects'];

  return (
    <div className={styles.classic}>
      <header className={styles.header}>
        <h1 className={styles.name}>{personalInfo.name || "Seu Nome"}</h1>
        <h2 className={styles.title}>{personalInfo.title || "Cargo Desejado"}</h2>
        <div className={styles.contactInfo}>
          <span>{personalInfo.phone || "(XX) XXXX-XXXX"}</span>
          <span>&bull;</span>
          <span>{personalInfo.email || "seu.email@exemplo.com"}</span>
          <span>&bull;</span>
          <span>{personalInfo.address || "Cidade, Estado"}</span>
        </div>
        <div className={styles.links}>
          <span>{personalInfo.linkedIn || "linkedin.com/in/..."}</span>
          {personalInfo.portfolio && <span>&bull;</span>}
          <span>{personalInfo.portfolio}</span>
        </div>
      </header>

      {safeLayoutOrder.map(key => {
        if (!sectionMap[key] || !sectionVisibility[key]) return null;
        
        if (key === 'skills' || key === 'languages') {
          if (key === 'languages' && sectionVisibility.skills) return null;
          if (key === 'skills' && !sectionVisibility.skills) {
             return sectionVisibility.languages ? sectionMap.languages : null;
          }
          
          return (
            <div key="grid" className={styles.grid}>
              {sectionVisibility.skills && sectionMap.skills}
              {sectionVisibility.languages && sectionMap.languages}
            </div>
          );
        }
        
        if (key === 'projects' && projects.length === 0) return null;

        return sectionMap[key];
      })}
    </div>
  );
};

export default TemplateClassic;
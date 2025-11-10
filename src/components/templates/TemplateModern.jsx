import React from 'react';
import styles from './TemplateModern.module.css';
import { useResume } from '../../context/ResumeContext';

const TemplateModern = ({ data }) => {
  const { personalInfo, summary, experience, education, certifications, skills, languages, projects } = data;
  const { sectionVisibility, layoutOrder } = useResume();

  // --- CORREÇÃO AQUI ---
  const sectionMap = {
    summary: (
      <section key="summary" className={styles.section}>
        <h3 className={styles.mainTitle}>Resumo Profissional</h3>
        <p className={styles.summary}>{summary || "Escreva um breve resumo sobre suas qualificações e objetivos."}</p>
      </section>
    ),
    experience: (
      <section key="experience" className={styles.section}>
        <h3 className={styles.mainTitle}>Experiência Profissional</h3>
        {experience.length > 0 ? (
          experience.map(exp => (
            <div key={exp.id} className={styles.item}>
              <h4 className={styles.itemTitle}>{exp.title || "Cargo"}</h4>
              <p className={styles.itemSubtitle}>{exp.company || "Empresa"} | {exp.location || "Local"}</p>
              <p className={styles.itemDate}>{exp.start || "Mês/Ano"} - {exp.end || "Mês/Ano"}</p>
              <p className={styles.itemDesc}>{exp.description || "Descrição de suas responsabilidades e conquistas."}</p>
            </div>
          ))
        ) : (
          <div className={styles.item}>
            <h4 className={styles.itemTitle}>Cargo</h4>
            <p className={styles.itemSubtitle}>Empresa | Local</p>
          </div>
        )}
      </section>
    ),
    education: (
      <section key="education" className={styles.section}>
        <h3 className={styles.mainTitle}>Educação</h3>
        {education.length > 0 ? (
          education.map(edu => (
            <div key={edu.id} className={styles.item}>
              <h4 className={styles.itemTitle}>{edu.degree || "Curso ou Formação"}</h4>
              <p className={styles.itemSubtitle}>{edu.school || "Instituição"} | {edu.location || "Local"}</p>
              <p className={styles.itemDate}>{edu.start || "Mês/Ano"} - {edu.end || "Mês/Ano"}</p>
            </div>
          ))
        ) : (
           <div className={styles.item}>
            <h4 className={styles.itemTitle}>Curso ou Formação</h4>
            <p className={styles.itemSubtitle}>Instituição | Local</p>
          </div>
        )}
      </section>
    ),
    certifications: (
      <section key="certifications" className={styles.section}>
        <h3 className={styles.mainTitle}>Cursos & Certificações</h3>
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
        {languages.length > 0 ? (
          languages.map(lang => (
            <p key={lang.id}>
              {lang.name} <span>({lang.level})</span>
            </p>
          ))
        ) : (
          <p>Idioma (Nível)</p>
        )}
      </section>
    ),
    projects: (
      <section key="projects" className={styles.section}>
        <h3 className={styles.mainTitle}>Projetos</h3>
        {projects.length > 0 ? (
          projects.map(proj => (
            <div key={proj.id} className={styles.item}>
              <h4 className={styles.itemTitle}>{proj.name || "Nome do Projeto"}</h4>
              <p className={styles.itemSubtitle}>{proj.link || "link-do-projeto.com"}</p>
              <p className={styles.itemDesc}>{proj.description || "Descrição do projeto."}</p>
            </div>
          ))
        ) : (
           <div className={styles.item}><h4 className={styles.itemTitle}>Nome do Projeto</h4></div>
        )}
      </section>
    ),
  };
  // --- FIM DA CORREÇÃO ---

  const safeLayoutOrder = Array.isArray(layoutOrder) 
    ? layoutOrder 
    : ['summary', 'experience', 'education', 'certifications', 'skills', 'languages', 'projects'];

  const sidebarSections = ['skills', 'languages'];
  const mainSections = ['summary', 'experience', 'education', 'certifications', 'projects'];

  return (
    <div className={styles.modern}>
      <div className={styles.sidebar}>
        <h1 className={styles.name}>{personalInfo.name || "Seu Nome"}</h1>
        <h2 className={styles.title}>{personalInfo.title || "Cargo Desejado"}</h2>
        
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Contato</h3>
          <p>{personalInfo.phone || "(XX) XXXX-XXXX"}</p>
          <p className={styles.break}>{personalInfo.email || "seu.email@exemplo.com"}</p>
          <p>{personalInfo.address || "Cidade, Estado"}</p>
          <p className={styles.break}>{personalInfo.linkedIn || "linkedin.com/in/..."}</p>
          <p className={styles.break}>{personalInfo.portfolio || "seuportfolio.com"}</p>
        </section>

        {safeLayoutOrder
          .filter(key => sidebarSections.includes(key))
          .map(key => sectionVisibility[key] && sectionMap[key])
        }
      </div>
      
      <div className={styles.main}>
        {safeLayoutOrder
          .filter(key => mainSections.includes(key))
          .map(key => {
            if (key === 'projects' && projects.length === 0) return null;
            return sectionVisibility[key] && sectionMap[key];
          })
        }
      </div>
    </div>
  );
};

export default TemplateModern;
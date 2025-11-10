import React from 'react';
import styles from './TemplateClassic.module.css';

const TemplateClassic = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, languages, projects } = data;

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

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Resumo Profissional</h3>
        <p className={styles.summary}>{summary || "Escreva um breve resumo sobre suas qualificações e objetivos."}</p>
      </section>

      <section className={styles.section}>
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
            <div className={styles.itemHeader}>
              <h4 className={styles.itemTitle}>Cargo</h4>
              <span className={styles.itemDate}>Mês/Ano - Mês/Ano</span>
            </div>
            <p className={styles.itemSubtitle}>Empresa | Local</p>
            <p className={styles.itemDesc}>Descrição de suas responsabilidades e conquistas.</p>
          </div>
        )}
      </section>

      <section className={styles.section}>
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
            <div className={styles.itemHeader}>
              <h4 className={styles.itemTitle}>Curso ou Formação</h4>
              <span className={styles.itemDate}>Mês/Ano - Mês/Ano</span>
            </div>
            <p className={styles.itemSubtitle}>Instituição | Local</p>
          </div>
        )}
      </section>

      <div className={styles.grid}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Habilidades</h3>
          <ul className={styles.list}>
            {skills.length > 0 ? (
              skills.map(skill => <li key={skill.id}>{skill.name}</li>)
            ) : (
              <li>Habilidade 1</li>
            )}
          </ul>
        </section>
        
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Idiomas</h3>
          <ul className={styles.list}>
            {languages.length > 0 ? (
              languages.map(lang => (
                <li key={lang.id}>
                  {lang.name} <span>({lang.level})</span>
                </li>
              ))
            ) : (
              <li>Idioma (Nível)</li>
            )}
          </ul>
        </section>
      </div>

      {projects.length > 0 && (
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Projetos</h3>
          {projects.map(proj => (
            <div key={proj.id} className={styles.item}>
              <h4 className={styles.itemTitle}>{proj.name || "Nome do Projeto"}</h4>
              <p className={styles.itemSubtitleLink}>{proj.link || "link-do-projeto.com"}</p>
              <p className={styles.itemDesc}>{proj.description || "Descrição do projeto."}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};

export default TemplateClassic;
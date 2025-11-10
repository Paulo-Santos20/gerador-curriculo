import React from 'react';
import styles from './TemplateProfissional.module.css';

const TemplateProfissional = ({ data }) => {
  const { personalInfo, summary, experience, education, skills, languages, projects } = data;

  return (
    <div className={styles.profissional}>
      <header className={styles.header}>
        <h1 className={styles.name}>{personalInfo.name || "Seu Nome"}</h1>
        <h2 className={styles.title}>{personalInfo.title || "Cargo Desejado"}</h2>
        <p className={styles.address}>{personalInfo.address || "Cidade, Estado"}</p>
        <div className={styles.contactInfo}>
          <span>{personalInfo.phone || "(XX) XXXX-XXXX"}</span>
          <span>&bull;</span>
          <span>{personalInfo.email || "seu.email@exemplo.com"}</span>
        </div>
        <div className={styles.links}>
          <span>{personalInfo.linkedIn || "linkedin.com/in/..."}</span>
          {personalInfo.portfolio && <span>&bull;</span>}
          <span>{personalInfo.portfolio}</span>
        </div>
      </header>

      <section className={styles.section}>
        <p className={styles.summary}>{summary || "Escreva um breve resumo sobre suas qualificações e objetivos."}</p>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Formação Acadêmica</h3>
        {education.length > 0 ? (
          education.map(edu => (
            <div key={edu.id} className={styles.item}>
              <h4 className={styles.itemTitle}>{edu.degree || "Curso ou Formação"}</h4>
              <p className={styles.itemSubtitle}>{edu.school || "Instituição de Ensino"} | {edu.location || "Local"}</p>
              <p className={styles.itemDate}>{edu.start || "Mês/Ano"} - {edu.end || "Mês/Ano"}</p>
            </div>
          ))
        ) : (
          <div className={styles.item}>
            <h4 className={styles.itemTitle}>Curso ou Formação</h4>
            <p className={styles.itemSubtitle}>Instituição de Ensino | Local</p>
            <p className={styles.itemDate}>Mês/Ano - Mês/Ano</p>
          </div>
        )}
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Experiência Profissional</h3>
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
            <p className={styles.itemDate}>Mês/Ano - Mês/Ano</p>
            <p className={styles.itemDesc}>Descrição de suas responsabilidades e conquistas.</p>
          </div>
        )}
      </section>

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
      
      {/* O layout de habilidades em 3 colunas, como no PDF de Rafhaela */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>Habilidades</h3>
        <div className={styles.skillsGrid}>
          <div className={styles.skillCategory}>
            <h4 className={styles.skillCategoryTitle}>Experiência</h4>
            <ul className={styles.list}>
              {skills.length > 0 ? (
                skills.map(skill => <li key={skill.id}>{skill.name}</li>)
              ) : (
                <li>Habilidade 1</li>
              )}
            </ul>
          </div>
          <div className={styles.skillCategory}>
            <h4 className={styles.skillCategoryTitle}>Pessoal</h4>
            <ul className={styles.list}>
              <li>Comunicação</li>
              <li>Trabalho em Equipe</li>
            </ul>
          </div>
          <div className={styles.skillCategory}>
            <h4 className={styles.skillCategoryTitle}>Idiomas</h4>
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
          </div>
        </div>
      </section>

    </div>
  );
};

export default TemplateProfissional;
import React from 'react';
import styles from './TemplateMinimalist.module.css';
import { useResume } from '../../context/ResumeContext';

const TemplateMinimalist = ({ data }) => {
  const { personalInfo, summary, experience, education, certifications, skills, languages, projects } = data;
  const { sectionVisibility } = useResume();

  return (
    <div className={styles.minimalist}>
      <header className={styles.header}>
        <h1 className={styles.name}>{personalInfo.name || "Seu Nome"}</h1>
        <h2 className={styles.title}>{personalInfo.title || "Cargo Desejado"}</h2>
      </header>

      <div className={styles.layoutGrid}>
        <div className={styles.mainColumn}>
          {sectionVisibility.summary && (
            <section className={styles.section}>
              <p className={styles.summary}>{summary || "Escreva um breve resumo sobre suas qualificações e objetivos. Mantenha-o conciso e focado em suas principais forças."}</p>
            </section>
          )}

          {sectionVisibility.experience && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Experiência</h3>
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
          )}

          {sectionVisibility.education && (
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
          )}

          {sectionVisibility.certifications && (
            <section className={styles.section}>
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
          )}

          {sectionVisibility.projects && projects.length > 0 && (
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
        
        <div className={styles.sidebarColumn}>
          <section className={styles.section}>
            <h3 className={styles.sectionTitle}>Contato</h3>
            <div className={styles.contactList}>
              <p>{personalInfo.email || "seu.email@exemplo.com"}</p>
              <p>{personalInfo.phone || "(XX) XXXX-XXXX"}</p>
              <p>{personalInfo.address || "Cidade, Estado"}</p>
              <p>{personalInfo.linkedIn || "linkedin.com/in/..."}</p>
              <p>{personalInfo.portfolio || "seuportfolio.com"}</p>
            </div>
          </section>

          {sectionVisibility.skills && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Habilidades</h3>
              <div className={styles.skillsContainer}>
                {skills.length > 0 ? (
                  skills.map(skill => (
                    <span key={skill.id} className={styles.skill}>{skill.name}</span>
                  ))
                ) : (
                  <span className={styles.skill}>Habilidade 1</span>
                )}
              </div>
            </section>
          )}

          {sectionVisibility.languages && (
            <section className={styles.section}>
              <h3 className={styles.sectionTitle}>Idiomas</h3>
              <div className={styles.languageList}>
                {languages.length > 0 ? (
                  languages.map(lang => (
                    <p key={lang.id} className={styles.language}>
                      {lang.name} <span>({lang.level})</span>
                    </p>
                  ))
                ) : (
                  <p className={styles.language}>Idioma (Nível)</p>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateMinimalist;
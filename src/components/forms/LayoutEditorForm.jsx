import React from 'react';
import { useResume } from '../../context/ResumeContext';
import Section from '../ui/Section';
import styles from './LayoutEditorForm.module.css';

// Mapeia as chaves de estado para nomes amigáveis
const sectionNames = {
  summary: "Resumo",
  experience: "Experiência",
  education: "Educação",
  certifications: "Cursos & Certificações",
  skills: "Habilidades",
  languages: "Idiomas",
  projects: "Projetos",
};

const LayoutEditorForm = () => {
  const { layoutOrder, handleLayoutOrderChange } = useResume();

  // --- CORREÇÃO DE BUG (VERIFICA SE É ARRAY) ---
  // Adiciona uma "guarda" para garantir que layoutOrder é uma array
  // Se estiver corrompido (não for uma array), usa uma array vazia para evitar o crash.
  const safeLayoutOrder = Array.isArray(layoutOrder) ? layoutOrder : [];
  // --- FIM DA CORREÇÃO ---

  const moveSection = (index, direction) => {
    // Usa a array segura
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === safeLayoutOrder.length - 1) return;

    const newOrder = [...safeLayoutOrder];
    const newIndex = direction === 'up' ? index - 1 : index + 1;

    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    
    handleLayoutOrderChange(newOrder);
  };

  return (
    <Section title="Ordem das Seções" open={false}>
      <div className={styles.listContainer}>
        <p className={styles.description}>
          Reordene como as seções principais aparecem no seu currículo.
        </p>
        
        {/* Agora usa a 'safeLayoutOrder' para o .map() */}
        {safeLayoutOrder.map((sectionKey, index) => (
          <div key={sectionKey} className={styles.listItem}>
            <span className={styles.sectionName}>
              {sectionNames[sectionKey] || sectionKey}
            </span>
            <div className={styles.controls}>
              <button
                title="Mover para Cima"
                className={styles.button}
                onClick={() => moveSection(index, 'up')}
                disabled={index === 0}
              >
                ↑
              </button>
              <button
                title="Mover para Baixo"
                className={styles.button}
                onClick={() => moveSection(index, 'down')}
                disabled={index === safeLayoutOrder.length - 1}
              >
                ↓
              </button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default LayoutEditorForm;
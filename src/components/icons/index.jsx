import React from 'react';

// Props para permitir customização de tamanho, cor, etc.
const defaultProps = {
  width: "1em",
  height: "1em",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const IconPlus = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...defaultProps} {...props} viewBox="0 0 24 24">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

export const IconTrash = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...defaultProps} {...props} viewBox="0 0 24 24">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

export const IconDownload = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...defaultProps} {...props} viewBox="0 0 24 24">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
    <polyline points="7 10 12 15 17 10"></polyline>
    <line x1="12" y1="15" x2="12" y2="3"></line>
  </svg>
);

export const IconChevronLeft = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" {...defaultProps} {...props} viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);
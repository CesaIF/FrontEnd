"use client";

import styles from "./SearchBar.module.css";

// MELHORIA FRONT-END: componente reutilizável para os filtros de pesquisa.
// Cada tela informa o texto digitado e envia esse valor para a rota correspondente do back-end.
export default function SearchBar({ value, onChange, placeholder = "Pesquisar..." }) {
  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="search"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  );
}

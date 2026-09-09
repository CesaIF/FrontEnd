"use client";

import styles from "./Pagination.module.css";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <nav className={styles.pagination} aria-label="Paginação">
      <button
        type="button"
        className={styles.pageButton}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Anterior
      </button>

      <span className={styles.pageInfo}>
        Página {currentPage} de {totalPages}
      </span>

      <button
        type="button"
        className={styles.pageButton}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Próxima
      </button>
    </nav>
  );
}

"use client";

import Link from "next/link";
import styles from "./Header.module.css";
import { IoExitOutline } from "react-icons/io5";
import {
  GoHistory,
  GoPasskeyFill,
  GoTools,
  GoBell,
  GoAlert,
} from "react-icons/go";
import { FaHome, FaCar, FaRegUserCircle, FaGasPump } from "react-icons/fa";
import { BsPersonVcard } from "react-icons/bs";
import { FiTable } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  ALERT_NOTIFICATION_EVENT,
  countUnseenAlerts,
  initializeAlertNotifications,
} from "../../utils/alertNotifications";

export default function Header({ isOpen, onClick }) {
  const router = useRouter();
  const pathname = usePathname();
  const [novosAlarmes, setNovosAlarmes] = useState(0);

  const atualizarNotificacoes = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setNovosAlarmes(0);
        return;
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/alertas`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      });

      if (!response.ok) return;

      const data = await response.json();
      const alertas = Array.isArray(data) ? data : [];

      // Na primeira execução, os alarmes já existentes viram a base.
      // A partir daí, somente IDs novos aparecem como notificação.
      initializeAlertNotifications(alertas);
      setNovosAlarmes(countUnseenAlerts(alertas));
    } catch (error) {
      console.error("Erro ao verificar novos alarmes:", error);
    }
  }, []);

  useEffect(() => {
    atualizarNotificacoes();

    const intervalo = window.setInterval(atualizarNotificacoes, 30000);
    const atualizarAoFocar = () => atualizarNotificacoes();
    const atualizarAoVisualizar = () => atualizarNotificacoes();

    window.addEventListener("focus", atualizarAoFocar);
    window.addEventListener(ALERT_NOTIFICATION_EVENT, atualizarAoVisualizar);

    return () => {
      window.clearInterval(intervalo);
      window.removeEventListener("focus", atualizarAoFocar);
      window.removeEventListener(ALERT_NOTIFICATION_EVENT, atualizarAoVisualizar);
    };
  }, [atualizarNotificacoes]);

  const isActive = (href) => pathname === href || pathname?.startsWith(`${href}/`);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };
  return (
    <>
      <aside className={`${styles.aside} ${isOpen ? styles.open : ""}`}>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            <li className={styles.liUm}>
              <button className={styles.button} onClick={onClick}>
                <FiTable />
              </button>
            </li>

            <li className={`${styles.liDois} ${isActive("/dashboard") ? styles.active : ""}`}>
              <Link className={styles.link} href={"/dashboard"}>
                <span>
                  <FaHome />
                </span>
                <span className={styles.title}>Página Inicial</span>
              </Link>
            </li>

            <li className={`${styles.liDois} ${isActive("/perfil") ? styles.active : ""}`}>
              <Link className={styles.link} href={"/perfil"}>
                <span>
                  <FaRegUserCircle />
                </span>
                <span className={styles.title}>Meu Perfil</span>
              </Link>
            </li>

            <li className={`${styles.liDois} ${isActive("/veiculos") ? styles.active : ""}`}>
              <Link className={styles.link} href={"/veiculos"}>
                <span>
                  <FaCar />
                </span>
                <span className={styles.title}>Veículos</span>
              </Link>
            </li>
            <li className={`${styles.liDois} ${isActive("/motoristas") ? styles.active : ""}`}>
              <Link className={styles.link} href={"/motoristas"}>
                <span>
                  <BsPersonVcard />
                </span>
                <span className={styles.title}>Motoristas</span>
              </Link>
            </li>

            <li className={`${styles.liDois} ${isActive("/porteiros") ? styles.active : ""}`}>
              <Link className={styles.link} href={"/porteiros"}>
                <span>
                  <GoPasskeyFill />
                </span>
                <span className={styles.title}>Porteiros</span>
              </Link>
            </li>

            <li className={`${styles.liDois} ${isActive("/manutencao") ? styles.active : ""}`}>
              <Link className={styles.link} href={"/manutencao"}>
                <span>
                  <GoTools />
                </span>
                <span className={styles.title}>Manutenções</span>
              </Link>
            </li>

            <li className={`${styles.liDois} ${isActive("/lembretes") ? styles.active : ""}`}>
              <Link className={styles.link} href={"/lembretes"}>
                <span>
                  <GoBell />
                </span>
                <span className={styles.title}>Lembretes</span>
              </Link>
            </li>

            <li className={`${styles.liDois} ${isActive("/abastecimento") ? styles.active : ""}`}>
              <Link className={styles.link} href={"/abastecimento"}>
                <span>
                  <FaGasPump />
                </span>
                <span className={styles.title}>Abastecimentos</span>
              </Link>
            </li>

            <li className={`${styles.liDois} ${isActive("/alarmes") ? styles.active : ""}`}>
              <Link className={styles.link} href={"/alarmes"}>
                <span>
                  <GoAlert />
                </span>
                <span className={styles.title}>Alarmes</span>
                {novosAlarmes > 0 && (
                  <span
                    className={styles.notificationBadge}
                    title={`${novosAlarmes} novo${novosAlarmes > 1 ? "s" : ""} alarme${novosAlarmes > 1 ? "s" : ""}`}
                  >
                    {novosAlarmes > 99 ? "99+" : novosAlarmes}
                  </span>
                )}
              </Link>
            </li>

            <li className={`${styles.liDois} ${isActive("/history") ? styles.active : ""}`}>
              <Link className={styles.link} href={"/history"}>
                <span>
                  <GoHistory />
                </span>
                <span className={styles.title}>Histórico</span>
              </Link>
            </li>

            <li
              className={`${styles.liDois} ${styles.out}`}
              onClick={handleLogout}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.link}>
                <span>
                  <IoExitOutline />
                </span>
                <span className={styles.title}>Sair</span>
              </div>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

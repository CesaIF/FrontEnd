"use client";

import Input from "./components/input";
import GoodButton from "./components/goodButton";
import styles from "./Login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

function formatarCPF(cpf) {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length > 3) cpf = cpf.slice(0, 3) + "." + cpf.slice(3);
  if (cpf.length > 7) cpf = cpf.slice(0, 7) + "." + cpf.slice(7);
  if (cpf.length > 11) cpf = cpf.slice(0, 11) + "-" + cpf.slice(11);
  return cpf.slice(0, 14);
}

export default function Login() {
  const router = useRouter();
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const handleCPF = (e) => {
    const formatted = formatarCPF(e.target.value);
    setCpf(formatted);
  };

  const handleLogin = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cpf: cpf.replace(/\D/g, ""),
        senha: senha,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("cpf", data.cpf);
      alert("Login realizado ");
      router.push("/dashboard");
    } else {
      alert(data.error || "Erro ao fazer login");
    }
  };

  return (
    <>
      <div className={styles.containerMain}>
        <div className={styles.containerUm}>
          <h1 className={styles.tituloUm}>Bem-vindo ao</h1>
          <div className={styles.containerImg}>
            <img className={styles.imgUm} src={"/logo/logo.png"}></img>
          </div>
          <h1 className={styles.tituloTres}>
            Controle de Entrada e Saída de Veículo
          </h1>
          <h1 className={styles.tituloTres}>
            IF BAIANO - <i>campus</i> Itapetinga
          </h1>
        </div>
        <div className={styles.containerDois}>
          <div className={styles.formContainer}>
            <h1 className={styles.tituloQuatro}>LOGIN</h1>
            <form className={styles.form}>
              <Input
                onChange={handleCPF}
                value={cpf}
                htmlFor={"cpf"}
                type={"text"}
                placeholder={"123.456.789-10"}
                label={"CPF"}
                maxLength={14}
                mask={"000.000.000-00"}
              ></Input>
              <Input
                type={"password"}
                placeholder={"Sua senha aqui!"}
                label={"Senha"}
                maxLength={20}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              ></Input>
            </form>
            <GoodButton onClick={handleLogin}>Entrar</GoodButton>
          </div>
        </div>
      </div>
    </>
  );
}

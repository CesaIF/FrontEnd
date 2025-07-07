"use client";

import dynamic from "next/dynamic";
import GoodButton from "../components/goodButton";
import BadButton from "../components/badButton";
import Input from "../components/input";
import styles from "./Password.module.css";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
const Modal = dynamic(() => import("../components/modal"), {ssr: false});
import Loading from "../components/loading";
import Link from "next/link";

function ChangePassword() {

    const [senha, setSenha] = useState("");
    const [senhaRepetida, setSenhaRepetida] = useState("");
    const [conteudo, setConteudo] = useState("");
    const [noticeIsOpen, setNoticeIsOpen] = useState(false);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    function handleNoticeIsOpen() {
        setNoticeIsOpen(!noticeIsOpen);
    }

    const handleAtualizarSenha = async (e) => {
        e.preventDefault();

        if (!senha) {
            handleNoticeIsOpen();
            setConteudo("Preencham todos os campos!");
        } else if (senha === senhaRepetida) {

            fetch(`${process.env.NEXT_PUBLIC_LOCAL}/forgot/reset/${token}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newPassword: senha,
            })
        }).then(async (res) => {
            const data = await res.json();

            if(res.ok) {
                handleNoticeIsOpen();
                setConteudo("Senha atualizada com sucesso!");
            } else {
                handleNoticeIsOpen();
                setConteudo(data.error);
            }
        }).catch((err) => {
            console.error(err);
        });

        } else {
            handleNoticeIsOpen();
            setConteudo("Senhas não conferem");
        }
    }

    return (
        <>
        <div className={styles.containerGeral}>
            <div className={styles.containerForm}>
                <form onSubmit={handleAtualizarSenha} className={styles.form}>
                    <div className={styles.containerTitle}>
                        <h1 className={styles.title}>Criar nova senha</h1>
                    </div>
                    <div className={styles.input}>
                        <Input
                            label={"Nova Senha"}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            type={"password"}
                        />
                        <Input
                            value={senhaRepetida}
                            onChange={(e) => setSenhaRepetida(e.target.value)}
                            label={"Repita a senha"}
                            type={"password"}
                        />
                    </div>
                    <div className={styles.button}>
                        <GoodButton buttonWidth={"100%"} type={"submit"}>Trocar</GoodButton>
                    </div>
                    <div className={styles.containerGoToLogin}>
                        <Link className={styles.goToLogin} href={"/"}>Ir para página de Login</Link>
                    </div>
                </form>
            </div>
            <Modal
            isOpen={noticeIsOpen}
            onClose={handleNoticeIsOpen}
            width={"400px"}
            >
                <div className={styles.containerModal}>
                    <div className={styles.containerInMini}>
                        <h1 className="text-black">{conteudo}</h1>
                    </div>
                    <div className={styles.butaoMini}>
                        <BadButton
                            colorHover={"#769b6a"}
                            cor={"#48793c"}
                            onClick={handleNoticeIsOpen}
                        >
                            Ok
                        </BadButton>
                    </div>
                </div>
            </Modal>
        </div>
        </>
    )
}



export default function Password() {
    return (
        <Suspense fallback={<Loading />}>
            <ChangePassword />
        </Suspense>
    )
}
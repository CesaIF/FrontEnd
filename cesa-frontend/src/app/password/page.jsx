"use client";

import BadButton from "../components/badButton";
import Ginput from "../components/gInput";
import styles from "./Password.module.css";
import { useSearchParams } from "next/navigation";

export default function Password() {

    const [senha, setSenha] = useState("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleAtualizarSenha = async (e) => {
        e.preventDefault();

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
                alert(data.message);
            } else {
                alert(data.error);
            }
        }).catch((err) => {
            console.error(err);
        });
    }

    return (
        <>
        <div>
            <main>
                <div>
                    <form onSubmit={handleAtualizarSenha}>
                        <div>
                            <Ginput
                            placeholder={"digite a senha"}
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            />
                        </div>
                        <div>
                            <BadButton type={"submit"}>Trocar</BadButton>
                        </div>
                    </form>
                </div>
            </main>
        </div>
        </>
    )
}
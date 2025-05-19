import RightButton from "../components/rightButton";
import Input from "../components/input";

export default function Login(){



    return(
        <>
        <div className="min-h-screen bg-[#C1D8C3] w-full flex flex-col items-center">

            <div className="flex flex-col justify-center items-center mt-[2%]">
                    <img className="w-[30%] rounded-[100%]" src="/logov4/Cesav4.png"></img>
            </div>

            <div className="w-[35%] border-1 border-neutral-400 bg-white rounded-2xl flex flex-col justify-center items-center h-[400px] mt-[2%] shadow-2xl">

                <div className="flex flex-col justify-center items-center text-5xl font-roboto text-neutral-800 mb-10">
                    <h1>Login</h1>
                </div>

                <form className="w-full">
                    <div className="flex flex-col justify-center items-center mb-10 w-full">
                        <Input maxLength={11} type={"text"} label={"CPF"} placeholder={"000.000.000-00"}></Input>
                    </div>

                    <div className="flex flex-col justify-center items-center mb-10 w-full">
                        <Input maxLength={30} type={"password"} label={"Senha"}></Input>
                    </div>
                    
                    <div className="flex flex-col justify-center items-center">
                        <RightButton>Entrar</RightButton>
                    </div>
                    
                </form>
            </div>
        </div>
    </>
    )
}
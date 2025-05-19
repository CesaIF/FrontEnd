import RightButton from "../components/rightButton";
import Input from "../components/input";

export default function Login(){



    return(
        <>
        <div className="min-h-screen bg-emerald-200 w-full flex flex-col items-center justify-center">

            <div className="w-[35%] border-1 border-neutral-400 bg-white rounded-2xl flex flex-col justify-center items-center h-[550px] mt-[2%]">

                <div className="flex flex-col justify-center items-center mb-[6%]">
                    <img className="w-[30%] rounded-4xl" src="/logov4/Cesav4.png"></img>
                </div>

                <div className="flex flex-col justify-center items-center text-5xl font-roboto text-neutral-800 mb-10">
                    <h1 className="font-cormorant">Login</h1>
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
import RightButton from "../components/rightButton";
import Input from "../components/input";

export default function Login(){



    return(
        <>
        <div className="min-h-screen bg-cover bg-[url('/background/background.jpg')] flex flex-col items-center selection:bg-green-500 selection:text-white">

            <div className="flex flex-col justify-center items-center mt-[4%]">
                <img className="w-[20%] rounded-4xl" src="/logov4/Cesav4.png"></img>
            </div>

            <div className="w-[35%] border-neutral-700 bg-white rounded-2xl flex flex-col justify-center items-center h-[420px] mt-[2%] border-b-8 border-r-8 border-l-2 border-t-2">

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
import Input from "../components/input";
import GoodButton from "../components/goodButton";

export default function Login(){

    return(
        <>
        <div className="min-h-screen bg-cover bg-[url('/background/background.jpg')] flex flex-col items-center selection:bg-green-500 selection:text-white">

            

            <div className="lg:w-[35%] not-sm:w-[70%] sm:w-[60%] border-[#769b6a] bg-white rounded-2xl flex flex-col justify-center items-center h-[550px] mt-[6rem] border-b-4 border-r-4 border-l-2 border-t-2">

                <div className="flex flex-col justify-center items-center">
                    <img className="w-[35%]" src="/logov4/Cesav4.jpg"></img>
                </div>

                <div className="flex flex-col justify-center items-center text-5xl font-roboto text-neutral-800 mb-10 mt-2">
                    <h1 className="font-outfit font-medium text-[#48793c]">Login</h1>
                </div>

                <form className="w-full">
                    <div className="flex flex-col justify-center items-center mb-10 w-full">
                        <Input maxLength={11} type={"text"} label={"CPF"} placeholder={"000.000.000-00"}></Input>
                    </div>

                    <div className="flex flex-col justify-center items-center mb-10 w-full">
                        <Input maxLength={30} type={"password"} label={"Senha"}></Input>
                    </div>
                    
                    <div className="flex flex-col justify-center items-center">
                        <GoodButton>Entrar</GoodButton>
                    </div>
                    
                </form>
            </div>
        </div>
    </>
    )
}
import Header from "../components/header";
import Footer from "../components/footer";

export default function Dashboard(){
    return(
        <>
            <div className="flex flex-col h-[100vh]">
                <Header></Header>
                <main className="flex flex-1 p-2 h-[100%] bg-white shrink-0">
                    <div></div>
                </main>
                <Footer></Footer>
            </div>
        </>
    )
}
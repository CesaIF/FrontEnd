export default function GoodButton({children, onClick}){
    return(
        <button onClick={onClick} className="text-white rounded-lg py-2.5 px-7 font-outfit font-semibold text-md bg-[#388E3C] hover:bg-[#4f9451] border-t-1 border-l-1 border-b-4 border-[#2E7D32] border-r-4">{children}</button>
    )
}
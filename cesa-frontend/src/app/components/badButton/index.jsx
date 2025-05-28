export default function BadButton({children, onClick}){
    return(
        <button onClick={onClick} className="border-t-1 border-l-1 text-white rounded-md py-2.5 px-7 font-outfit font-semibold text-md bg-[#D32F2F] hover:bg-[#C62828] border-b-4 border-[#B71C1C] border-r-4">{children}</button>
    )
}
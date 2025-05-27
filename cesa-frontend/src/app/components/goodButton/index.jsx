export default function GoodButton({children, onClick}){
    return(
        <button onClick={onClick} className="text-white rounded-lg py-2.5 px-7 font-outfit font-medium text-md bg-[#3F7D58] hover:bg-[#638C6D] border-t-1 border-l-1 border-b-4 border-green-950 border-r-4">{children}</button>
    )
}
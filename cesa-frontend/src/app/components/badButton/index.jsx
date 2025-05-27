export default function BadButton({children, onClick}){
    return(
        <button onClick={onClick} className="border-t-1 border-l-1 text-white rounded-md py-2.5 px-7 font-outfit font-medium text-md bg-[#a12630] hover:bg-[#BF3131] border-b-4 border-red-950 border-r-4">{children}</button>
    )
}
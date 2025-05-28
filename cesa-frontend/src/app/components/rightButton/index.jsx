export default function RightButton({children, onClick}){
    return(
        <button onClick={onClick} className="border-t-1 border-l-1 text-white rounded-lg py-2.5 px-7 font-outfit font-semibold bg- text-md bg-neutral-800 hover:bg-neutral-700 border-b-4 border-neutral-950 border-r-4">{children}</button>
    )
}
export default function BadButton({children}){
    return(
        <button className="text-white rounded-3xl py-2.5 px-7 font-cormorant text-lg bg-[#a12630] hover:bg-[#BF3131] border-b-4 border-red-950 border-r-4">{children}</button>
    )
}
export default function Input({label, placeholder, type, maxLength}){
    return(
        <div className="flex flex-col border-[#a3bc98] py-0.5 px-10 w-[80%] rounded-3xl border-b-4 border-r-4 border-l-1 border-t-1">
            <label className="font-outfit text-sm text-neutral-800">{label}</label>
            <input maxLength={maxLength} type={type} placeholder={placeholder} className="outline-0 text-neutral-600 font-outfit text-sm"></input>
        </div>
    )
}
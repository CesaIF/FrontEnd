export default function Input({label, placeholder, type, maxLength}){
    return(
        <div className="flex flex-col border-1 border-neutral-400 py-0.5 px-10 w-[80%] rounded-3xl">
            <label className="font-roboto text-sm text-neutral-800">{label}</label>
            <input maxLength={maxLength} type={type} placeholder={placeholder} className="outline-0 text-neutral-800 font-roboto text-sm"></input>
        </div>
    )
}
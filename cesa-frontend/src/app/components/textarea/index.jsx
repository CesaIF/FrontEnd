export default function Textarea({label, placeholder, maxLength}){
    return(
        <div className="flex flex-col border-1 border-neutral-400 py-0.5 px-10 w-[80%] rounded-3xl">
            <label className="font-cormorant text-sm text-neutral-800">{label}</label>
            <textarea maxLength={maxLength} placeholder={placeholder} className="outline-0 text-neutral-800 font-cormorant text-sm"></textarea>
        </div>
    )
}
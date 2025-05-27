export default function Textarea({label, placeholder, maxLength, rows}){
    return(
        <div className="flex flex-col border-neutral-400 py-0.5 px-10 w-[80%] rounded-3xl border-b-4 border-r-4 border-l-1 border-t-1">
            <label className="font-cormorant text-sm text-neutral-800">{label}</label>
            <textarea rows={rows} maxLength={maxLength} placeholder={placeholder} className="outline-0 text-neutral-600 font-cormorant text-sm"></textarea>
        </div>
    )
}
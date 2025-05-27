export default function ChoiceBox({id, name, children, value}){
    return(
        <div className="flex flex-col border-neutral-400 py-0.5 px-10 h-[45px] w-[80%] rounded-3xl border-b-4 border-r-4 border-l-1 border-t-1 justify-center">
            <select id={id} name={name}>
                <option className="bg-white font-cormorant text-neutral-700" value={value}>{children}</option>
            </select>
        </div>
    )
}
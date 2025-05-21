export default function Modal({isOpen, onClose, children}){

    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-neutral-950 opacity-50" onClick={onClose}/>
            <div className="relative z-10 h-full max-h-[700px] w-full max-w-[650px]  bg-white p-6 md:rounded-lg">

                <button type="button" className="absolute right-0 top-0 m-4 text-gray-400 transition-all hover:text-red-400"></button>

                <div>{children}</div>
            </div>

        </div>
    )
}
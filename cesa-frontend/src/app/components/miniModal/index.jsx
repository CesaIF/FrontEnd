export default function MiniModal({isOpen, onClose, children}){

    if(!isOpen) return null;

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-neutral-950 opacity-50" onClick={onClose}/>
            <div className="relative flex flex-col justify-center z-10 h-full max-h-[220px] w-full max-w-[400px] bg-white p-6 md:rounded-2xl border-neutral-700 border-b-8 border-r-8 border-t-2 border-l-2">

                <div>{children}</div>

            </div>

        </div>
    )
}
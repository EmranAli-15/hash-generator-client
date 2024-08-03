import { useState } from "react";
import { GiCancel } from "react-icons/gi";
import { GrLanguage } from "react-icons/gr";

import { BanglaText } from "./ModalText";
import { EnglishText } from "./ModalText";

export default function Modal({ modal, setModal }: { modal: any, setModal: any }) {

    const [lan, setLan] = useState('EN');

    return (
        <div className="relative">
            <button onClick={() => setModal(!modal)} className="absolute right-0 translate-x-1/2 -translate-y-1/2 bg-white rounded-full">
                <GiCancel size={28} className="rounded-full text-red-500"></GiCancel>
            </button>
            <div className="t w-[90vw] md:w-[50vw] h-[60vh] bg-white rounded overflow-auto">
                <div className=" mt-2 ml-2 -mb-2 flex items-center gap-x-2">
                    <button onClick={() => setLan('EN')} className={`${lan == 'EN' && 'text-[#006B38FF]'} font-bold size-6 justify-center items-center`}>EN</button>
                    <GrLanguage size={20}></GrLanguage>
                    <button onClick={() => setLan('BN')} className={`${lan == 'BN' && 'text-[#006B38FF]'} font-bold size-6 flex justify-center items-center`}>BN</button>
                </div>
                <div className="p-2 mt-4 fontLan">
                    {
                        lan == 'BN' ? <BanglaText></BanglaText> : <EnglishText></EnglishText>
                    }
                </div>
            </div>
        </div>
    )
}

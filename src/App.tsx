import { FormEvent, useState } from "react";
import { HiClipboardDocumentList, HiEye, HiEyeSlash } from "react-icons/hi2";
import { TbLoader } from "react-icons/tb";
import './App.css';
import Modal from "./Modal";
import Swal from "sweetalert2";

export default function App() {
  const [hash, setHash] = useState('HASH GENERATOR');

  const [eye, setEye] = useState(true);
  const [passErr, setPassErr] = useState("");
  const [saltErr, setSaltErr] = useState("");
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");
  const [saltRound, setSaltRound] = useState<number | string>(0);

  const [modal, setModal] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    Swal.fire({
      position: "top",
      icon: "success",
      title: `Copied : ${hash}`,
      showConfirmButton: false,
      timer: 1500
    });
  };



  const fn = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPassErr("");
    setSaltErr("");

    const passArray = password.split("");

    if (passArray.includes(' ')) {
      return setPassErr("Empty space not allow");
    };
    if (password.length < 3 || password.length > 10) {
      return setPassErr("Required password 3-10 digit");
    };
    if (saltRound as number < 1 || saltRound as number > 30) {
      return setSaltErr("Required salt-round 1-30 digit");
    };

    fetch("https://hash-generator-omega.vercel.app/", {
      method: "POST",
      body: JSON.stringify({
        password,
        saltRound
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
      .then((response) => response.json())
      .then((data) => {
        setHash(data.password);
        setLoading(false);
      });

    setPassErr("");
    setSaltErr("");
  };

  const modalAction = () => {
    setModal(!modal);
  };



  return (
    <div className="h-screen w-full bg-[#101820FF] overflow-hidden font-sans">

      <div className={`${!modal && 'hidden'} z-10 relative`}>
        <div className="absolute translate-x-[5%] md:translate-x-1/2 translate-y-[15vh]">
          <Modal modal={modal} setModal={setModal}></Modal>
        </div>
      </div>

      <div>
        <div className="text-white">
          <button onClick={() => modalAction()} className="btn btn-link text-white">docs</button>
        </div>

        <div className="flex flex-col gap-y-10">

          <div className="mt-10">
            <p className="text-yellow-400 text-lg text-center font-mono">{passErr}</p>
            <p className="text-yellow-400 text-lg text-center font-mono">{saltErr}</p>
          </div>

          <div className="w-[80%] md:w-[480px] mx-auto h-11 rounded-lg outline-none p-3 font-semibold bg-[#006B38FF] flex justify-between items-center">
            <p className="text-white">{hash}</p>
            <button className="text-white" onClick={copyToClipboard}>
              <HiClipboardDocumentList size={25} />
            </button>
          </div>

          <div className="flex flex-col justify-center items-center gap-y-5">

            <div className="w-screen flex flex-col gap-y-5 md:w-[600px]">
              <div className="w-full flex justify-center relative">
                <input onChange={(e) => setPassword(e.target.value)} className="input-field border-[2px] border-l-[4px] border-r-[4px]" type={eye ? 'password' : 'text'} placeholder="Provide a simple password" />
                <button className="text-[#006B38FF] absolute translate-y-1/2 right-[3%] md:right-[5%]" onClick={() => (setEye(!eye))}>
                  {
                    eye ? <HiEyeSlash size={22} /> : <HiEye size={22} />
                  }
                </button>
              </div>

              <div className="flex justify-center">
                <input onChange={(e) => setSaltRound(e.target.value)} className="input-field border-[2px] border-l-[4px] border-r-[4px]" type="number" placeholder="Select salt-round ( 1 - 30 )" />
              </div>
            </div>

            <div>
              <button onClick={fn} type="submit" className="bg-[#006B38FF] py-[6px] px-4 w-[120px] h-[40px] rounded-lg font-semibold text-white text-[18px] flex justify-center items-center">
                {
                  loading ? <TbLoader></TbLoader> : 'GENERATE'
                }
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  )
}

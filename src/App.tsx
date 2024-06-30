import { FormEvent, useState } from "react";
import { HiClipboardDocumentList, HiEye, HiEyeSlash } from "react-icons/hi2";

export default function App() {
  const [hash, setHash] = useState('HASH GENERATOR');

  const [eye, setEye] = useState(true);
  const [passErr, setPassErr] = useState("");
  const [saltErr, setSaltErr] = useState("");

  const [password, setPassword] = useState("");
  const [saltRound, setSaltRound] = useState<number | string>(0);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    alert('PASSWORD COPIED');
  };



  const fn = (e: FormEvent) => {
    e.preventDefault();

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
        setHash(data.name)
      });

    setPassErr("");
    setSaltErr("");
  }

  return (
    <div className="h-screen w-full bg-[#101820FF] flex flex-col gap-y-20 justify-center items-center pb-[10%]">

      <div>
        <p className="text-white text-lg">{passErr}</p>
        <p className="text-white text-lg">{saltErr}</p>
      </div>

      <div className="w-[70%] md:w-[600px] mx-auto h-11 rounded-lg outline-none p-3 font-semibold bg-[#006B38FF] flex justify-between items-center">
        <p className="text-white">{hash}</p>
        <button className="text-white" onClick={copyToClipboard}>
          <HiClipboardDocumentList size={25} />
        </button>
      </div>

      <div className=" w-full flex flex-col justify-center items-center gap-y-5">

        <div className="flex flex-col gap-y-5 w-full md:w-[600px]">
          <div className="flex justify-center">
            <input onChange={(e) => setPassword(e.target.value)} className="w-[70%] h-11 rounded-lg border-[3px] outline-none p-3 font-semibold border-[#006B38FF] ml-[23px]" type={eye ? 'password' : 'text'} placeholder="Provide simple password" />
            <button className="text-[#006B38FF]" onClick={() => (setEye(!eye))}>
              {
                eye ? <HiEyeSlash size={23} /> : <HiEye size={23} />
              }
            </button>
          </div>

          <div className="flex justify-center">
            <input onChange={(e) => setSaltRound(e.target.value)} className="w-[70%] h-11 rounded-lg border-[3px] outline-none p-3 font-semibold border-[#006B38FF]" type="number" placeholder="Select salt-round ( 1 - 30 )" />
          </div>
        </div>

        <div>
          <button onClick={fn} type="submit" className="bg-[#006B38FF] py-2 px-4 rounded-lg font-semibold text-white text-[18px]">
            GENERATE
          </button>
        </div>

      </div>
    </div>
  )
}

import PageSwitchAni from "./transitionAnimation/pageAni";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiMoonClearFill, RiSunFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase/config";
import Editcontent from "./edit";

function Blogpost({ dark, setDark }) {
  const [data, setData] = useState([]);
  const [editcheck, seteditcheck] = useState(false);
  const [contentlisttt] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = window.location.href;
  const id = url.substring(url.lastIndexOf("/") + 1);

  useEffect(() => {
    (async () => {
      const docRef = doc(db, "articles", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("No such document!");
      }
    })();
  }, []);
  console.log(data);

  useEffect(() => {
    if (data.length !== 0) {
      setLoading(true);
    }
  }, [data]);

  const useProgressiveImage = (src) => {
    const [sourceLoaded, setSourceLoaded] = useState(null);

    useEffect(() => {
      const img = new Image();
      img.src = src;
      img.onload = () => setSourceLoaded(src);
    }, [src]);

    return sourceLoaded;
  };

  const loaded = useProgressiveImage(data.image);
  console.log(loaded);

  useEffect(() => {
    let contentlist = data.content
      ? data.content.split(/(?!.)/g).filter(function (v, i) {
          return i % 2 == 0;
        })
      : false;
    if (contentlist) {
      contentlist.map((x, i) => {
        contentlisttt.push(
          <p className="mt-10" key={i}>
            {x}
          </p>
        ),
          console.log(contentlisttt);
      });
    }
  }, [data]);

  const navigate = useNavigate();

  const deletepost = async () => {
    await deleteDoc(doc(db, "articles", id));
    navigate("/");
  };

  const [isOn, setIsOn] = useState(() => {
    if (localStorage.getItem("theme") === "light") {
      setDark(false);
      return true;
    } else {
      setDark(true);
      return false;
    }
  });

  const toggleSwitch = () => setIsOn(!isOn);

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
  };
  useEffect(() => {
    if (isOn) {
      setDark(false);
      localStorage.setItem("theme", "light");
    } else {
      setDark(true);

      localStorage.setItem("theme", "dark");
    }
  }, [isOn]);
  useEffect(() => {
    if (
      localStorage.theme === "light" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: light)").matches)
    ) {
      setDark(false);
    } else {
      setDark(true);
    }
  }, []);

  let darkcheck = dark ? "bg-gray-900 text-white" : "bg-white text-black";
  let darkmode = `transition-all duration-500 ${darkcheck}`;

  return (
    <div className={darkmode}>
      <PageSwitchAni />

      <div
        className="h-[32rem]  transition-all  -mt-[6rem] flex bg-cover bg-center justify-center"
        style={{
          backgroundImage: `url(${loaded})`,
        }}
      ></div>
      <div className="flex justify-end text-slate-300 mt-10 mr-20">
        <p>{data.date}</p>
      </div>
      {editcheck ? (
        <Editcontent
          seteditcheck={seteditcheck}
          editcheck={editcheck}
          data={data}
          id={id}
        />
      ) : (
        <div className="flex -mt-32">
          <div className="basis-5/6">
            <div className=" font- text-xl leading-10 px-28  textfront">
              <h1 className="text-4xl text-center heading w-full justify-center flex items-center pb-10 rounded-xl mt-32  drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
                {data.title}
              </h1>
              {loading ? contentlisttt.map((x) => x) : null}
              <h1 className="text-center text-6xl mt-20">. . .</h1>
            </div>
          </div>
          <div className=" sticky top-0  h-96 flex justify-center items-center flex-col pt-44">
            <img
              src={data.userimage}
              className="h-20 w-20 rounded-full"
              alt=""
            />
            <h1 className="mt-5">{data.name && "By " + data.name}</h1>
            <div
              onClick={() => toggleSwitch()}
              className={`flex-start flex h-[50px] mt-10 w-[100px] border border-gray-400 rounded-[50px] bg-zinc-100 p-[5px] shadow-inner hover:cursor-pointer dark:bg-zinc-700 ${
                isOn && "place-content-end"
              }`}
            >
              <motion.div
                className="flex h-[40px] w-[40px] items-center justify-center rounded-full bg-black/90"
                layout
                transition={spring}
              >
                <motion.div whileTap={{ rotate: 360 }}>
                  {isOn ? (
                    <RiSunFill className="h-6 w-6 text-yellow-300" />
                  ) : (
                    <RiMoonClearFill className="h-6 w-6 text-slate-200" />
                  )}
                </motion.div>
              </motion.div>
            </div>

            <div className="mt-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                className="font-semibold hover:cursor-pointer  bg-white border-black hover:bg-black text-black hover:text-white text-2xl transition-all duration-[200ms] border  rounded-xl px-5 p-2 "
                onClick={() => deletepost()}
              >
                <MdDeleteOutline />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                className="font-semibold hover:cursor-pointer  bg-white border-black hover:bg-black text-black hover:text-white text-2xl transition-all duration-[200ms] border  rounded-xl px-5 p-2 "
                onClick={() => seteditcheck(!editcheck)}
              >
                <MdEdit />
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blogpost;

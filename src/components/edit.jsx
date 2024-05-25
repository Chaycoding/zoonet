import React, { useState } from "react";
import PageSwitchAni from "./transitionAnimation/pageAni";
import useRetrieveUrl from "./hooks/useRetrieveUrl";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineCancel } from "react-icons/md";
import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase/config";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function Editcontent({ seteditcheck, editcheck, data, id }) {
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [files, setFiles] = useState(null);
  const [filesthumb, setFilesthumb] = useState(null);
  const [mainimgurl, mainsetimgurl] = useState(null);
  const [thumbimgurl, thumbsetimgurl] = useState(null);
  const [imageUrl, setImageUrl] = useState(data.image);
  const [imageUrl2, setImageUrl2] = useState(data.thumbnailImg);

  const MainimgUrl = useRetrieveUrl(mainimgurl);
  const ThumbimgUrl = useRetrieveUrl(thumbimgurl);

  useEffect(() => {
    if (MainimgUrl) {
      setImageUrl(MainimgUrl);
    }
  }, [MainimgUrl]);

  useEffect(() => {
    if (ThumbimgUrl) {
      setImageUrl2(ThumbimgUrl);
    }
  }, [ThumbimgUrl]);

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    let dict = {
      name: name,
      content: content,
      email: email,
      thumbnailImg: imageUrl2,
      date: today,
      image: imageUrl,
      title: title,
    };

    try {
      await setDoc(doc(db, "articles", id), dict);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    navigate("/");
  };

  const updateItem = (e) => {
    let selected = e.target.files[0];
    if (selected && files != selected) {
      setFiles(selected);

      const storage = getStorage();
      const storageRef = ref(
        storage,
        `Images/${new Date().toJSON().slice(0, 10)}${selected.name}`
      );

      uploadBytes(storageRef, selected).then((snapshot) => {
        console.log(snapshot);
        const imageNameThumb =
          "Images/" +
          new Date().toJSON().slice(0, 10) +
          selected.name.split(".")[0] +
          ".webp";

        mainsetimgurl(imageNameThumb);
      });
    }
  };

  const updateItem2 = (e) => {
    let selected = e.target.files[0];
    if (selected && filesthumb != selected) {
      setFilesthumb(selected);

      const storage = getStorage();
      const storageRef = ref(
        storage,
        `Images/${new Date().toJSON().slice(0, 10)}${selected.name}`
      );

      uploadBytes(storageRef, selected).then((snapshot) => {
        console.log(snapshot);
        const imageNameThumb =
          "Images/" +
          new Date().toJSON().slice(0, 10) +
          selected.name.split(".")[0] +
          ".webp";

        thumbsetimgurl(imageNameThumb);
      });
    }
  };

  return (
    <div className=" mt-20">
      <PageSwitchAni />

      <div>
        <div className="flex justify-end pr-10">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="font-semibold hover:cursor-pointer  bg-white border-black hover:bg-black text-black hover:text-white text-2xl transition-all duration-[200ms] border  rounded-xl px-5 p-2 "
            onClick={() => seteditcheck(!editcheck)}
          >
            <MdOutlineCancel />
          </motion.button>
        </div>
        <h1 className="text-center text-6xl  pb-28">Make your own blog</h1>
        <form
          method="POST"
          id="form"
          onSubmit={(e) => submit(e)}
          className="text-2xl px-36 grid text-black gap-y-10 grid-cols-2"
        >
          <p className="col-span-2 text-[2.7rem] ">Author details</p>
          <hr />
          <span />

          <label htmlFor="name">What's your name?</label>
          <input
            className="border border-[#237477]  rounded-3xl pl-5"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name">What's your email?</label>
          <input
            className="border border-[#237477]  rounded-3xl pl-5"
            type="text"
            name="name"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <p className="col-span-2 text-[2.7rem] mt-10">Blog</p>
          <hr />
          <span />
          <label htmlFor="name">What's your blog title?</label>
          <input
            className="border border-[#237477]  rounded-3xl pl-5"
            type="text"
            name="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="content">What's your story?</label>
          <textarea
            className="border col-span-2 h-80 border-[#237477] rounded-3xl pl-5 pt-5"
            type="text"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <p>
            You can upload an image if you'd like.
            <br />
            It should be horizontally wide.
          </p>
          <label className="hover:cursor-pointer flex justify-center items-center hover:bg-black hover:text-white transition-all duration-[300ms] border border-[#237477] rounded-3xl text-3xl pb-2">
            Main image
            <input
              type="file"
              name="content"
              accept="image/*"
              onChange={updateItem}
            />
          </label>
          {files && <div>{files.name}</div>}

          {imageUrl && <h1>Everything's ready </h1>}
          <label className="hover:cursor-pointer flex justify-center items-center hover:bg-black hover:text-white transition-all duration-[300ms] border border-[#237477] rounded-3xl text-3xl pb-2">
            Thumbnail
            <input
              type="file"
              name="content"
              accept="image/*"
              onChange={updateItem2}
            />
          </label>
          {filesthumb && <div>{filesthumb.name}</div>}

          {imageUrl2 && <h1>Everything's ready </h1>}

          <button className="hover:bg-black hover:text-white text-4xl col-span-2 border border-white hover:border-transparent transition-all duration-[300ms] rounded-r-3xl rounded-l-3xl py-2 px-4 pb-[12px]">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Editcontent;

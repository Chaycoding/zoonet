import React, { useState } from "react";
import PageSwitchAni from "./transitionAnimation/pageAni";
import useRetrieveUrl from "./hooks/useRetrieveUrl";
import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase/config";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function Uploadcontent() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const [files, setFiles] = useState(null);
  const [filesthumb, setFilesthumb] = useState(null);
  const [userimage, setuserimage] = useState(null);
  const [mainimgurl, mainsetimgurl] = useState(null);
  const [thumbimgurl, thumbsetimgurl] = useState(null);
  const [userimageurl, userimagesetimgurl] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const [imageUrl2, setImageUrl2] = useState();
  const [imageUrl3, setImageUrl3] = useState();
  const MainimgUrl = useRetrieveUrl(mainimgurl);
  const ThumbimgUrl = useRetrieveUrl(thumbimgurl);
  const userimageurll = useRetrieveUrl(userimageurl);

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
  useEffect(() => {
    if (userimageurll) {
      setImageUrl3(userimageurll);
    }
  }, [userimageurll]);

  // const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    let yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    try {
      const docRef = await addDoc(collection(db, "articles"), {
        name: name,
        content: content,
        userimage: imageUrl3,
        image: imageUrl,
        date: today,
        thumbnailImg: imageUrl2,
        email: email,
        title: title,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // navigate("/");
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
  const updateItem3 = (e) => {
    let selected = e.target.files[0];
    if (selected && userimage != selected) {
      setuserimage(selected);

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

        userimagesetimgurl(imageNameThumb);
      });
    }
  };
  return (
    <div className=" mt-20">
      <PageSwitchAni />

      <div>
        <h1 className="text-center text-6xl pb-28">Make your own blog</h1>
        <form
          method="POST"
          id="form"
          onSubmit={(e) => submit(e)}
          className="text-2xl px-36 grid gap-y-10 grid-cols-2"
        >
          <p className="col-span-2 text-[2.7rem] ">Author details</p>
          <hr />
          <span />

          <label htmlFor="name">What's your name?</label>
          <input
            className="border border-[#237477]  rounded-3xl pl-5"
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="name">What's your email?</label>
          <input
            className="border border-[#237477]  rounded-3xl pl-5"
            type="text"
            name="name"
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
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="content">What's your story?</label>
          <textarea
            className="border col-span-2 h-80 border-[#237477] rounded-3xl pl-5 pt-5"
            type="text"
            name="content"
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
          <label className="hover:cursor-pointer flex justify-center items-center hover:bg-black hover:text-white transition-all duration-[300ms] border border-[#237477] rounded-3xl text-3xl pb-2">
            Author's image
            <input
              type="file"
              name="content"
              accept="image/*"
              onChange={updateItem3}
            />
          </label>
          {userimage && <div>{userimage.name}</div>}

          {imageUrl3 && <h1>Everything's ready </h1>}

          <button className="hover:bg-black hover:text-white text-4xl col-span-2 border border-white hover:border-transparent transition-all duration-[300ms] rounded-r-3xl rounded-l-3xl py-2 px-4 pb-[12px]">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Uploadcontent;

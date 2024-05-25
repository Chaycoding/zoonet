import React from "react";
import { useEffect } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";

function Progressbar({ file, setimgurl, imageUrl }) {
  useEffect(() => {
    if (file != null) {
      const storage = getStorage();
      const storageRef = ref(
        storage,
        `Images/${new Date().toJSON().slice(0, 10)}${file.name}`
      );

      uploadBytes(storageRef, file).then((snapshot) => {
        console.log(snapshot);
        const imageNameThumb =
          "Images/" +
          new Date().toJSON().slice(0, 10) +
          file.name.split(".")[0] +
          ".webp";
        setimgurl({
          mainImg: imageNameThumb,
          // thumbnailImg: imageNameThumb,
        });
      });
    }
  }, [file, setimgurl]);

  const style = imageUrl ? "" : "hidden";

  return (
    <div>
      <div className="flex h-14 w-14 items-center border border-black justify-center rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 animate-spin">
        <div className="h-9 w-9 rounded-full bg-white"></div>
      </div>

      <div className={style}>It's completed</div>
    </div>
  );
}

export default Progressbar;

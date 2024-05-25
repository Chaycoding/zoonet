import { useState, useEffect } from "react";
import { ref, getStorage, getDownloadURL } from "firebase/storage";

const useRetrieveUrl = (file) => {
  const [imgUrl, setImgUrl] = useState();
  useEffect(() => {
    setInterval(() => {
      if (file && file != "null") {
        const storage = getStorage();
        getDownloadURL(ref(storage, file)).then((url) => setImgUrl(url));
      }
    }, 4000);
  }, [file]);

  return imgUrl;
};

export default useRetrieveUrl;

import { Link } from "react-router-dom";
import img from "./images/high quality/bal.webp";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase/config";
function Newestposts() {
  const [data, setData] = useState([]);
  const [firstpost, setfirstpost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "articles"));
      const thingz = [];
      querySnapshot.forEach((doc) => {
        thingz.push(doc);
      });
      const list1 = thingz.pop();
      const list2 = thingz.pop();
      const list3 = thingz.pop();
      setfirstpost([list1, list2, list3]);
      setData(thingz);
    })();
  }, []);

  useEffect(() => {
    if (data.length !== 0) {
      setLoading(true);
    }
  }, [data]);

  return (
    <div>
      {loading == true ? (
        <div className="px-10">
          <div className="grid grid-cols-3 gap-x-10">
            <div className="col-span-2 content-center grid transition-all">
              <Link
                className="hover:cursor-pointer h-full"
                to={`/post/${firstpost[0].id}`}
              >
                <div className="bg-black rounded-md">
                  <img
                    className="h-96 rounded-md w-full   transition-all duration-200 hover:opacity-80"
                    loading="lazy"
                    src={firstpost[0].data().image || img}
                    alt="Something went wrong"
                  ></img>
                </div>
                <div className="flex flex-col mt-2 ">
                  <div className="flex  items-center justify-end">
                    <p className="text-lg pr-2">
                      By {firstpost[0].data().name}
                    </p>
                    <img
                      src={firstpost[0].userimage || img}
                      alt=""
                      loading="lazy"
                      className="rounded-full h-7 w-7"
                    />
                  </div>
                  <p className="text-2xl font-semibold ">
                    {firstpost[0].data().title}
                  </p>
                </div>
              </Link>
            </div>
            <div className="grid gap-5">
              <Link
                className="hover:cursor-pointer "
                to={`/post/${firstpost[1].id}`}
              >
                <div className="bg-black  rounded-md">
                  <img
                    className=" rounded-md  transition-all duration-200 hover:opacity-80"
                    loading="lazy"
                    src={firstpost[1].data().image || img}
                    alt="Something went wrong"
                  ></img>
                </div>

                <div className="flex flex-col">
                  <p className="text-lg font-semibold ml-2 ">
                    {firstpost[1].data().title}
                  </p>
                </div>
              </Link>
              <Link
                className="hover:cursor-pointer "
                to={`/post/${firstpost[2].id}`}
              >
                <div className="bg-black  rounded-md">
                  <img
                    className=" rounded-md  transition-all duration-200 hover:opacity-80"
                    loading="lazy"
                    src={firstpost[2].data().image || img}
                    alt="Something went wrong"
                  ></img>
                </div>

                <div className="flex flex-col ">
                  <p className="text-lg font-semibold ml-2 ">
                    {firstpost[2].data().title}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex  flex-col items-center">
          <span className="text-3xl">
            Loading... Enjoy a game while you wait
          </span>
          <div className="flex space-x-2 justify-center items-center bg-white h-20 dark:invert">
            <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.075s]"></div>
            <div className="h-3 w-3 bg-black rounded-full animate-bounce [animation-delay:-0.037s]"></div>
            <div className="h-3 w-3 bg-black rounded-full animate-bounce"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Newestposts;

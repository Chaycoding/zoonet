import { Link } from "react-router-dom";
import React from "react";
import EntranceAni from "./transitionAnimation/entranceAni";
import PageSwitchAni from "./transitionAnimation/pageAni";
import { motion } from "framer-motion";
import Newestposts from "./newestPosts";
import MainCardSection from "./mainpagecard";

function Mainpage({ isFirstMount, dark }) {
  const darkcheck = dark ? "bg-[#121212] text-white" : "bg-white text-black";
  const darkstyle = `-mt-[6rem] pb-[150rem] ${darkcheck}`;
  const darkcheck1 = dark
    ? "bg-black border-white text-white hover:text-black hover:bg-white"
    : "bg-white border-black hover:bg-black text-black hover:text-white";
  const darkstyle1 = ` font-semibold hover:cursor-pointer   transition-all duration-[200ms] border  rounded-xl text-2xl px-10 p-2 mr-10 ${darkcheck1}`;
  return (
    <div className={darkstyle}>
      {isFirstMount ? <EntranceAni /> : <PageSwitchAni />}
      <div className="h-[100rem] ">
        <div className="bg-landing  bg-cover bg-center  ">
          <div className="w-full sm:h-[29rem] h-64 pl-28 flex flex-col bg-[rgba(255,252,92,0.05)] items-start justify-center">
            <div className="  text-white mt-10 sm:text-6xl text-2xl">
              ZOONET
            </div>
            <div className="bg-white h-1 w-[14.3rem] "></div>
          </div>
        </div>

        <div className="w-full justify-center pt-28 px-40 flex">
          <MainCardSection />
        </div>

        <div className="w-full justify-end flex pt-10">
          <Link to="/createpost">
            <motion.button whileHover={{ scale: 1.1 }} className={darkstyle1}>
              Create post
            </motion.button>
          </Link>
        </div>
        {/* {isAuth && user && (
        )} */}
        <div className="mt-7 ">
          <h1 className="text-5xl ml-20 ">Newest articles</h1>
        </div>
        <div className="flex mt-10">
          <Newestposts />
        </div>
      </div>
    </div>
  );
}

export default Mainpage;

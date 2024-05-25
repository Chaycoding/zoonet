import { Link } from "react-router-dom";
import { useScrollPosition } from "./hooks/useScrollPosition";

function Header({ isAuth, button, user }) {
  const scrollPosition = useScrollPosition();
  const scrollColour = scrollPosition > 0 ? "anicol" : "aniRevcol ";
  const scrollHeader = `sticky top-0 z-20 duration-[1s] transition-all ${scrollColour}`;
  return (
    <div className={scrollHeader}>
      <div className="w-full h-24 text-white hidden items-center sm:flex px-10 ">
        <div className="font-[Open Sans]  h-full flex justify-center items-center">
          <Link to="/">
            <button className="  font-semibold flex justify-center items-center">
              <div className="bg-zoonet h-20 w-20 bg-cover"></div>
              <span className="text-4xl ml-2 font-bold">ZooNet</span>
            </button>
          </Link>
        </div>
        <div className="font-[Open Sans]  ">
          {isAuth === true && user ? (
            <div className="mb-2 flex h-[5rem] items-center justify-end">
              <img
                src={user.photoURL}
                alt="profile pic"
                referrerPolicy="no-referrer"
                className="rounded-full h-10 mt-3 mr-3 w-10 "
              />
              <Link to="/userProfiledesdsf">
                <button className="text-[25px] mt-3  pr-5">
                  {user.displayName}
                </button>
              </Link>
              <button
                className="text-[25px] mt-3  hover:outline rounded-lg p-2  transition-all font-semibold"
                onClick={button}
              >
                Log out
              </button>
            </div>
          ) : (
            <div>
              <Link to="/login">
                <button className="text-[25px] mb-3 ml-10 hover:outline rounded-lg p-2 transition-all font-semibold">
                  Sign in
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

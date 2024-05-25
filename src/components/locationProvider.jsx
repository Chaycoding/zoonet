import { AnimatePresence } from "framer-motion";

function Locationprovider({ children }) {
  return <AnimatePresence mode="wait">{children}</AnimatePresence>;
}

export default Locationprovider;

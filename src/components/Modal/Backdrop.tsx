import { motion } from "framer-motion";

const Backdrop = ({ children, onClick }) => {

  return (
    <motion.div
      onClick={onClick}
      className="backdrop-blur-lg bg-black/30 w-full h-full fixed top-0 left-0 z-10 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
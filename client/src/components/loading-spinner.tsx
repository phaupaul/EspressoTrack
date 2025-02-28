import { motion } from "framer-motion";

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-4">
      <motion.svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Coffee Bean Shape */}
        <motion.path
          d="M12 22C14.5 22 16.7 20.3 17.4 18H6.6C7.3 20.3 9.5 22 12 22Z"
          fill="currentColor"
          animate={{
            fillOpacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M18 15H6C4.3 15 3 13.7 3 12C3 10.3 4.3 9 6 9H18C19.7 9 21 10.3 21 12C21 13.7 19.7 15 18 15Z"
          fill="currentColor"
          animate={{
            fillOpacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M12 2C9.5 2 7.3 3.7 6.6 6H17.4C16.7 3.7 14.5 2 12 2Z"
          fill="currentColor"
          animate={{
            fillOpacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
      <span className="ml-2 text-muted-foreground">Loading...</span>
    </div>
  );
}

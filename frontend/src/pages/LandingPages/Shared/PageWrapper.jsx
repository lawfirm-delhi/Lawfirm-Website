import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './Landing.css';

export default function PageWrapper({ children, title }) {
  useEffect(() => {
    if (title) {
      document.title = `${title} | NYATI Law Chamber`;
    }
  }, [title]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="landing-page"
    >
      {children}
    </motion.div>
  );
}

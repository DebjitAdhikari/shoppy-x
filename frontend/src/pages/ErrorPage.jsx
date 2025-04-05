import React from 'react';
import { Link } from 'react-router-dom'; // If using React Router
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

function ErrorPage({customErrorMessage}) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.2 } },
  };

  return (
    <>
    <Helmet>
  {/* Title */}
  <title>404 - Page Not Found | ShoppyX</title>

  {/* Meta Description */}
  <meta
    name="description"
    content="Oops! The page you're looking for doesn't exist. Return to ShoppyX and explore our wide range of products, from fashion to electronics and more."
  />

  {/* Keywords */}
  <meta
    name="keywords"
    content="ShoppyX 404, page not found, missing page, broken link, online shopping, fashion, electronics, home essentials"
  />

  {/* Open Graph for social sharing */}
  <meta property="og:title" content="404 Error | Page Not Found - ShoppyX" />
  <meta
    property="og:description"
    content="We couldn't find the page you were looking for. Head back to ShoppyX and discover trending fashion, electronics, and more!"
  />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://shoppy-x.vercel.app/404" />
  <meta property="og:image" content="https://shoppy-x.vercel.app/og-default.jpg" />

  {/* Canonical URL */}
  <link rel="canonical" href="https://shoppy-x.vercel.app/404" />
</Helmet>

    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-gray-100 flex flex-col items-center justify-center text-center"
    >
      <motion.div
        variants={itemVariants}
        className="max-w-md p-8 bg-white rounded-2xl shadow-2xl"
      >
        <motion.h1
          variants={itemVariants}
          className="text-6xl font-extrabold text-red-600 mb-4 animate-pulse"
        >
          404
        </motion.h1>
        <motion.p
          variants={itemVariants}
          className="text-2xl text-gray-800 mb-6"
        >Aww, snap! 
          {
            customErrorMessage?customErrorMessage:" This page decided to take a vacation."
          }
          
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="text-lg text-gray-600 mb-8"
        >
          It seems like you've wandered into the Bermuda Triangle of the internet.
        </motion.p>
        <motion.img
          variants={itemVariants}
          src="https://media.giphy.com/media/14uQ3hUgW44u6k/giphy.gif" // A funny GIF
          alt="Lost"
          className="mx-auto mb-8 rounded-lg shadow-md"
        />
        <motion.div variants={itemVariants}>
          <Link to="/" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-full transition-colors duration-300">
            Take Me Home
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
    </>
  );
}

export default ErrorPage;
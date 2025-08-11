import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Settings, TerminalSquare } from 'lucide-react';

const Docs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 text-white">
      <motion.main
        className="mx-auto max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.section className="text-center mb-16" variants={itemVariants}>
          <h1 style={{ color: "#333" }} className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg">
            Documentation
          </h1>
          <p style={{ color: "#333" }} className="mt-4 text-lg md:text-xl  max-w-2xl mx-auto">
            Everything you need to know to integrate with the ZapLink API.
          </p>
        </motion.section>

        <motion.div
          className="bg-black/30 backdrop-blur-lg p-8 sm:p-12 rounded-2xl shadow-2xl border border-white/10 space-y-12"
          variants={itemVariants}
        >
          <section>
            <div className="flex items-center mb-4">
              <BookOpen className="h-7 w-7 text-indigo-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">Introduction</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-base">
              ZapLink is a simple and efficient URL shortening service that lets you convert long,
              bulky URLs into short, easy-to-share links. This documentation covers the API endpoints
              and usage details for developers and users.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Settings className="h-7 w-7 text-indigo-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">How It Works</h2>
            </div>
            <p className="text-slate-300 leading-relaxed text-base">
              Enter your long URL into the form on the homepage. Our backend service encodes a unique
              short code for your URL using a Base62 encoder, stores the mapping in PostgreSQL with
              caching via Redis, and returns a short URL ready for sharing.
            </p>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <TerminalSquare className="h-7 w-7 text-indigo-400 mr-3" />
              <h2 className="text-2xl font-bold text-white">API Endpoints</h2>
            </div>

            <div className="space-y-8 mt-6">
              <div>
                <p className="font-mono text-base flex items-center">
                  <span className="mr-4 inline-block rounded-md bg-green-400/10 px-3 py-1 font-semibold text-green-300 border border-green-400/20">
                    POST
                  </span>
                  <code className="text-slate-300">/api/shorten</code>
                </p>
                <p className="mt-3 text-slate-400 pl-4 border-l-2 border-slate-700">
                  Shortens a given long URL. If the user is authenticated, the link will be associated with their account.
                </p>
              </div>

              <div>
                <p className="font-semibold text-slate-200">Body:</p>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900/70 p-4 text-sm text-white border border-slate-700">
                  <code>
                    {`{\n  "longUrl": "https://example.com/a-very-long-url-to-shorten"\n}`}
                  </code>
                </pre>
              </div>

              <div>
                <p className="font-semibold text-slate-200">Response:</p>
                <pre className="mt-2 overflow-x-auto rounded-lg bg-slate-900/70 p-4 text-sm text-white border border-slate-700">
                  <code>
                    {`{\n  "shortUrl": "https://zap.siras.dev/abc123"\n}`}
                  </code>
                </pre>
              </div>
            </div>
          </section>
        </motion.div>
      </motion.main>
    </div>
  );
};

export default Docs;

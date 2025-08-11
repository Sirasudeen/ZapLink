import React, { useState } from 'react';
import UrlForm from '../components/UrlForm';
import ShortUrlCard from '../components/ShortUrlCard';
import { message } from 'antd';
import { TextAnimate } from '../components/magicui/text-animate';
import { motion } from 'framer-motion';
import { useAuth } from '../Auth/AuthContext';
const Home = () => {
  const [shortUrl, setShortUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { session } = useAuth();
  // console.log(session);
  const handleShorten = async (longUrl, resetInput) => {
    setLoading(true);
    setError('');
    const userId = user?.id;
    setShortUrl('');
    try {
      const token = session ? session.access_token : null;

      const headers = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const res = await fetch(`${import.meta.env.VITE_URL_GEN_SERVICE}/api/shorten`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ longUrl }),
      });
      const data = await res.json();
      if (res.ok && data.shortUrl) {
        setShortUrl(data.shortUrl.shortURL || data.shortUrl);
        resetInput('');
        message.success('URL shortened successfully!');
      } else {
        setError(data.error || 'Something went wrong');
        message.error(data.error || 'Something went wrong');
      }
    } catch {
      setError('Network error');
      message.error('Network error');
    }
    setLoading(false);
  };

  return (
    <>


      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          padding: '50px 24px',
        }}
      >
        <div className="text-center px-4 sm:px-8 md:px-16 lg:px-24 py-16 space-y-4">
          <TextAnimate
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-zinc-800 dark:text-white tracking-tight drop-shadow-sm"
            animation="slideUp"
            by="word"
          >
            Shrink it. Zap it. Share it.
          </TextAnimate>

          <TextAnimate
            className="mt-4 text-base sm:text-lg md:text-xl text-gray-700 dark:text-gray-300 font-medium tracking-normal max-w-2xl mx-auto"
            animation="blurIn"
            as="h2"
          >
            Because long links are a buzzkill.
          </TextAnimate>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="w-full px-4 py-8 md:py-12"
        >
          <div className="mx-auto w-full max-w-xl">
            <div className="rounded-3xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-zinc-900 p-6 sm:p-8 md:p-10">
              <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-700 dark:text-white font-poppins mb-6">
                Zap your Link ⚡
              </h2>

              <UrlForm onSubmit={handleShorten} loading={loading} />

              {shortUrl && (
                <div className="mt-6">
                  <ShortUrlCard shortUrl={shortUrl} />
                </div>
              )}

              {error && (
                <p className="mt-6 text-center text-red-500 text-base font-medium">
                  {error}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
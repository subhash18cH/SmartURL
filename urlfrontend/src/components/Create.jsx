import React, { useState } from 'react';
import toast from 'react-hot-toast';
import api from './Api';
import { MdContentCopy } from "react-icons/md";
import Sidebar from './Sidebar';

const Create = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post('/api/url/shortUrl', null, {
        params: {
          LongUrl: longURL,
        },
      });
      if (response.status === 200) {
        setShortURL(`${import.meta.env.VITE_BACK_URL}/Sm/` + response.data);
        setIsSuccess(true);
        toast.success('URL shortened successfully!');
        setTimeout(() => setIsSuccess(false), 2000);
      }
    } catch (err) {
      toast.error('Failed to shorten URL');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortURL).then(() => {
      toast.success('Short URL copied!');
    }).catch(() => {
      toast.error('Failed to copy URL.');
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Sidebar />
      <div className="flex flex-col justify-center items-center flex-1 p-4 bg-blue-50">
        <div className="w-full max-w-3xl rounded-lg flex flex-col p-6 bg-white shadow-lg">
          <h1 className="text-slate-800 text-2xl sm:text-3xl font-semibold mb-6">Create a link</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">
                Enter your URL <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-4 py-3 border rounded-lg outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                type="url"
                required
                placeholder="Enter your long URL here"
                value={longURL}
                onChange={(e) => setLongURL(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 font-semibold text-gray-700">
                Your short URL
              </label>
              <div className="relative">
                <input
                  className="w-full px-4 py-3 pr-10 border rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
                  type="text"
                  placeholder="Your shortened URL will appear here"
                  value={shortURL}
                  readOnly
                />
                {shortURL && (
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 focus:outline-none"
                    aria-label="Copy short URL"
                  >
                    <MdContentCopy size={20} />
                  </button>
                )}
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full px-4 py-3 rounded-lg font-semibold transition-all duration-300 ${isLoading ? 'bg-[#9792dd] cursor-wait' : 'bg-[#5052ce] hover:bg-[#6a6bd5]'} text-white`}
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;

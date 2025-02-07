import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import Sidebar from './Sidebar';
import toast from 'react-hot-toast';
import api from './Api';
import { Loader2 } from 'lucide-react';

const QrCode = () => {
  const [longURL, setLongURL] = useState('');
  const [shortURL, setShortURL] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!longURL) {
      toast.error('Please enter a URL!');
      return;
    }
    try {
      new URL(longURL);
    } catch (e) {
      toast.error('Please enter a valid URL!');
      return;
    }

    setIsLoading(true);
    try {
      const urlResponse = await api.post('/api/url/shortUrl', null, {
        params: { LongUrl: longURL }
      });

      if (urlResponse.status === 200) {
        const newShortURL = `${import.meta.env.VITE_BACK_URL}/Sm/${urlResponse.data}`;
        localStorage.setItem("short", newShortURL)
        localStorage.setItem("long", longURL)
        setShortURL(newShortURL);

        const qrResponse = await api.post('/api/qrcode/generate', null, {
          params: { url: newShortURL }
        });

        if (qrResponse.status === 200) {
          setShowQR(true);
          toast.success("QR code generated successfully!");
        } else {
          toast.error('Failed to generate QR code');
        }
      } else {
        toast.error('Failed to generate short URL');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Something went wrong!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-blue-50'>
      <Sidebar />
      <div className="flex justify-center">
        <div className="w-full max-w-6xl px-4 sm:px-6 md:px-8 sm:ml-56 mt-16 sm:mt-20">
          <div className="mb-8 sm:mb-12 space-y-2">
            <h1 className="text-slate-800 text-2xl sm:text-3xl md:text-4xl font-semibold">
              Create a Smart Code
            </h1>

          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                <div className="mb-6">
                  <label className="block mb-2 sm:mb-3 font-semibold text-gray-700 text-sm sm:text-base">
                    Enter your URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="px-3 sm:px-4 py-2 sm:py-3 border rounded-lg w-full outline-none 
                      transition-all duration-300 focus:border-blue-500 focus:ring-2 
                      focus:ring-blue-200 text-sm sm:text-base"
                    type="url"
                    required
                    placeholder="Enter your long URL here"
                    value={longURL}
                    onChange={(e) => setLongURL(e.target.value)}
                  />
                </div>
                <div className="mt-6 sm:mt-8">
                  <button
                    type="submit"
                    disabled={isLoading}
                    onClick={handleGenerate}
                    className={`relative w-full sm:w-auto px-6 sm:px-12 py-2 sm:py-3 rounded-lg 
                      font-semibold ${isLoading
                        ? 'bg-[#9792dd] cursor-wait'
                        : 'bg-[#5052ce] hover:bg-[#6a6bd5] active:bg-[#5052ce]'
                      } text-white transition-colors duration-200 text-sm sm:text-base`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Generating...
                      </div>
                    ) : (
                      'Generate QR Code'
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center items-start">
              <div className={`transition-all duration-300 ${showQR
                ? 'opacity-100 transform translate-y-0'
                : 'opacity-0 transform -translate-y-4'}`}
              >
                {showQR && (
                  <div className="p-4 sm:p-6 bg-white rounded-lg shadow-lg">
                    <QRCodeSVG
                      value={shortURL}
                      size={180}
                      level="H"
                      className="rounded-sm"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QrCode;
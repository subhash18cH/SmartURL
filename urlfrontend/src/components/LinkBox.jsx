import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Globe } from 'lucide-react';
import { MdContentCopy } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import api from './Api';

const LinkBox = ({ longUrl, shortUrl }) => {
  const extractDomain = (url) => {
    try {
      const domain = new URL(url).hostname;
      return domain.startsWith('www.') ? domain : `www.${domain}`;
    } catch (error) {
      toast.error("Invalid URL");
      return '';
    }
  };
  const getFaviconUrl = (url) => {
    try {
      const domain = extractDomain(url);
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch (error) {
      return null;
    }
  };
  const handleCopy = (url) => {
   
    navigator.clipboard.writeText(url).then(() => {
      toast.success('URL copied!');
    }).catch(() => {
      toast.error('Failed to copy URL.');
    });
  };


  const handleDelete = async () => {
    try {
      const response = await api.delete("/api/url/delete-url", {
        params: {
          shortUrl: shortUrl
        }
      })
      if (response.status === 200) {
        toast.success("Url deleted!")
        setTimeout(() => {
          window.location.reload();
        }, 1000);

      }
    } catch (error) {
      console.log(error)

    }
  }

  return (
    <div className="w-full sm:w-[95%] md:w-[90%] flex flex-col gap-3 sm:gap-4 border rounded-lg 
      p-3 sm:p-4 min-h-[8rem] sm:min-h-[10rem] mb-4 sm:mb-6 shadow-lg bg-white hover:shadow-xl 
      transition-shadow mx-auto">
      <div className="flex items-center gap-2 justify-between">
        <div className='flex items-center'>
          <div className="w-10 h-10 flex items-center justify-center rounded-md overflow-hidden">
            {getFaviconUrl(longUrl) ? (
              <img
                src={getFaviconUrl(longUrl)}
                alt="Site favicon"
                className="w-8  h-8 object-contain"

              />
            ) : (
              <div className="text-bl-400">
                <Globe size={20} />
              </div>
            )}
          </div>
          <div>
            <h1 className="text-lg sm:text-xl font-semibold text-gray-800 break-words ml-1">
              {extractDomain(longUrl)}
            </h1>
          </div>
        </div>

        <div className='flex items-center'>

          <button className=' mr-4 rounded-lg ml-4 p-2' onClick={handleDelete}>
            <RiDeleteBin6Line className='text-2xl text-red-700 hover:text-red-400' />
          </button>

          <button className='text-blue-600 hover:text-blue-400 ml-4 mr-4  rounded-lg' onClick={() =>{
            handleCopy((`${import.meta.env.VITE_BACK_URL}/Sm/${shortUrl}`));
          }} >
            <MdContentCopy className='text-2xl ' />
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-blue-700 font-semibold hover:underline break-all text-sm sm:text-base ml-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${import.meta.env.VITE_BACK_URL}/Sm/${shortUrl}`}
            className="hover:text-blue-800 "
          >
            {`${import.meta.env.VITE_BACK_URL}/Sm/${shortUrl}`}
          </a>
        </span>

        <span className="hover:underline break-all text-gray-600 text-sm sm:text-base ml-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={longUrl}
            className="hover:text-gray-800 "
          >
            {longUrl}
          </a>
        </span>
      </div>
    </div>
  );
};

export default LinkBox;
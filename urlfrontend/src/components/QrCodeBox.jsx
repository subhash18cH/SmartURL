import React from 'react'
import toast from 'react-hot-toast';
import { MdSubdirectoryArrowRight } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import api from './Api';
import { PiDownloadSimple } from "react-icons/pi";

const QrCodeBox = ({ index, qrCode }) => {

  const handleDownload = () => {
    try {
      const link = document.createElement('a');
      const byteCharacters = atob(qrCode.image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      link.href = url;

      link.download = `qrcode-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download QR Code");
    }
  }

  const handleDelete = async (url) => {
    try {
      const response = await api.delete("/api/qrcode/delete-qr", {
        params: {
          url: url
        }
      })
      if (response.status === 200) {
        toast.success("Qr Code deleted!")
        setTimeout(() => {
          window.location.reload();
        }, 1000);

      }
    } catch (error) {
      console.log(error)

    }

  }
  return (
    <div key={index} className=" shadow-md gap-2 bg-white rounded-lg
    w-full sm:w-[95%] md:w-[90%]  flex sm:gap-4 sm:p-4 min-h-[8rem] sm:min-h-[10rem] mb-4 sm:mb6 items-center">
      <img
        src={`data:image/png;base64,${qrCode.image}`}
        alt={`QR Code ${index + 1}`}
        className="lg:w-28 lg:h-28 md:w-20 h-20 p-1 "
      />
      <div className='flex lg:flex-row md:flex-row flex-col gap-4 p-2'>
        <a className=" flex items-center gap-1" target='_blank' href={qrCode.shortUrl}>
          <MdSubdirectoryArrowRight />
          <span className='break-all hover:text-blue-700  hover:underline'>{qrCode.shortUrl}</span>
        </a>
        <div className='flex justify-between items-center lg:ml-10'>

          <button className=' md:p-2 lg:p-2 rounded lg hover:bg-blue-200 mr-5' onClick={handleDownload}>
            <PiDownloadSimple className='text-2xl text-blue-900 font-bold ' />
          </button>


          <button className=' mr-4 rounded-lg ml-2' onClick={() => {
            handleDelete(qrCode.shortUrl)
          }}>
            <div className=' rounded-lg md:p-2 lg:p-2 hover:bg-red-200'>
              <RiDeleteBin6Line className='text-2xl text-red-700 ' />
            </div>
          </button>
        </div>

      </div>
    </div>
  )
}

export default QrCodeBox
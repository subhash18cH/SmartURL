import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import api from './Api';
import { Loader2 } from 'lucide-react';
import QrCodeBox from './QrCodeBox';
import toast from 'react-hot-toast';

const UserQrCodes = () => {
  const [userQrCodes, setUserQrCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchQRCodes = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/qrcode/retrieve');
      if (response.status === 200) {
        setUserQrCodes(response.data);
      }
      
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQRCodes();
  }, []);

  return (
    <div className="min-h-screen bg-blue-50">
      <Sidebar />
      <div className="flex justify-center">
        <div className="w-full px-4 sm:px-6 md:px-8 sm:ml-52 mt-16 sm:mt-12 max-w-7xl mx-auto lg:ml-64">
          <div className="w-full">
            {!loading && userQrCodes && userQrCodes.length > 0 && (
              <h1 className='text-slate-800 text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 sm:mb-12 px-2 lg:ml-1 md:ml-7'>
                QR Codes
              </h1>
            )}

          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>

          ) : (
            <>
              {userQrCodes && userQrCodes?.length === 0 ? (
                <div className=" p-8 rounded-lg  text-center">
                  <h1 className="text-gray-600 text-3xl mt-36">Create your first QR code!</h1>
                  <p className="text-gray-400 text-2xl mt-2">
                    Your generated QR codes will appear here
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:gap-6">
                  {userQrCodes.map((qrCode, index) => (
                    <QrCodeBox key={index} index={index} qrCode={qrCode} />
                  ))}
                </div>
              )
              }
            </>
          )
          }
        </div>
      </div>
    </div>
  );
};
export default UserQrCodes;
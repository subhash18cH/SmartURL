import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiLink } from "react-icons/fi";
import { QrCode } from 'lucide-react';

const CreateModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-80">

        <div className="space-y-4">
          <button
            onClick={() => {
              onClose();
              navigate('/link-page/create');
            }}
            className="w-full flex items-center pl-16 gap-2 p-3 rounded-lg bg-[#5052ce] text-white hover:bg-[#6a6bd5] font-semibold"
          >
            <FiLink className='text-xl' />
            Create Link
          </button>

          <button
            onClick={() => {
              onClose();
              navigate('/qr-code/create');
            }}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-[#5052ce] text-white hover:bg-[#6a6bd5] font-semibold"
          >
            <QrCode />
            Create QR Code
          </button>

        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full p-2 border font-semibold border-gray-300 rounded-lg bg-red-600 hover:bg-red-500 text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default CreateModal;
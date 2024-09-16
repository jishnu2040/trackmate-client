import React, { useState } from 'react';
import Modal from './Modal';

const InputData = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = (data) => {
    console.log('Form Submitted', data); // Handle form submission logic here
  };

  return (
    <div className="p-4">
      <button
        onClick={openModal}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
      >
        Add New Task
      </button>

      <Modal 
        isOpen={isModalOpen} 
        closeModal={closeModal} 
        submitHandler={handleFormSubmit} 
      />
    </div>
  );
};

export default InputData;

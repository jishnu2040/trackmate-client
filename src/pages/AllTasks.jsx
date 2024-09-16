import React, { useState } from 'react';
import Card from '../components/Cards';
import { IoIosAddCircle } from "react-icons/io";
import Modal from '../components/Modal';

const AllTasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleFormSubmit = (data) => {
    console.log('Form Submitted', data); // Handle form submission logic here
  };

  return (
    <div className="px-2">
      <div className="flex justify-end mb-4">
        <button onClick={openModal}>
          <IoIosAddCircle className="text-5xl hover:text-blue-600 transition" />
        </button>
      </div>

      {/* Render the Card components */}
      <div>
        <Card home={true} openModal={openModal} />
      </div>

      <Modal isOpen={isModalOpen} closeModal={closeModal}submitHandler={handleFormSubmit} />
    </div>
  );
}

export default AllTasks;

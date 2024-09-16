import React, { useContext } from 'react';
import Card from '../components/Cards';
import { IoIosAddCircle } from 'react-icons/io';
import Modal from '../components/Modal';
import ThemeContext from '../ThemeContext';  // Import ThemeContext

const AllTasks = () => {
  const { openModal, isModalOpen, closeModal } = useContext(ThemeContext); // Get modal control from context

  return (
    <div className="px-2">
      <div className="flex justify-end mb-4">
        <button onClick={() => openModal(null)}>  {/* Pass null to indicate a new task */}
          <IoIosAddCircle className="text-5xl hover:text-blue-600 transition" />
        </button>
      </div>

      {/* Render the Card components */}
      <div>
        <Card home={true} openModal={openModal} />
      </div>

      {/* Modal is controlled by context */}
      {isModalOpen && <Modal closeModal={closeModal} />}
    </div>
  );
};

export default AllTasks;

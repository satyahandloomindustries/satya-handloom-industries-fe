import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { IoCloseCircleOutline } from 'react-icons/io5';

const ModalWrapper = ({
  children,
  open,
  handleClose = () => {},
  mainClassname = '',
}) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
    
      <Box
        className={`top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] bg-white shadow-2xl outline-none rounded min-w-[60%] min-h-[70%] p-2 overflow-h-scroll flex flex-row-reverse justify-between relative ${mainClassname} `}
      >
        {children}

        <IoCloseCircleOutline
          onClick={handleClose}
          className="fixed -right-0 -top-0 text-2xl cursor-pointer"
        />
      </Box>
    </Modal>
  );
};

export default ModalWrapper;

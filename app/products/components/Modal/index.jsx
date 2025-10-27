
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Image from 'next/image';
import SwiperImageCarousel from '../SwiperImageCarousel';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
};

export default function ProductModal() {
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="rounded min-w-[60%] min-h-[80%] p-2 overflow-h-scroll">
          {/* <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}

          
        {/* <Image
          src="/traditional-macrame-composition-indoors_317x449.jpg"
          className="group-hover:scale-110 group-hover:opacity-90 transition-transform transform duration-1000 h-[400px]"
          alt="assembling-advent3"
          objectFit="cover"
          width={400}
          height={180}
        /> */}

          <SwiperImageCarousel/>
        </Box>
      </Modal>
    </div>
  );
}

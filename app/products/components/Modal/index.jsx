import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SwiperImageCarousel from '../SwiperImageCarousel';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import PlaceOrderButton from '../PlaceOrderButton';
import WhatsAppBtn from '../WhatsAppBtn';
import { IoCloseCircleOutline } from 'react-icons/io5';
import ModalWrapper from '@/components/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  outline: 'none',
};

export default function ProductModal() {
  const [open, setOpen] = React.useState(true);
  const [addedToWishList, setAddedToWishList] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleWishList = () => {
    setAddedToWishList((prev) => !prev);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>

      <ModalWrapper open={open} handleClose={handleClose}>
        <div className="mr-4">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="!mt-8"
            sx={{ fontSize: 24, textAlign: 'center' }}
          >
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1, fontSize: 16 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>

          <div className="mt-5">
            <div>
              <span>Size:&nbsp;</span>S
            </div>

            <div className="mt-2">
              <span>Product code:</span>&nbsp; BED_787
            </div>
          </div>

          <div className="absolute bottom-[20%]">
            <div className="flex">
              <PlaceOrderButton />
              <WhatsAppBtn />
            </div>
            <button
              onClick={handleWishList}
              className={`flex items-center justify-center outline-none px-3 py-2 mt-2 ${addedToWishList ? 'bg-red-500' : 'bg-blue-500'} rounded`}
            >
              <div>
                {addedToWishList ? (
                  <GoHeartFill className="text-white" />
                ) : (
                  <GoHeart className="text-white" />
                )}
              </div>
              <div className="text-white text-sm ml-2 tracking-wider">
                {!addedToWishList ? 'Add to wishlist' : 'Remove from wishlist'}
              </div>
            </button>
          </div>
        </div>

        <SwiperImageCarousel />
      </ModalWrapper>
    </div>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SwiperImageCarousel from '../SwiperImageCarousel';
import { GoHeart, GoHeartFill } from 'react-icons/go';
import PlaceOrderButton from '../PlaceOrderButton';
import WhatsAppBtn from '../WhatsAppBtn';
import { IoCloseCircleOutline } from 'react-icons/io5';
import ModalWrapper from '@/components/Modal';
import useShop from '@/store/useShop';
import MultiRenderer from '@/components/MultiRenderer';
import MyDropdown from '@/components/Dropdown';

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

const DescriptionText = ({ item }) => {
  return (
    <Typography
      id="modal-modal-description"
      sx={{ mt: 1, fontSize: 16 }}
      className="
    [counter-increment:item]
    before:content-[counter(item)'.']
    before:mr-2
    before:font-bold
  "
    >
      {item}
    </Typography>
  );
};

export default function ProductModal({ ref }) {
  const [open, setOpen] = React.useState(false);
  const [addedToWishList, setAddedToWishList] = React.useState(false);
  const [selectedSize, setSelectedSize] = React.useState(null);
  const { selectedProduct } = useShop();

  const {
    name,
    images = [],
    code,
    description = [],
    sizes = [],
  } = selectedProduct || {};

  const sizesOptions = React.useMemo(
    () => sizes.map((i) => ({ label: i, value: i })),
    [sizes]
  );

  const urlImages = React.useMemo(() => images.map(({ url }) => url), [images]);

  console.log(sizesOptions);

  React.useEffect(() => {
    if (sizes.length) {
      setSelectedSize(sizesOptions[0]);
    }
  }, [sizesOptions]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleWishList = () => {
    setAddedToWishList((prev) => !prev);
  };

  React.useImperativeHandle(ref, () => ({
    handleOpen,
    handleClose,
  }));

  return (
    <div>
      <ModalWrapper open={open} handleClose={handleClose}>
        <div className="mr-16 relative">
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            className="!mt-8"
            sx={{ fontSize: 24, textAlign: 'left' }}
          >
            {name}
          </Typography>
          <MultiRenderer
            rendererSet={description}
            Component={DescriptionText}
            spreadProps={false}
            mainClassName="[counter-reset:item]"
          />

          <div className="mt-5">
            <div className="flex items-center justify-center space-x-2">
              <div>Size:</div>
              <MyDropdown
                items={sizesOptions}
                selected={selectedSize}
                setSelected={setSelectedSize}
                showReset={false}
              />
            </div>

            <div className="mt-2">
              <span>Product code:</span>&nbsp; {code}
            </div>
          </div>

          <div className="mt-4">
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

        <SwiperImageCarousel images={urlImages} />
      </ModalWrapper>
    </div>
  );
}

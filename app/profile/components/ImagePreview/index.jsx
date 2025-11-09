'use client';
import ModalWrapper from '@/components/Modal';
import MultiRenderer from '@/components/MultiRenderer';
import useProductAdmin from '@/store/useProductAdmin';
import { filterClosure } from '@/utls';
import { TiDelete } from 'react-icons/ti';


const Preview = ({ item }) => {
  const {images , customSet} = useProductAdmin()
  const onClose = ()=>{
    const filteredImgs = filterClosure(item)(images);
    customSet({images: filteredImgs})
  }
  
  return (
    <div className='relative hover:border-4'>
      <img src={URL.createObjectURL(item)} className="object-cover w-200 h-full" />
      <button className='absolute top-0 left-0'>
       <TiDelete
          className="ml-2 cursor-pointer"
          onClick={onClose}
        />
      </button>
    </div>
  );
};

const ImagePreview = () => {
  const { openPreview, customSet, images } = useProductAdmin();

  return (
    <ModalWrapper
      open={openPreview}
      handleClose={() => {
        customSet({ openPreview: false });
      }}
      mainClassname="overflow-scroll h-[80%] pt-6"
    >
      {images?.length ? (
        <MultiRenderer
          mainClassName="grid grid-cols-3 grid-rows-auto gap-4"
          Component={Preview}
          spreadProps={false}
          rendererSet={images}
          preview="preview"
        />
      ) : null}
    </ModalWrapper>
  );
};

export default ImagePreview;

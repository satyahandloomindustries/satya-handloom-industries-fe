"use client"
import ModalWrapper from '@/components/Modal';
import MultiRenderer from '@/components/MultiRenderer';
import useProductAdmin from '@/store/useProductAdmin';

const Preview = ({item})=>{    

    return <div>
            <img src={URL.createObjectURL(item)} className='object-cover h-full'/>

        </div>
}

const ImagePreview = () => {
  const { openPreview, customSet , images} = useProductAdmin();  
    
  return (
    <ModalWrapper
      open={openPreview}
      handleClose={() => {
        customSet({ openPreview: false });
      }}
      mainClassname='overflow-y-auto'
    >
           {images?.length ? <MultiRenderer mainClassName='grid grid-cols-4 grid-rows-3 gap-4' Component={Preview} spreadProps={false} rendererSet={images} preview='preview'/> : null}
    </ModalWrapper>
  );
};

export default ImagePreview;

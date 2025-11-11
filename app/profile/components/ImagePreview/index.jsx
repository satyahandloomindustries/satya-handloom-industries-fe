'use client';
import Loader from '@/components/Loader';
import ModalWrapper from '@/components/Modal';
import MultiRenderer from '@/components/MultiRenderer';
import useLoading from '@/store/useLoading';
import useProductAdmin from '@/store/useProductAdmin';
import useToast from '@/store/useToast';
import { filterClosure } from '@/utls';
import { TiDelete } from 'react-icons/ti';

const Preview = ({ item }) => {
  const { images, customSet } = useProductAdmin();
  const src = item?.url ? item.url : URL.createObjectURL(item)
  const onClose = () => {
    const filteredImgs = filterClosure(item)(images);
    customSet({ images: filteredImgs });
  };  

  return (
    <div className="relative hover:border-4">
      <img
        src={src}
        className="object-cover w-200 h-full"
      />
      <button className="absolute top-0 left-0">
        <TiDelete className="ml-2 cursor-pointer" onClick={onClose} />
      </button>
    </div>
  );
};

const ImagePreview = () => {
  const { openPreview, customSet, images, uploadImagesToCloudinary } =
    useProductAdmin();
  const { showSuccessToast } = useToast();
  const { loading, setLoading } = useLoading();
  const handleUpload = async () => {
    setLoading(true);
    const respones = await uploadImagesToCloudinary();
    if (respones.status === 200) {
      setTimeout(() => {
        customSet({ openPreview: false });
      }, 800);
      showSuccessToast('Uploaded successfully');
    }
    setLoading(false);
  };

  return (
    <ModalWrapper
      open={openPreview}
      handleClose={() => {
        customSet({ openPreview: false });
      }}
      mainClassname="overflow-scroll h-[80%] pt-6 flex-col pb-10"
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

      <button
        onClick={handleUpload}
        className="w-fit bg-shi_brown text-white text-sm px-4 py-3 mt-4 min-w-[250px]"
      >
        <Loader loading={loading} text="Upload images" />
      </button>
    </ModalWrapper>
  );
};

export default ImagePreview;

'use client';
import useProductAdmin from '@/store/useProductAdmin';

const MultipleImageUpload = () => {
  const { customSet, images } = useProductAdmin();

  const handleChange = (e) => {
    const filesArray = Array.from(e.target.files);
    const finalArray = [...images, ...filesArray];
    const previewUrls = finalArray.map((img) => URL.createObjectURL(img))
    customSet({ images: finalArray  , previewUrls});
  };

  return (
    <>
      <label
        htmlFor="imageUpload"
        className="px-3 py-3 border text-sm border-shi_brown text-shi_brown cursor-pointer"
      >
        Choose product images{' '}
        {images?.length ? (
          <span>
            <button className='hover:text-blue-800' type="button" onClick={(e)=> {              
              e.stopPropagation()
              customSet({openPreview: true})
            }}>({images?.length})</button>
          </span>
        ) : null}
      </label>
      <input
        id="imageUpload"
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
    </>
  );
};

export default MultipleImageUpload;

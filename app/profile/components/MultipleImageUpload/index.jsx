'use client';
import useProductAdmin from '@/store/useProductAdmin';

const MultipleImageUpload = () => {
  const { customSet, images, productImages } = useProductAdmin();

  const handleChange = async (e) => {
    const filesArray = Array.from(e.target.files);
    const finalArray = [...images, ...filesArray];
    customSet({ images: finalArray });
  };

  return (
    <>
      <label
        htmlFor="imageUpload"
        className={`px-3 py-3 border text-sm ${!!productImages ? 'border-gray-400 text-gray-400 bg-gray-200 cursor-not-allowed' : 'border-shi_brown text-shi_brown cursor-pointer'}`}
      >
        Choose product images&nbsp;
        {images?.length ? (
          <span>
            <button
              className="hover:text-blue-800 text-shi_brown"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                customSet({ openPreview: true });
              }}
            >
              ({images?.length})
            </button>
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
        disabled={!!productImages}
      />
    </>
  );
};

export default MultipleImageUpload;

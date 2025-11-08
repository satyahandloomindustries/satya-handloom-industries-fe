import { evd } from '@/utls';
import { useRef } from 'react';
import { FaPlus } from 'react-icons/fa6';

const AddComponentInput = ({
  placeholder,
  mainClassName,
  onClick = () => {},
  children = null,
}) => {
  const ref = useRef(null);
  const handleClick = evd(() => {
    onClick(ref?.current?.value?.trim());
    ref.current.value = '';
  });

  return (
    <div className={mainClassName}>
      <div className={`flex flex-row h-fit mb-2`}>
        <input
          ref={ref}
          type="text"
          suppressHydrationWarning
          placeholder={placeholder}
          className="appearance-none outline-none rounded rounded-tr-none rounded-br-none bg-gray-100 px-3 py-2 text-sm w-full"
        />
        <button
          className="bg-shi_brown text-white px-3 py-2 rounded rounded-tl-none rounded-bl-none"
          suppressHydrationWarning
          onClick={handleClick}
        >
          <FaPlus />
        </button>
      </div>
      {children}
    </div>
  );
};

export default AddComponentInput;

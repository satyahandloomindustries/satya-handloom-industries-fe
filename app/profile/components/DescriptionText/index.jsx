import { TiDelete } from 'react-icons/ti';

const DescriptionText = ({ item, onClose = () => {} }) => {
  return (
    <div className="flex flex-row w-full p-3 bg-gray-100 items-start justify-center">
      <div className="w-full text-sm">{item}</div>
      <TiDelete onClick={() => onClose(item)} className="cursor-pointer" />
    </div>
  );
};

export default DescriptionText;

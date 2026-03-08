'use client';
import useUser from '@/store/useUser';

const ProfileField = ({ name, value , readOnly = true}) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded-md p-2 mt-2"
        placeholder={`Enter your ${name}`}
        name={name}
        value={value}
        readOnly={readOnly}
      />
    </div>
  );
};
const ProfileSummary = () => {
  const { email, phone, address, username } = useUser();
  return (
    <div>
      <h1 className="text-4xl mb-8">Profile Summary</h1>
      <div className="grid grid-cols-2 gap-4">
        <ProfileField name="Username" value={username} />
        <ProfileField name="Email" value={email} />
        <ProfileField name="Phone" value={phone} />
        <ProfileField name="Address" value={address} />
      </div>
    </div>
  );
};

export default ProfileSummary;

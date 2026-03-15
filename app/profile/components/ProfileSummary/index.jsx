'use client';
import useUser from '@/store/useUser';
import { useRouter } from 'next/navigation';

const ProfileField = ({ name, value, readOnly = true }) => {
  return (
    <div>
      <label htmlFor={name}>{name}</label>
      <input
        type="text"
        className="w-full border border-gray-300 rounded-md p-2 mt-2 outline-none appearance-none"
        placeholder={`Enter your ${name}`}
        name={name}
        value={value}
        readOnly={readOnly}
      />
    </div>
  );
};
const ProfileSummary = () => {
  const { email, phone, address, username, logout } = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await logout(() => {
      setTimeout(() => {
        router.replace('/');
        router.refresh();
      }, 800);
    });
  };
  return (
    <div>
      <h1 className="text-4xl mb-8">Profile Summary</h1>
      <div className="grid grid-cols-2 gap-4">
        <ProfileField name="Username" value={username} />
        <ProfileField name="Email" value={email} />
        <ProfileField name="Phone" value={phone} />
        <ProfileField name="Address" value={address} />
      </div>
      <button
        className="text-white bg-shi_brown px-4 py-2 mt-4"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileSummary;

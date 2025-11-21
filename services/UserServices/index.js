import TemporaryUser from '@/models/TemporaryUser';
import User from '@/models/User';

export const verifyUser = async ({ email }) => {
  try {
    const doesUserExist = await User.findOne({ email });
    return !!doesUserExist;
  } catch (err) {
    throw new Error(err?.message);
  }
};

export const getUser = async (email) => {
  return await User.findOne({ email });
};

export const createUser = async ({ email, username, phone }) => {
  return await User.create({ email, username, phone });
};

export const createAndUpdateTemporaryUser = async ({ email, otp }) => {
  return await TemporaryUser.findOneAndUpdate(
    { email },
    { otp, createdAt: new Date() },
    { upsert: true, new: true }
  );
};

export const deleteTemporaryUser = async ({ email }) => {
  await TemporaryUser.deleteOne({ email });
};

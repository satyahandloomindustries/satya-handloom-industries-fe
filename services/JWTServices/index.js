import { SignJWT, jwtVerify } from "jose";


const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

// Generate a new token
export const generateToken = async(payload) => {
  return new SignJWT(payload)
  .setProtectedHeader({ alg: "HS256" })
  .setExpirationTime("1d")
  .sign(JWT_SECRET);
};

// Verify token
export const verifyToken = async (token) => {
  try {
    
    return await jwtVerify(token, JWT_SECRET);
  } catch (err) {
    console.log('errror' , err.message);

    return null;
  }
};

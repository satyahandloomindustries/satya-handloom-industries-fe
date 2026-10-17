'use client';
import axios from 'axios';
import Otp from '../Otp';
import useOtp from '@/hooks/useOtp';
import useUser from '@/store/useUser';
import useFormValidation from '@/hooks/useFormValidation';
import * as Yup from 'yup';
import ErrorMessage from '@/app/contactUs/components/ErrorMessage';
import { verifyDigits } from '@/utls';
import useToast from '@/store/useToast';
import useFormResetOnBlur from '@/hooks/useFormResetOnBlur';
import { useMemo, useState } from 'react';
import Loader from '@/components/Loader';
import { AUTH_MODE } from '@/constants';
import { useRouter } from 'next/navigation';

const fieldClass = (disabled) =>
  `mt-1.5 block w-full rounded-xl border border-[#ead7b4] bg-white px-4 py-2.5 text-sm text-[#2a2118] outline-none transition placeholder:text-[#a89880] focus:border-[#c29958] focus:ring-2 focus:ring-[#c29958]/25 ${
    disabled ? 'cursor-not-allowed bg-[#f7f3ec] text-[#a89880]' : ''
  }`;

const validationShape = {
  username: Yup.string().required('Username is required'),
  phone: Yup.string()
    .required('Phone is required')
    .matches(/^[0-9]{10}$/, '10 digit phone number missing'),
  email: Yup.string().email('Invalid email').required('Email is required'),
};
const Authenticate = () => {
  const [loading, setLoading] = useState(false);
  const [authMode, setAuthMode] = useState(AUTH_MODE.login);
  const isLoginMode = authMode === AUTH_MODE.login;
  const { setInputs, inputs, otpValue, isOtpFilled, openOtp, setOtp } =
    useOtp();
  const {
    username,
    phone,
    setUsername,
    setPhone,
    email,
    setEmail,
    resetUser,
    fetchUser,
  } = useUser();
  const shape = useMemo(() => {
    const { email } = validationShape;
    switch (authMode) {
      case AUTH_MODE.login:
        return { email };
      default:
        return validationShape;
    }
  }, [authMode]);
  const { validation, error, noError, validateAt, resetError } =
    useFormValidation(shape);

  const router = useRouter();

  const { showErrorToast, showSuccessToast } = useToast();

  const formRef = useFormResetOnBlur(resetError);

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    const { invalid } = await validation({ username, phone, email });

    if (!isOtpFilled || invalid) {
      showErrorToast('Please fill the otp completely');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        '/api/verify-otp',
        { email, otp: otpValue, username, phone, mode: authMode },
        {
          headers: {
            Authorization: 'Bearer mytoken',
            'Content-Type': 'application/json',
          },
        }
      );
      showSuccessToast('Otp verified successfully');
      fetchUser();
      setTimeout(() => {
        router.replace('/');
        router.refresh();
      }, 800);
      setLoading(false);
    } catch (err) {
      showErrorToast(err?.message ?? 'Failed to verify the Otp');
      setLoading(false);
    }
  };
  const handleSendOtp = async (event) => {
    event.preventDefault();
    const { invalid } = await validation({ username, phone, email });

    if (invalid) {
      showErrorToast('Please fill the mandatory fields');
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        '/api/send-otp',
        { otpValue, username, phone, email, mode: authMode },
        {
          headers: {
            Authorization: 'Bearer mytoken',
            'Content-Type': 'application/json',
          },
        }
      );

      showSuccessToast('Otp has been sent to your email successfully');
      setOtp(true);
    } catch (err) {
      if (err.response) {
        // The request was made and server responded
        const status = err.response.status;

        if (status === 404) {
          showErrorToast('⚠️ User not found. Please sign up to continue');
        } else if (status === 409) {
          showErrorToast('⚠️ User already exists. Please login to continue');
        } else {
          showErrorToast('❌ Something went wrong. Please try again.');
        }
      } else {
        // Network error or request not sent
        showErrorToast('⚠️ Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleValidateAt = async (event, onChange = () => {}) => {
    const { name, value } = event.target;
    await validateAt(name, value);
    onChange(value);
  };
  const handlePhoneChange = (event) => {
    if (!verifyDigits(event.target.value)) return;
    handleValidateAt(event, setPhone);
  };

  const handleUsernameChange = (event) => {
    handleValidateAt(event, setUsername);
  };

  const handleEmailChange = (event) => {
    handleValidateAt(event, setEmail);
  };

  const inputDisabled = openOtp || loading;

  const buttonLabel = openOtp ? 'Verify' : 'Send verification code';

  const handleAuthMode = (mode = AUTH_MODE.login) => {
    setOtp(false);
    resetUser();
    setAuthMode(mode);
  };
  return (
    <div className="w-full">
      <p className="text-[11px] uppercase tracking-[0.28em] text-[#b8893f]">
        Customer account
      </p>
      <div key={authMode} className="auth-swap min-h-[5.5rem]">
        <h2 className="mt-2 text-3xl font-medium leading-tight text-[#2a2118]">
          {isLoginMode ? 'Welcome back' : 'Create your account'}
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#5c5146]">
          {isLoginMode
            ? 'Sign in with a one-time code sent to your email.'
            : 'Register to enquire and place wholesale orders.'}
        </p>
      </div>

      <div className="relative mt-6 grid grid-cols-2 rounded-full bg-[#f4eadc] p-1">
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-transform duration-300 ease-out ${
            isLoginMode ? 'translate-x-0' : 'translate-x-full'
          }`}
        />
        <button
          type="button"
          onClick={() => handleAuthMode(AUTH_MODE.login)}
          className={`relative z-10 rounded-full py-2 text-sm transition-colors duration-300 ${
            isLoginMode ? 'text-[#2a2118]' : 'text-[#5c5146]'
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => handleAuthMode(AUTH_MODE.signup)}
          className={`relative z-10 rounded-full py-2 text-sm transition-colors duration-300 ${
            !isLoginMode ? 'text-[#2a2118]' : 'text-[#5c5146]'
          }`}
        >
          Sign up
        </button>
      </div>

      <form className="mt-5 space-y-3" ref={formRef}>
        <div
          className={`grid transition-[grid-template-rows,opacity,margin] duration-300 ease-out ${
            isLoginMode
              ? 'grid-rows-[0fr] opacity-0'
              : 'grid-rows-[1fr] opacity-100'
          }`}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-2 gap-3 pb-3">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-[#3d342b]"
                >
                  Username
                </label>
                <input
                  onChange={handleUsernameChange}
                  type="text"
                  value={username}
                  id="username"
                  name="username"
                  placeholder="Your name"
                  className={fieldClass(inputDisabled)}
                  disabled={inputDisabled || isLoginMode}
                  tabIndex={isLoginMode ? -1 : 0}
                />
                {error?.username ? (
                  <ErrorMessage message={error.username} />
                ) : null}
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-[#3d342b]"
                >
                  Phone
                </label>
                <input
                  onChange={handlePhoneChange}
                  id="phone"
                  type="tel"
                  name="phone"
                  value={phone}
                  placeholder="10-digit number"
                  className={fieldClass(inputDisabled)}
                  disabled={inputDisabled || isLoginMode}
                  tabIndex={isLoginMode ? -1 : 0}
                />
                {error?.phone ? <ErrorMessage message={error.phone} /> : null}
              </div>
            </div>
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#3d342b]"
          >
            Email
          </label>
          <input
            onChange={handleEmailChange}
            type="email"
            value={email}
            id="email"
            name="email"
            placeholder="you@company.com"
            className={fieldClass(inputDisabled)}
            disabled={inputDisabled}
          />
          {error?.email ? <ErrorMessage message={error.email} /> : null}
        </div>

        <Otp inputs={inputs} setInputs={setInputs} visible={openOtp} />

        <button
          type="submit"
          onClick={openOtp ? handleVerifyOtp : handleSendOtp}
          disabled={!noError || loading}
          className="mt-2 flex w-full items-center justify-center rounded-full bg-[#c29958] py-3 text-sm tracking-wide text-white transition hover:bg-[#b8893f] disabled:cursor-not-allowed disabled:bg-[#c29958]/50"
        >
          <Loader loading={loading} text={buttonLabel} />
        </button>
        <p className="mt-4 text-xs leading-5 text-[#8a7b68]">
          We email a 4-digit code to confirm this account.
        </p>
      </form>
    </div>
  );
};

export default Authenticate;

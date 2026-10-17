'use client';
import { evd, pasteOtp, verifyDigits } from '@/utls';
import { useEffect, useRef } from 'react';

const Otp = ({
  numberOfBoxes = 4,
  inputs = new Array(4).fill(''),
  setInputs = () => {},
  visible = false,
}) => {
  const refs = useRef([]);

  useEffect(() => {
    handleOtpFocus(0);
  }, [visible]);

  const handleOtpFocus = (i) => {
    if (i >= 0 && i <= numberOfBoxes - 1) {
      refs.current[i]?.focus();
      refs.current[i]?.setSelectionRange(1, 1);
    }
  };
  const handleChange = (event, index) => {
    const newInputs = [...inputs];
    const otpValue = event.target.value.slice(-1);
    if (!verifyDigits(otpValue)) return;

    newInputs[index] = otpValue;
    setInputs(newInputs);

    // Move to next input Box
    if (otpValue) {
      handleOtpFocus(index + 1);
    }
  };

  const handleKeyDown = (event, index) => {
    const next = index + 1 >= numberOfBoxes ? 0 : index + 1;
    const prev = index - 1 < 0 ? numberOfBoxes - 1 : index - 1;

    switch (event.key) {
      case 'ArrowRight': {
        if (inputs[index]) handleOtpFocus(next);
        break;
      }
      case 'ArrowLeft': {
        if (inputs[index]) handleOtpFocus(prev);
        break;
      }

      case 'Backspace': {
        if (!inputs[index]) refs.current[prev]?.focus();
      }
    }
  };
  const handlePaste = evd((event) => {
    try {
      const pastedData = pasteOtp(event).slice(0, numberOfBoxes);
      const newOtp = pastedData.padEnd(numberOfBoxes).split('');
      setInputs(newOtp);
      newOtp.forEach((char, i) => {
        if (refs.current[i]) {
          refs.current[i].value = char;
        }
      });

      // focus last filled input
      const lastIndex = Math.min(pastedData.length - 1, numberOfBoxes - 1);
      handleOtpFocus(lastIndex);
    } catch (err) {}
  });

  if (!visible) return null;
  return (
    <div className="mb-4">
      <p className="mb-2 text-sm font-medium text-[#3d342b]">
        Enter the verification code
      </p>
      <div className="grid grid-cols-4 gap-3" onPaste={handlePaste}>
        {inputs.map((i, index) => (
          <input
            name={index.toString()}
            autoComplete="off"
            inputMode="numeric"
            type="text"
            ref={(i) => refs.current.push(i)}
            value={i}
            className="h-12 w-12 rounded-xl border border-[#ead7b4] bg-white text-center text-lg text-[#2a2118] outline-none focus:border-[#c29958] focus:ring-2 focus:ring-[#c29958]/25"
            key={index}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Otp;

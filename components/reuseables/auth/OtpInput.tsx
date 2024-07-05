"use client";

import OtpInput from "react-otp-input";

export default function OTP({
  otp,
  setOtp,
  num,
}: {
  otp: string;
  setOtp: (value: string) => void;
  num?: number;
}) {
  return (
    <OtpInput
      inputStyle="w-full h-full min-w-[66px] min-h-[66px] max-w-[66px] max-h-[66px] border-1 border-[#D9D9D9] dark:bg-dark-0 rounded-[11px] text-[120%] font-bold"
      inputType="number"
      numInputs={num || 4}
      renderInput={(props: any) => <input {...props} />}
      renderSeparator={
        <span className="flex gap-4">
          <span />
          <span />
        </span>
      }
      value={otp}
      onChange={setOtp}
    />
  );
}

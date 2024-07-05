"use server";

import { destroyToken, setToken } from "@/lib";

interface Result {
  success: boolean;
  message: string;
  data?: any;
  status?: number;
}

const handleSignUp = async (body: any): Promise<Result> => {
  try {
    const responsePromise = fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    const timeoutPromise = new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout exceeded")), 60000)
    );

    const response = await Promise.race([responsePromise, timeoutPromise]);

    const data = await response.json();

    if (![200, 204, 201].includes(data?.statusCode)) {
      let errorMessage: string =
        data.message || "Something happened, please try again later!";

      return { success: false, message: errorMessage };
    } else {
      const user = data.data;

      await setToken(user.email_address, "email");

      return {
        success: true,
        message:
          "Account Created Successfully\nVerify account with the link sent to your email",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Something happened, please try again later!",
    };
  }
};

const handleResetPassword = async (
  email: string,
  otp: string,
  password: string,
  confirmPassword: string
): Promise<Result> => {
  if (password !== confirmPassword) {
    return {
      success: false,
      message: "passwords do not match",
    };
  }

  try {
    const responsePromise = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          confirm_password: confirmPassword,
          id: email,
          Otp: otp,
        }),
      }
    );

    const timeoutPromise = new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout exceeded")), 60000)
    );

    const response = await Promise.race([responsePromise, timeoutPromise]);

    const data = await response.json();

    if (![200, 204, 201].includes(data?.statusCode)) {
      let errorMessage: string =
        data.message || "Something happened try again later!";

      return { success: false, message: errorMessage, status: response.status };
    }

    const { message } = data;

    await destroyToken("email");
    await destroyToken("otp");

    return { success: true, message };
  } catch (error: any) {
    return { success: false, message: "Something happened try again later!" };
  }
};

const handleForgotPassword = async (email: string): Promise<Result> => {
  try {
    const responsePromise = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/otp/resend/${email}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const timeoutPromise = new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout exceeded")), 60000)
    );

    const response = await Promise.race([responsePromise, timeoutPromise]);

    const data = await response.json();

    if (![200, 204, 201].includes(data?.statusCode)) {
      const errorMessage =
        data.message || "Something happened try again later!";

      return { success: false, message: errorMessage };
    }

    const { message } = data;

    await setToken(email, "email");

    return { success: true, message: message };
  } catch (error: any) {
    return { success: false, message: "Something happened try again later!" };
  }
};

const handleVerification = async (
  otp: string,
  email: string,
  verify_for?: string
): Promise<Result> => {
  try {
    const responsePromise = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/otp/verify?reset=${
        verify_for === "password_reset"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Otp: otp, id: email }),
      }
    );

    const timeoutPromise = new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error("Timeout exceeded")), 60000)
    );

    const response = await Promise.race([responsePromise, timeoutPromise]);

    const data = await response.json();

    if (![200, 204, 201].includes(data?.statusCode)) {
      let errorMessage: string =
        data.message || "Something happened try again later!";

      return { success: false, message: errorMessage };
    }

    const { message, data: resData } = data;

    await setToken(email, "email");

    return { success: true, message, data: resData };
  } catch (error: any) {
    return { success: false, message: "Something happened try again later!" };
  }
};

export {
  handleSignUp,
  handleResetPassword,
  handleForgotPassword,
  handleVerification,
};

export type { Result };

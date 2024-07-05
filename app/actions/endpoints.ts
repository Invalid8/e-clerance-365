import { authFetch } from "@/app/actions";
import { InstitutionType, NYSCType, StudentType, UserType } from "@/types";

type Result = {
  success: boolean;
  message: string;
  status?: string;
  data?: any;
};

export async function getProfile(): Promise<Result> {
  try {
    const { data, message } = await authFetch<{
      data: StudentType | InstitutionType | NYSCType;
      message: string;
      statusType: number;
    }>(`/api/profile`);

    return {
      success: true,
      data: data,
      message: message,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "An error occured",
    };
  }
}

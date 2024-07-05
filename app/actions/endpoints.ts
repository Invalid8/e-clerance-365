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

export async function getStudents(): Promise<Result> {
  try {
    const { data, message } = await authFetch<{
      data: StudentType[];
      message: string;
      statusType: number;
    }>(`/api/students`);

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

export async function updateStudent(id: string, body: any): Promise<Result> {
  try {
    const { data, message } = await authFetch<{
      data: StudentType;
      message: string;
      statusType: number;
    }>(`/api/students`, {
      method: "PUT",
      body: JSON.stringify({ id, updatedData: body }),
    });

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

export async function toggleClear(studentId: string): Promise<Result> {
  try {
    const { data, message } = await authFetch<{
      data: StudentType;
      message: string;
      statusType: number;
    }>(`/api/students/toggle_clear`, {
      method: "POST",
      body: JSON.stringify({ studentId }),
    });

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

export async function deleteStudent(studentId: string): Promise<Result> {
  try {
    const { data, message } = await authFetch<{
      data: StudentType;
      message: string;
      statusType: number;
    }>(`/api/students`, {
      method: "DELETE",
      body: JSON.stringify({ studentId }),
    });

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

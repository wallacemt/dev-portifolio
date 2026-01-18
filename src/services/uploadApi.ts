import { API, setupAuth } from "@/lib/axios";
import type { UploadResult, UploadOptions } from "@/types/badges";

export const uploadSingleFile = async (
  file: string,
  options?: UploadOptions,
): Promise<{ message: string; result: UploadResult }> => {
  try {
    setupAuth();
    const response = await API.post("/upload/single", {
      file,
      ...options,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Erro ao fazer upload",
    );
  }
};

export const uploadMultipleFiles = async (
  files: string[],
  options?: UploadOptions,
): Promise<{ message: string; results: UploadResult[] }> => {
  try {
    setupAuth();
    const response = await API.post("/upload/multiple", {
      files,
      ...options,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Erro ao fazer upload dos arquivos",
    );
  }
};

export const deleteFile = async (
  publicId: string,
  resourceType: "image" | "raw" | "video" = "image",
): Promise<{ message: string }> => {
  try {
    setupAuth();
    const response = await API.delete("/upload/delete", {
      data: {
        publicId,
        resourceType,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Erro ao deletar arquivo",
    );
  }
};

/**
 * Convert File to base64 string
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Erro ao converter arquivo"));
      }
    };
    reader.onerror = (error) => reject(error);
  });
};

/**
 * Convert multiple Files to base64 strings
 */
export const filesToBase64 = async (files: File[]): Promise<string[]> => {
  const promises = files.map((file) => fileToBase64(file));
  return Promise.all(promises);
};

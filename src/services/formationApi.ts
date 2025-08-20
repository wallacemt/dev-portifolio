import { API, ownerId, setupAuth, SimpleResponse } from "@/lib/axios";
import { FormationAddFormData, FormationUpdateFormData } from "@/lib/validations/formations";
import { Formation, FormationResponse } from "@/types/formations";
export const getFormations = async (language: string = "pt"): Promise<FormationResponse> => {
  try {
    const response = await API.get<FormationResponse>(`/formations/owner/${ownerId}?language=${language}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const postFormation = async (data: FormationAddFormData): Promise<Formation> => {
  try {
    setupAuth();
    const res = await API.post("/formations/private/create", data);
    return res.data as Formation;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error creating formation"
    );
  }
};

export const putFormation = async (id: string, data: FormationUpdateFormData): Promise<Formation> => {
  try {
    setupAuth();
    const res = await API.put(`/formations/private/${id}/update`, data);
    return res.data as Formation;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error updating formation"
    );
  }
};

export const deleteFormation = async (id: string): Promise<SimpleResponse> => {
  try {
    setupAuth();
    const res = await API.delete(`/formations/private/${id}/delete`);
    return res.data as SimpleResponse;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error removing formation"
    );
  }
};

export const concludedFormation = async (id: string): Promise<SimpleResponse> => {
  try {
    setupAuth();
    const res = await API.post(`/formations/private/${id}/conclude`);
    return res.data as SimpleResponse;
  } catch (error) {
    throw new Error(
      (error as { response: { data: { error: string } } }).response?.data?.error || "Error concluding formation"
    );
  }
};

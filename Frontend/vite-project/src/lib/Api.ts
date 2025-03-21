import type { Treatments } from "../utils/interfaces";

export const fetchTreatments = async (): Promise<Treatments[]> => {
  try {
    const response = await fetch("http://localhost:5000/api/products");
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const treatments: Treatments[] = await response.json();
    return treatments;
  } catch (error) {
    console.error("Error fetching Treatments:", error);
    return [];
  }
};

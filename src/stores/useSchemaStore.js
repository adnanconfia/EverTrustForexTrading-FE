import { create } from "zustand";
import { getSchemaDetails } from "../services/schemaService";

const useSchemaStore = create((set, get) => ({
  schemaData: null,
  error: null,

  fetchSchemaData: async () => {
    if (get().schemaData) return null;

    try {
      const data = await getSchemaDetails();
      set({ schemaData: data, error: null });
      return data;
    } catch (err) {
      set({ error: err.message });
      throw err; // Let component handle it
    }
  },
}));

export default useSchemaStore;

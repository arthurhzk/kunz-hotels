import { defineStore } from "pinia";
import type { Cabin } from "~/interfaces/cabinType";
export const useCabinStore = defineStore("cabins", () => {
  const supabase = useSupabaseClient();
  const initialState = {
    id: "",
    name: "",
    maxCapacity: undefined,
    discount: undefined,
    regularPrice: undefined,
    image: "",
  };
  const state = reactive<Cabin>({ ...initialState });

  const updateCabin = async (id: string) => {
    await supabase
      .from("cabins")
      .update({
        maxCapacity: state.maxCapacity,
        discount: state.discount,
        regularPrice: state.regularPrice,
      })
      .eq("id", id)
      .select();
  };

  return {
    state,
    updateCabin,
  };
});

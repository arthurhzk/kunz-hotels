import type { Cabin } from "~/interfaces/cabinType";

const useFetchCabins = () => {
  const isLoading = ref(false);
  const supabase = useSupabaseClient();
  const cabins = ref<Cabin[]>([]);

  const fetchCabins = async () => {
    isLoading.value = true;
    try {
      const response = await supabase.from("cabins").select("*");
      isLoading.value = false;
      cabins.value = response.data || [];
    } catch (error) {
      isLoading.value = false;
      console.error("Error fetching cabins", error);
    }
  };
  const deleteCabins = async (id: string) => {
    const { error } = await supabase.from("cabins").delete().eq("id", id);
  };

  return { cabins, fetchCabins, isLoading, deleteCabins };
};

export default useFetchCabins;

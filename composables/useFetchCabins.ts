const useFetchCabins = () => {
  const supabase = useSupabaseClient();
  const cabins = ref<never[] | null>([]);
  const fetchCabins = async () => {
    try {
      const response = await supabase.from("cabins").select("*");
      cabins.value = response.data;
    } catch (error) {
      console.error("Error fetching cabins", error);
    }
  };

  return { cabins, fetchCabins };
};

export default useFetchCabins;

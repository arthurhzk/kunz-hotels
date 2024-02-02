const useFetchCabins = () => {
  interface Cabin {
    id: number;
    name: string;
    maxCapacity: number;
    discount: number;
    regularPrice: number;
    image: string;
  }

  const isLoading = ref(false);
  const supabase = useSupabaseClient();
  const cabins = ref<Cabin[]>([]);

  const initialState = {
    name: "",
    maxCapacity: undefined,
    discount: undefined,
    regularPrice: undefined,
    image: "",
  };

  const state = reactive(initialState);

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

  const addCabin = async () => {
    try {
      await supabase.from("cabins").insert(state);
    } catch (error) {
      console.error("Error adding cabin", error);
    }
  };

  return { cabins, fetchCabins, isLoading, state, addCabin };
};

export default useFetchCabins;

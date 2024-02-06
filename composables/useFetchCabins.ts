import type { Cabin } from "~/interfaces/cabinType";

const useFetchCabins = () => {
  const isLoading = ref(false);
  const supabase = useSupabaseClient();
  const cabins = ref<Cabin[]>([]);
  const isOpen = ref(false);
  const { toastSuccess, toastError } = useAppToast();
  const initialState = {
    id: undefined,
    name: "",
    maxCapacity: undefined,
    discount: undefined,
    regularPrice: undefined,
    image: "",
  };
  const state = ref<Cabin>({ ...initialState });
  const addCabin = async () => {
    try {
      await supabase.from("cabins").upsert({ ...state.value });
      toastSuccess({
        title: "Cabana adicionada com sucesso",
      });
      toastSuccess;
      isOpen.value = false;
    } catch (error) {
      toastError({
        title: "Erro ao adicionar cabana",
      });
      isOpen.value = false;
      toastError;
    }
  };

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
    await supabase.from("cabins").delete().eq("id", id);
  };

  return {
    cabins,
    fetchCabins,
    isLoading,
    deleteCabins,
    state,
    addCabin,
  };
};

export default useFetchCabins;

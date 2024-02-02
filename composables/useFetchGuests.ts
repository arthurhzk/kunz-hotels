const useFetchGuests = () => {
  interface Guest {
    id: number;
    created_at: string;
    fullName: string;
    email: string;
    nationalID: number;
    nationality: string;
    countryFlag: string;
  }
  const supabase = useSupabaseClient();
  const guests = ref<Guest[]>([]);
  const isLoading = ref(false);
  const fetchGuests = async () => {
    isLoading.value = true;
    try {
      const response = await supabase.from("guests").select("*");
      guests.value = response.data || [];
      isLoading.value = false;
    } catch (error) {
      console.log(error);
      isLoading.value = false;
    }
  };

  return { fetchGuests, guests, isLoading };
};

export default useFetchGuests;

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
  const fetchGuests = async () => {
    try {
      const response = await supabase.from("guests").select("*");
      guests.value = response.data || [];
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchGuests, guests };
};

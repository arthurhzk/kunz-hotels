const useFetchBookings = () => {
  const supabase = useSupabaseClient();
  const bookings = ref([]);

  const fetchBookings = async (start: Date, end: Date) => {
    try {
      const response = await supabase
        .from("bookings")
        .select(
          "startDate, endDate, numNights, numGuests, guestId, numGuests, totalPrice, observations"
        )
        .gte("startDate", start.toISOString())
        .lte("endDate", end.toISOString());

      bookings.value = response.data;
    } catch (error) {
      console.log(error);
    }
  };
  return { fetchBookings, bookings };
};

export default useFetchBookings;

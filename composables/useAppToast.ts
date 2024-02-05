export const useAppToast = () => {
  const toast = useToast();

  return {
    toastSuccess: ({ title }: { title: string }) => {
      toast.add({
        title,
        icon: "i-heroicons-check-circle",
        color: "green",
      });
    },
    toastError: ({ title }: { title: string }) => {
      toast.add({
        title,
        icon: "i-heroicons-exclamation-circle",
        color: "red",
      });
    },
  };
};

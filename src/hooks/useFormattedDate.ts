import { useMemo } from "react";

const useFormattedDate = (dateString: string) => {
  const formattedDate = useMemo(() => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }, [dateString]);

  return formattedDate;
};

export default useFormattedDate;

import { useAppDispatch } from "app/hooks";
import { setPageTitle } from "features/common/headerSlice";
import { useEffect } from "react";

const useTitle = (title: string) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    dispatch(setPageTitle({ title: title }));
    return () => {
      document.title = prevTitle;
    };
  }, [title]);
};

export default useTitle;

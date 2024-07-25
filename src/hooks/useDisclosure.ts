import { useAppDispatch, useAppSelector } from "app/hooks";
import { closeModal, openModal } from "features/common/modalSlice";

const useDisclosure = (modalName: string) => {
  const isOpen = useAppSelector((state) => state.modal[modalName]);
  const dispatch = useAppDispatch();

  const onOpen = () => {
    dispatch(openModal(modalName));
  };

  const onClose = () => {
    dispatch(closeModal(modalName));
  };

  return { isOpen, onOpen, onClose };
};

export default useDisclosure;

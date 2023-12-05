import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { ModalType } from 'types/signin';

export default function useTerms(props: ModalType) {
  const { open, handleClose } = props;
  /// 전체 동의
  const [all, setAll] = useState<boolean>(false);
  /// check List
  const [agreeTermA, setAgreeTermA] = useState<boolean>(false);
  const [agreeTermB, setAgreeTermB] = useState<boolean>(false);
  const [agreeAdvertising, setAgreeAdvertising] = useState<boolean>(false);
  /// 활성화
  const [disabled, setDisabled] = useState<boolean>(true);
  const [modalOn, setModalOn] = useState<boolean>(false);

  const allAgreeCheck = useCallback(() => {
    if (agreeTermA && agreeTermB && agreeAdvertising) {
      setAgreeTermA(false);
      setAgreeTermB(false);
      setAgreeAdvertising(false);
      setAll(false);
    } else {
      setAgreeTermA(true);
      setAgreeTermB(true);
      setAgreeAdvertising(true);
      setAll(true);
    }
  }, [agreeAdvertising, agreeTermA, agreeTermB]);

  const onCheckBox = (
    boo: boolean,
    setBoo: Dispatch<SetStateAction<boolean>>,
  ) => {
    setBoo(!boo);
  };

  const reset = () => {
    setAgreeTermA(false);
    setAgreeTermB(false);
    setAgreeAdvertising(false);
    setAll(false);
  };

  const handleEvent = useCallback(() => {
    setModalOn(true);
  }, []);

  const handleCloseAll = useCallback(() => {
    handleClose();
    reset();
    setModalOn(false);
  }, [handleClose]);

  useEffect(() => {
    if (agreeTermA && agreeTermB && agreeAdvertising) {
      setDisabled(false);
      setAll(true);
    } else {
      setDisabled(true);
      setAll(false);
    }
  }, [agreeAdvertising, agreeTermA, agreeTermB, setAll]);

  return {
    handleCloseAll,
    handleEvent,
    onCheckBox,
    allAgreeCheck,
    disabled,
    modalOn,
    all,
    agreeTermA,
    agreeTermB,
    agreeAdvertising,
    open,
    setAgreeTermA,
    setAgreeTermB,
    setAgreeAdvertising,
    handleClose,
  };
}

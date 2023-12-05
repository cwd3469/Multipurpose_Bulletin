import { commaAdd } from '@utils/formatNumber';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { ErrorType } from 'types/signin';

interface ModalDisableType {
  value: string;
  amount: string;
  err: ErrorType;
  errAmount: ErrorType;
  setDisabled: Dispatch<SetStateAction<boolean>>;
}

const useModalDisable = (props: ModalDisableType) => {
  const { value, amount, err, errAmount, setDisabled } = props;
  // 등록 케이스 disable 해제
  const reDisableOn = useCallback(() => {
    if (value === '') {
      setDisabled(true);
      return;
    }
    if (amount === '') {
      setDisabled(true);
      return;
    }
    if (errAmount.boo) {
      setDisabled(true);
      return;
    }
    if (err.boo) {
      setDisabled(true);
      return;
    }
    setDisabled(false);
  }, [amount, err.boo, errAmount.boo, setDisabled, value]);

  const moDisableOn = useCallback(
    (originValue: string, originAmount: string) => {
      const comma = commaAdd(originAmount);
      if (
        originValue !== value ||
        (comma !== amount && comma + '원' !== amount)
      ) {
        reDisableOn();
      } else {
        setDisabled(true);
      }
    },
    [amount, reDisableOn, setDisabled, value],
  );

  const disabledOff = useCallback(() => {
    setDisabled(false);
  }, [setDisabled]);

  return { reDisableOn, moDisableOn, disabledOff };
};

export default useModalDisable;

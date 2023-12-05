import { useCallback, useEffect, useState } from 'react';
import { ErrorType } from 'types/signin';
import { commaAdd } from '@utils/formatNumber';
import { UseNonReimburse } from '../type';

const useNonReimburse = (props: UseNonReimburse) => {
  const prefix = '원';

  const [value, setValue] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [err, setErr] = useState<ErrorType>({ msg: '', boo: false });
  const [errAmount, setErrAmount] = useState<ErrorType>({
    msg: '',
    boo: false,
  });
  const [disabled, setDisabled] = useState<boolean>(true);
  // 모달 리셋
  const reset = useCallback(() => {
    setAmount('');
    setValue('');
    setErr({ msg: '', boo: false });
    setErrAmount({ msg: '', boo: false });
    setDisabled(true);
  }, [setErrAmount]);

  useEffect(() => {
    if (props.data) {
      setValue(props.data.nameKo);
      setAmount(commaAdd(String(props.data.amount)) + prefix);
    }
  }, [props.data]);

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  return {
    value,
    setValue,
    amount,
    setAmount,
    err,
    setErr,
    errAmount,
    setErrAmount,
    disabled,
    setDisabled,
    reset,
  };
};
export default useNonReimburse;

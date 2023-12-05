import { useCallback, useEffect, useState } from 'react';
import { ErrorType, ModalType } from 'types/signin';
import useValidation from '@hooks/useValidation';

const useQueueCancellation = () => {
  const [value, setValue] = useState<string>('');
  const [err, setErr] = useState<ErrorType>({ msg: '', boo: false });
  const [disabled, setDisabled] = useState<boolean>(true);
  const vaild = useValidation();

  const refusalVaild = useCallback((text: string) => {
    if (!text) {
      setErr({
        msg: '20자 이내의 진료 취소 사유를 입력해주세요.',
        boo: true,
      });
    } else {
      setErr({ msg: '', boo: false });
    }
  }, []);

  const handleRefusal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    if (vaild.regRefusal.test(text)) {
      setValue(text);
      refusalVaild(text);
      return;
    } else {
      setErr({
        msg: '20자 이내의 진료 취소 사유를 입력해주세요.',
        boo: true,
      });
      return;
    }
  };

  const reset = () => {
    setValue('');
    setDisabled(true);
    setErr({ msg: '', boo: false });
  };

  useEffect(() => {
    if (!value) {
      if (err.boo) {
        setDisabled(true);
      }
    } else {
      if (err.boo) {
        setDisabled(true);
      } else {
        setDisabled(false);
      }
    }
  }, [err.boo, value]);

  return {
    reset,
    handleRefusal,
    refusalVaild,
    disabled,
    err,
    value,
  };
};
export default useQueueCancellation;

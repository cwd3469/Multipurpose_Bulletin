import { useCallback, useEffect, useState } from 'react';
import { SelectChangeEvent } from '@mui/material';
import { ErrorType } from 'types/signin';
import useValidation from '@hooks/useValidation';
import { WOptionType } from 'types/common';

const useReceptionRefusal = () => {
  const refusal: WOptionType[] = useCallback(() => {
    const arr = [
      { id: 'reason', name: '- 사정' },
      { id: 'close', name: '- 운영시간 종료' },
      { id: 'entry', name: '직접 입력' },
    ];
    return arr;
  }, [])();
  const [refusalState, setRefusal] = useState<string>(refusal[0].id);
  const vaild = useValidation();
  const [value, setValue] = useState<string>('');
  const [err, setErr] = useState<ErrorType>({ msg: '', boo: false });
  const [disabled, setDisabled] = useState<boolean>(true);
  const [modalDisabled, setmodalDisabled] = useState<boolean>(true);

  const refusalVaild = useCallback((text: string) => {
    if (text) {
      setErr({ msg: '', boo: false });
    } else {
      setErr({ msg: '20자 이내의 거절 사유를 입력해주세요.', boo: true });
    }
  }, []);

  const onSelectRefusal = useCallback((event: SelectChangeEvent) => {
    setRefusal(event.target.value);
  }, []);

  const onChangeRefusal = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      if (vaild.regRefusal.test(text)) {
        setValue(text);
        refusalVaild(text);
        return;
      } else {
        setErr({
          msg: '20자 이내의 거절 사유를 입력해주세요.',
          boo: true,
        });
        return;
      }
    },
    [refusalVaild, vaild.regRefusal],
  );
  const reset = useCallback(() => {
    setValue('');
    setDisabled(true);
    setErr({ msg: '', boo: false });
    setRefusal(refusal[0].id);
  }, [refusal]);

  useEffect(() => {
    if (refusalState === 'entry') {
      setDisabled(false);
      setmodalDisabled(true);
      if (value && !err.boo) {
        setmodalDisabled(false);
      }
    } else {
      setDisabled(true);
      setmodalDisabled(false);
      setValue('');
      setErr({ msg: '', boo: false });
    }
  }, [err.boo, refusalState, value]);

  return {
    reset,
    onChangeRefusal,
    onSelectRefusal,
    refusalVaild,
    disabled,
    modalDisabled,
    err,
    value,
    refusalState,
    refusal,
  };
};
export default useReceptionRefusal;

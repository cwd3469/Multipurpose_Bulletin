import { ErrorType, ModalType } from 'types/signin';
import { useCallback, useEffect, useState } from 'react';
import useValidation from '@hooks/useValidation';
import { residentNumConverter } from '@utils/formatNumber';
import { UseReceptionAccept } from '../type';

const useReceptionAccept = (props: UseReceptionAccept) => {
  const { handleClose, open, data } = props;

  const residentNum = residentNumConverter(data.registration);
  const vaild = useValidation();
  const [mrn, setMRM] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);
  const [mrnErr, setMrnErr] = useState<ErrorType>({ msg: '', boo: false });

  const onChangeMrm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const num = e.target.value;
      if (num.length <= 10) {
        if (num.length !== 0 && !vaild.regExNumberOnly.test(num)) {
          setMrnErr({
            msg: '1~10자리의 환자 등록번호를 입력해 주세요.',
            boo: true,
          });
          return;
        }
        setMRM(num.replace(/[^0-9]/g, ''));
        setMrnErr({
          msg: '',
          boo: false,
        });

        if (num.length <= 10 && num.length > 1) {
          setMrnErr({ msg: '', boo: false });
        }
        if (num.length < 1) {
          setMrnErr({
            msg: '1~10자리의 환자 등록번호를 입력해 주세요.',
            boo: true,
          });
        }
      }
    },
    [vaild],
  );

  const onOpenReset = useCallback(() => {
    handleClose();
    setMRM('');
    setMrnErr({ msg: '', boo: false });
  }, [handleClose]);

  useEffect(() => {
    if (mrn.length <= 10 && mrn.length > 1) {
      setDisabled(false);
    }
    if (mrn.length < 1) {
      setDisabled(true);
    }
  }, [mrn.length]);

  return {
    open,
    mrn,
    mrnErr,
    disabled,
    residentNum,
    onOpenReset,
    onChangeMrm,
  };
};
export default useReceptionAccept;

import { usePostNonReimbursement } from '@hooks/api/hospitalDoctor/nonReimbursement';
import { useToastContext } from '@hooks/useToastContext';
import { commaRemove } from '@utils/formatNumber';
import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { ModalType } from 'types/signin';
import useModalDisable from '../hooks/useModalDisable';
import useNonReimburse from '../hooks/useNonReimburse';
import { NoneReimburseDto } from '../type';
import NonReimburseView from '../views/NonReimburseView';

const NonReimburseRegister = (props: ModalType) => {
  const { handleClose, open } = props;
  const toast = useToastContext();
  const router = useRouter();
  const { mutate: postNonReimbursement } = usePostNonReimbursement(
    router.query,
  );
  const {
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
  } = useNonReimburse({ data: undefined });
  const { reDisableOn } = useModalDisable({
    value,
    amount,
    err,
    errAmount,
    setDisabled,
  });
  const modalReset = useCallback(() => {
    handleClose();
    reset();
  }, [handleClose, reset]);

  const onClickModal = useCallback(() => {
    const non = Number(commaRemove(amount));

    const dto: NoneReimburseDto = {
      nameKo: value,
      amount: non,
    };

    postNonReimbursement(dto, {
      onSuccess(data, variables, context) {
        const { status } = data.data;
        if (status === 'SUCCESS') {
          modalReset();
        } else {
          toast?.on(
            ' 국내 비급여 항목 등록에 실패하였습니다. \n 잠시 후, 다시 시도해 주세요',
            'error',
          );
        }
      },
    });
  }, [amount, modalReset, postNonReimbursement, toast, value]);

  const onDebounceFnModal = useDebounceFn(onClickModal, {
    wait: 300,
  });

  useEffect(() => {
    reDisableOn();
  }, [reDisableOn]);

  return (
    <NonReimburseView
      mode={'register'}
      disabled={disabled}
      open={open}
      value={value}
      setValue={setValue}
      amount={amount}
      setAmount={setAmount}
      err={err}
      setErr={setErr}
      errAmount={errAmount}
      setErrAmount={setErrAmount}
      modalReset={modalReset}
      onDebounceFnModal={onDebounceFnModal.run}
    />
  );
};

export default NonReimburseRegister;

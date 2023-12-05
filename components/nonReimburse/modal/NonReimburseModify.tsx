import {
  useNonReimbursementDetail,
  usePutNonReimbursement,
} from '@hooks/api/hospitalDoctor/nonReimbursement';
import { useToastContext } from '@hooks/useToastContext';
import { commaRemove } from '@utils/formatNumber';
import { useDebounceFn } from 'ahooks';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import useModalDisable from '../hooks/useModalDisable';
import useNonReimburse from '../hooks/useNonReimburse';
import {
  NoneReimburseDto,
  NoneReimburseModifyDto,
  NonReimburseModifyTemplatesType,
  NonReimburseModifyType,
} from '../type';
import NonReimburseView from '../views/NonReimburseView';

const NonReimburseModify = (props: NonReimburseModifyType) => {
  const res = useNonReimbursementDetail(props.id);

  if (res.isLoading) {
    return <></>;
  }
  if (res.data) {
    const apiData: NoneReimburseDto = res.data.data.data;
    return <NonReimburseModifyTemplates {...props} data={apiData} />;
  }

  return <></>;
};

const NonReimburseModifyTemplates = (
  props: NonReimburseModifyTemplatesType,
) => {
  const { handleClose, open, data, id } = props;
  const toast = useToastContext();
  const router = useRouter();
  const { mutate: putNonReimbursement } = usePutNonReimbursement(router.query);
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
  } = useNonReimburse({ data: data });
  const { moDisableOn } = useModalDisable({
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
    const dto: NoneReimburseModifyDto = {
      amount: non,
      nameKo: value,
      nonReimbursementItemUlid: id,
    };
    putNonReimbursement(dto, {
      onSuccess(data) {
        const { status } = data.data;
        if (status === 'SUCCESS') {
          modalReset();
        } else {
          toast?.on(
            ' 국내 비급여 항목 수정에 실패하였습니다. \n 잠시 후, 다시 시도해 주세요',
            'error',
          );
        }
      },
    });
  }, [amount, id, modalReset, putNonReimbursement, toast, value]);

  const onDebounceFnModal = useDebounceFn(onClickModal, {
    wait: 300,
  });

  useEffect(() => {
    moDisableOn(data.nameKo, String(data.amount));
  }, [data.amount, data.nameKo, moDisableOn]);

  return (
    <NonReimburseView
      mode={'modify'}
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

export default NonReimburseModify;

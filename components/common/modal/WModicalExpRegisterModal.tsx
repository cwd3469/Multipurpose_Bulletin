import { ModalType } from 'types/signin';
import { commaRemove } from '@utils/formatNumber';
import { useRouter } from 'next/router';
import { MedicalModifyParams } from '@hooks/api/hospitalDoctor/prescription';
import useHistoryExpenses from '@components/history/hooks/useHistoryExpenses';
import { useCallback, useState } from 'react';
import useMedicalExpensesVaild from '@components/history/hooks/useMedicalExpensesVaild';
import HistoryExpensesView from '@components/history/views/HistoryExpensesView';
import HistoryPaymentFailed from '@components/history/modal/HistoryPaymentFailed';

interface WModicalExpRegisterModalType extends ModalType {
  ulid: string;
  onRegisterExp: (params: MedicalModifyParams) => void;
  onClickClose?: (reset: () => void) => void;
  onFaildClose?: () => void;
}

const WModicalExpRegisterModal = (props: WModicalExpRegisterModalType) => {
  const { open, handleClose, ulid, onRegisterExp, onClickClose, onFaildClose } =
    props;
  const router = useRouter();
  //WMedicalExpModifyTemplates 결제 실패 모달 open 상태
  const [faildOpen, setFaildOpen] = useState<boolean>(false);
  const data = { prescription: null, expenses: '' };
  const {
    reset,
    tabEvent,
    setExpenses,
    setInFileData,
    formData,
    expenses,
    tab,
    mode,
    updateUid,
    uid,
  } = useHistoryExpenses({
    mode: 'register',
    open: open,
    handleClose: handleClose,
    prescriptionUlid: 'register',
  });

  const onFaildModalClose = useCallback(() => {
    setFaildOpen(false);
    reset();
  }, [reset]);

  const setModifyExp = () => {
    if (formData) {
      const amount = commaRemove(expenses);
      const file = new FormData();
      file.append('amount', amount);
      formData.append('amount', amount);
      const dto = {
        ulid: ulid,
        formData: tab ? formData : file,
      };
      onRegisterExp({
        handleClose: handleClose,
        query: router.query,
        ulid: dto.ulid,
        onPaymentSuccess: onFaildModalClose,
        onPaymentFailed: function (): void {
          setFaildOpen(true);
        },
        formData: dto.formData,
      });
    }
  };

  // WMedicalExpModifyTemplates 버튼 유효성 검사 custom hook
  const { disabled } = useMedicalExpensesVaild({
    modifyUid: uid[uid.length - 1],
    modifyExp: commaRemove(expenses),
    mode: 'register',
    tab: tab,
  });

  const historyExpensesViewprops = {
    bgDisabled: faildOpen,
    data: data,
    tab: tab,
    reset: onFaildModalClose,
    tabEvent: tabEvent,
    expenses: expenses,
    disabled: disabled,
    setExpenses: setExpenses,
    updateOnClick: setModifyExp,
    open: open,
    mode: mode,
    setInFileData: setInFileData,
    updateUid,
    onClickEnd: onClickClose
      ? () => onClickClose(onFaildModalClose)
      : undefined,
  };

  return (
    <>
      <HistoryExpensesView {...historyExpensesViewprops} />
      <HistoryPaymentFailed
        open={faildOpen}
        handleClose={() => {
          if (onFaildClose) onFaildClose();
          reset();
        }}
      />
    </>
  );
};

export default WModicalExpRegisterModal;

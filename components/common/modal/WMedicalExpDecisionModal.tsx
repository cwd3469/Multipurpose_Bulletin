import { ModalType } from 'types/signin';
import { useCallback, useState } from 'react';
import usePrescriptionPreview from '@hooks/file/usePrescriptionPreview';
import { commaRemove } from '@utils/formatNumber';
import useHistoryExpenses from '@components/history/hooks/useHistoryExpenses';
import useMedicalExpensesVaild from '@components/history/hooks/useMedicalExpensesVaild';
import HistoryExpensesView from '@components/history/views/HistoryExpensesView';
import HistoryPaymentFailed from '@components/history/modal/HistoryPaymentFailed';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import WErrorPage from './WErrorPage';
import { MedicalModifyParams } from '@hooks/api/hospitalDoctor/prescription';
import { AxiosResponse } from 'axios';
import { ParsedUrlQuery } from 'querystring';

interface WMedicalExpModifyModalType extends ModalType {
  ulid: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  res: AxiosResponse<any, any> | undefined;
  isError: boolean;
  onModifyMedicalExp: (params: MedicalModifyParams) => void;
  query: ParsedUrlQuery;
}

interface PrescriptionAmount {
  amount: number;
  prescriptionUlid: string;
}

interface WMedicalExpModifyTemplatesType extends WMedicalExpModifyModalType {
  data: PrescriptionAmount;
}
const WMedicalExpModifyTemplates = (props: WMedicalExpModifyTemplatesType) => {
  const { query, data, ulid, open, handleClose, onModifyMedicalExp } = props;
  //WMedicalExpModifyTemplates 결제 실패 모달 open 상태
  const [faildOpen, setFaildOpen] = useState<boolean>(false);
  const {
    fileArr,
    fileForm,
    reset: fileReset,
  } = usePrescriptionPreview({
    registrationUlid: ulid,
    fileInfoUlid: data.prescriptionUlid,
    handleClose: handleClose,
  });
  //WMedicalExpModifyTemplates 진료비 등록 수정 기능 hook
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
    ...props,
    mode: 'modify',
    dataAmount: String(data.amount),
    fileForm: fileForm,
    prescriptionUlid: data.prescriptionUlid,
  });
  // WMedicalExpModifyTemplates 모달 닫기 기능
  const onhandleCloseExpModal = useCallback(() => {
    reset();
    fileReset();
    setFaildOpen(false);
  }, [fileReset, reset]);

  // WMedicalExpModifyTemplates 진료비 첨부 수정
  const onExpModify = () => {
    if (formData) {
      const amount = commaRemove(expenses);
      const file = new FormData();
      file.append('amount', amount);
      formData.append('amount', amount);
      const dto = {
        ulid: ulid,
        formData: tab ? formData : file,
      };
      onModifyMedicalExp({
        handleClose: onhandleCloseExpModal,
        query: query,
        ulid: dto.ulid,
        onPaymentSuccess: () => {
          onhandleCloseExpModal();
        },
        onPaymentFailed: () => {
          setFaildOpen(true);
        },
        formData: dto.formData,
      });
    }
  };
  // WMedicalExpModifyTemplates 버튼 유효성 검사 custom hook
  const { disabled } = useMedicalExpensesVaild({
    originUid: uid[0],
    originExp: String(data.amount),
    modifyUid: uid[uid.length - 1],
    modifyExp: commaRemove(expenses),
    mode: 'modify',
    tab: tab,
    isPrescription: data.prescriptionUlid ? true : false,
  });

  //WMedicalExpModifyTemplates props
  const historyExpensesViewprops = {
    bgDisabled: faildOpen,
    data: {
      prescription: data.prescriptionUlid ? (fileArr.length ? fileArr[0] : null) : null,
      expenses: String(data.amount),
    },
    tab: tab,
    reset: onhandleCloseExpModal,
    tabEvent: tabEvent,
    expenses: expenses,
    disabled: disabled,
    setExpenses: setExpenses,
    updateOnClick: onExpModify,
    open: open,
    mode: mode,
    setInFileData: setInFileData,
    updateUid,
    prescriptionUlid: data.prescriptionUlid,
  };

  return (
    <>
      <HistoryExpensesView {...historyExpensesViewprops} />
      <HistoryPaymentFailed open={faildOpen} handleClose={onhandleCloseExpModal} />
    </>
  );
};

const WMedicalExpModifyModal = (props: WMedicalExpModifyModalType) => {
  const { res, isError, handleClose } = props;
  const msg = useCodeMsgBundle();

  if (isError) {
    return (
      <WErrorPage
        isError={isError}
        errMsg={`처방전,진료비를 조회하는데 실패 하였습니다. \n 잠시후 다시 시도 해 주세요.`}
        mode="modal"
        back={handleClose}
      />
    );
  }

  if (res) {
    if (res.data.code !== '0000') {
      return (
        <WErrorPage
          isError={true}
          errMsg={msg.errMsg(res.data.code)}
          mode="modal"
          back={handleClose}
        />
      );
    } else {
      const data: PrescriptionAmount = res.data.data;

      return <WMedicalExpModifyTemplates data={data} {...props} />;
    }
  }
  return <></>;
};

export default WMedicalExpModifyModal;

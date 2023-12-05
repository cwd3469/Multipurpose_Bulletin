import WConfirmModal from '@components/common/modal/WConfirmModal';
import { Box, Stack } from '@mui/material';
import { UidList } from '@components/common/fileUpload/types';
import WTwoTab from '@components/common/buttons/WTwoTab';
import DomesticCost from '../inputs/DomesticCost';
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDebounceFn } from 'ahooks';
import ExpensesFilePicker from '@components/waitingRoom/Inputs/ExpensesFilePicker';

interface HistoryExpViewType {
  bgDisabled?: boolean;
  onClickEnd?: () => void;
  reset: () => void;
  tabEvent: (boo: boolean) => void;
  expenses: string;
  disabled: boolean;
  setExpenses: Dispatch<SetStateAction<string>>;
  updateOnClick: () => void;
  data: {
    prescription: File | Promise<File | undefined> | null;
    expenses: string;
  };
  tab: boolean;
  mode?: 'modify' | 'register';
  open: boolean;
  setInFileData?: (fileDataForm: FormData, file?: File) => void;
  updateUid: (uid: UidList[]) => void;
  prescriptionUlid?: string;
}

const HistoryExpensesView = (props: HistoryExpViewType) => {
  const {
    bgDisabled,
    reset,
    tabEvent,
    expenses,
    disabled,
    tab,
    mode,
    setExpenses,
    updateOnClick,
    setInFileData,
    onClickEnd,
    data,
    open,
    updateUid,
    prescriptionUlid,
  } = props;

  const onPrescribeUpload = useDebounceFn(updateOnClick, {
    wait: 300,
  });
  const [docFile, setDocFile] = useState<File[]>([]);
  const isFileUpload = docFile.length;
  const isFileUploadTabOn = tab && isFileUpload;
  const expensesFileUpload = useCallback(
    (doc: File[], uid?: UidList[]) => {
      setDocFile(doc);
      if (uid) updateUid(uid);
    },
    [updateUid],
  );
  const onClickCloseModal = () => {
    setDocFile([]);
    reset();
  };

  return (
    <WConfirmModal
      open={open}
      handleClose={onClickCloseModal}
      handleEvent={onPrescribeUpload.run}
      closeBtnEvent={onClickEnd ? onClickEnd : undefined}
      btnTitle={mode === 'modify' ? '처방 수정' : '처방 등록'}
      closeBtnTitle={mode === 'modify' ? '' : '나중에 등록'}
      maxWidth="lg"
      activeOn
      disabled={disabled}
      bgDisable={bgDisabled}
      title={
        mode === 'modify' ? '처방전 및 진료비 수정' : '처방전 및 진료비 등록'
      }
      titleSx={{
        padding: isFileUploadTabOn ? '50px 0px 20px' : '50px 0px 28px',
      }}
      childrenHeader={<WTwoTab tab={tab} setTab={tabEvent} />}
      childrenAction={
        <Box padding="0 40px">
          <DomesticCost state={expenses} setState={setExpenses} />
          <Box height={tab ? (isFileUpload ? '12px' : '130px') : '260px'} />
        </Box>
      }
    >
      <Stack
        gap={isFileUpload ? '20px' : '38px'}
        padding={'00px 15px'}
        sx={{ display: tab ? 'block' : 'none' }}
      >
        <ExpensesFilePicker
          target={mode === 'modify' ? 'DomesticModifyPicker' : 'DomesticPicker'}
          defaultfile={data.prescription}
          multi={false}
          files={docFile}
          fileUpLoad={expensesFileUpload}
          setInFileData={setInFileData}
          prescriptionUlid={prescriptionUlid}
        />
        {isFileUpload ? <></> : <Box height="40px" />}
      </Stack>
    </WConfirmModal>
  );
};
HistoryExpensesView.defaultProps = {
  mode: 'register',
};

export default HistoryExpensesView;

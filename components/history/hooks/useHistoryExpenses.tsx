import { ModalType } from 'types/signin';
import { useCallback, useEffect, useState } from 'react';
import { UidList } from '@components/common/fileUpload/types';
import { useToastContext } from '@hooks/useToastContext';
import { commaAdd } from '@utils/formatNumber';

interface useHistoryExpensesType extends ModalType {
  mode?: 'modify' | 'register';
  dataAmount?: string;
  fileForm?: FormData;
  prescriptionUlid?: string;
  originFile?: File[];
}

const useHistoryExpenses = (props: useHistoryExpensesType) => {
  const { mode, dataAmount, fileForm, prescriptionUlid, originFile } = props;
  const toast = useToastContext();
  const originExp = dataAmount ? `${commaAdd(dataAmount)}` : '';
  const [tab, setTab] = useState<boolean>(false);
  const from =
    typeof window === 'undefined' ? undefined : new window.FormData();

  //useHistoryExpenses 진료비 상태
  const [expenses, setExpenses] = useState<string>('');
  //useHistoryExpenses 첨부파일 X 진료비 데이터 상태
  const [formData, setFormData] = useState<FormData | undefined>(from);
  //useHistoryExpenses 첨부파일 X 진료비 데이터 상태
  const [modifyFile, setModifyFile] = useState<File[]>([]);
  const [uid, setUpdateUid] = useState<UidList[]>([]);

  const updateUid = (uids: UidList[]) => {
    setUpdateUid((prec) => {
      return [...prec, uids[0]];
    });
  };

  useEffect(() => {
    if (originFile) {
      setModifyFile(originFile);
    }
  }, [originFile]);

  //useHistoryExpenses 첨부파일 진료비 상태 업데이트
  useEffect(() => {
    if (prescriptionUlid) {
      setTab(true);
      return;
    }
    setTab(false);
  }, [prescriptionUlid]);
  //useHistoryExpenses 첨부파일 진료비 상태 업데이트
  useEffect(() => {
    if (fileForm) {
      setFormData(fileForm);
    }
    if (originExp) {
      setExpenses(originExp + '원');
    }
  }, [fileForm, originExp]);

  /**useHistoryExpenses 탭 이동 기능 */
  const tabEvent = useCallback(
    (boo: boolean) => {
      setTab(boo);
    },
    [setTab],
  );
  /**useHistoryExpenses 모달 닫기 기능 */
  const reset = () => {
    if (mode !== 'modify') {
      toast?.on(
        '잊지 말고 처방전 여부를 통해 \n 꼭 진료비를 입력해 주세요.',
        'info',
      );
    }
    setModifyFile([]);
    setUpdateUid([]);
    setTab(true);
    setExpenses('');
    props.handleClose();
  };
  /**useHistoryExpenses 파일 업데이트 기능 */
  const setInFileData = useCallback((fileDataForm: FormData, file?: File) => {
    setFormData(fileDataForm);
    if (file) {
      setModifyFile([file]);
    }
  }, []);

  const value = {
    reset,
    tabEvent,
    setInFileData,
    formData,
    expenses,
    tab,
    setTab,
    mode,
    modifyFile,
    setExpenses,
    updateUid,
    uid,
  };

  return value;
};
useHistoryExpenses.defaultProps = {
  mode: 'register',
};

export default useHistoryExpenses;

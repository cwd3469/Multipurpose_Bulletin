import { UidList } from '@components/common/fileUpload/types';
import { commaRemove } from '@utils/formatNumber';
import { useEffect, useState } from 'react';

interface Exp {
  prescriptionUlid?: File[];
  expenses: string;
}

interface UseMedicalExpensesProps {
  originUid?: UidList;
  originExp?: string;
  modifyUid?: UidList;
  modifyExp: string;
  mode: 'modify' | 'register';
  tab: boolean;
  isPrescription?: boolean;
}

const useMedicalExpensesVaild = (props: UseMedicalExpensesProps) => {
  const {
    mode,
    tab,
    originExp,
    modifyExp,
    modifyUid,
    originUid,
    isPrescription,
  } = props;
  const [disabled, setDisabled] = useState<boolean>(true);

  //useMedicalExpensesVaild 처방전 X 진료비 버튼 활성화 기능
  useEffect(() => {
    /**useMedicalExpensesVaild 진료비 유효성 검사 기능 */
    const costChekcValid = (cost: string) => {
      const amount = commaRemove(cost);
      if (amount === '') {
        return true;
      }
      const number = Number(amount);
      if (number > 1990000) {
        return true;
      }
      if (number < 100) {
        if (number !== 0) {
          return true;
        }
        return false;
      }
      return false;
    };
    const modifyData = {
      exp: modifyExp,
      file: tab ? modifyUid : undefined,
    };
    const originData = {
      exp: originExp,
      file: isPrescription ? originUid : undefined,
    };
    let costValid = costChekcValid(modifyExp);
    if (mode === 'modify') {
      if (JSON.stringify(modifyData) === JSON.stringify(originData)) {
        setDisabled(true);
        return;
      }
      if (tab && !isPrescription && !modifyData.file) {
        setDisabled(true);
        return;
      }
      setDisabled(costValid);
      return;
    } else {
      if (tab && !modifyData.file) {
        setDisabled(true);
        return;
      }
      setDisabled(costValid);
      return;
    }
  }, [mode, tab, modifyExp, modifyUid, originExp, originUid, isPrescription]);

  return { disabled };
};

export default useMedicalExpensesVaild;

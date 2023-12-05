import { ModalType } from 'types/signin';
import { TreatmentSetTableType } from '../type';
import useMutateReceptionState from '../hooks/useMutateReceptionState';
import GnbTreatStateView from '@components/common/layout/gnb/modal/GnbTreatStateView';
import { useEffect, useState } from 'react';
import { DataListType } from '../modules/SupportTreatmentSetTable';

export interface MedicalReception extends ModalType {
  tableData?: DataListType;
}

const SupportTreatmentSetReception = (props: MedicalReception) => {
  const [bgDisabled, setBgDisabled] = useState<boolean>(false);
  const [status, setStatus] = useState<boolean>(false);
  const [nameKo, setNameKo] = useState<string>('');
  const [ulid, setUlid] = useState<string>('');
  const [receptionStatus, setReceptionStatus] = useState<boolean>(false);

  const reset = () => {
    props.handleClose();
    setBgDisabled(false);
  };
  const { onClickReceptionStateStart, onClickReceptionStateClose } =
    useMutateReceptionState({
      doctorUlid: ulid,
      doctorIsDone: receptionStatus,
      reset: reset,
      openMobal: () => {
        setBgDisabled(true);
      },
    });

  useEffect(() => {
    if (props.tableData) {
      setStatus(props.tableData.clinicStatus);
      setNameKo(props.tableData.doctorNameKo);
      setUlid(props.tableData.doctorAccountUlid);
      setReceptionStatus(props.tableData.clinicStatus);
    }
  }, [props.tableData]);

  if (props.tableData) {
    return (
      <GnbTreatStateView
        setRouter={`/medical-support/doctor-set?doctorId=${ulid}`}
        open={props.open}
        status={status}
        nameKo={nameKo}
        setting={bgDisabled}
        setSetting={setBgDisabled}
        handleClose={props.handleClose}
        onClickExtensionOpen={onClickReceptionStateStart}
        onClickExtensionClose={onClickReceptionStateClose}
      />
    );
  }

  return <></>;
};
export default SupportTreatmentSetReception;

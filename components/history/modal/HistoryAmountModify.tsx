import { ModalType } from 'types/signin';
import {
  usePrescription,
  useMedicalModify,
} from '@hooks/api/hospitalDoctor/prescription';
import { useRouter } from 'next/router';
import WMedicalExpModifyModal from '@components/common/modal/WMedicalExpDecisionModal';

interface HistoryAmountModifyType extends ModalType {
  ulid: string;
}

const HistoryAmountModify = (props: HistoryAmountModifyType) => {
  const { open, handleClose, ulid } = props;
  const router = useRouter();
  const { medicalModify } = useMedicalModify();
  const { data, isError } = usePrescription(ulid);

  return (
    <WMedicalExpModifyModal
      ulid={ulid}
      res={data}
      isError={isError}
      onModifyMedicalExp={medicalModify}
      query={router.query}
      open={open}
      handleClose={handleClose}
    />
  );
};

export default HistoryAmountModify;

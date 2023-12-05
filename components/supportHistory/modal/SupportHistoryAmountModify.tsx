import { ModalType } from 'types/signin';
import {
  useSupportMedicalModify,
  useSupportPrescription,
} from '@hooks/api/hospitalSupport/supportPrescription';
import WMedicalExpModifyModal from '@components/common/modal/WMedicalExpDecisionModal';
import { useRouter } from 'next/router';

interface HistoryAmountModifyType extends ModalType {
  ulid: string;
}

const SupportHistoryAmountModify = (props: HistoryAmountModifyType) => {
  const { open, handleClose, ulid } = props;
  const router = useRouter();
  const { data, isError } = useSupportPrescription(ulid);
  const { medicalModify } = useSupportMedicalModify();
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

export default SupportHistoryAmountModify;

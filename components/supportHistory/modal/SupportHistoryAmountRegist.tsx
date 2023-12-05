import { ModalType } from 'types/signin';
import { useSupportExpRegist } from '@hooks/api/hospitalSupport/supportPrescription';
import WModicalExpRegisterModal from '@components/common/modal/WModicalExpRegisterModal';

interface SupportHistoryAmountRegistProps extends ModalType {
  ulid: string;
}
const SupportHistoryAmountRegist = (props: SupportHistoryAmountRegistProps) => {
  const { ulid, open, handleClose } = props;
  const { medicalExpRegist } = useSupportExpRegist();

  return (
    <WModicalExpRegisterModal
      ulid={ulid}
      onRegisterExp={medicalExpRegist}
      open={open}
      handleClose={handleClose}
    />
  );
};

export default SupportHistoryAmountRegist;

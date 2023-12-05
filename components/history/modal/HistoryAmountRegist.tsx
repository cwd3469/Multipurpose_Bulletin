import { ModalType } from 'types/signin';
import { useMedicalExpRegist } from '@hooks/api/hospitalDoctor/prescription';
import WModicalExpRegisterModal from '@components/common/modal/WModicalExpRegisterModal';

interface HistoryAmountRegistType extends ModalType {
  ulid: string;
}

const HistoryAmountRegist = (props: HistoryAmountRegistType) => {
  const { ulid, open, handleClose } = props;
  const { onMedicalExpRegister } = useMedicalExpRegist();
  return (
    <WModicalExpRegisterModal
      ulid={ulid}
      onRegisterExp={onMedicalExpRegister}
      open={open}
      handleClose={handleClose}
    />
  );
};

export default HistoryAmountRegist;

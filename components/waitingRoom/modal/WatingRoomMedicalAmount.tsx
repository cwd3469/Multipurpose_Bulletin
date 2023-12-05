import { ModalType } from 'types/signin';
import { useContext } from 'react';
import WaitingUlidContext from '../context/WaitingUlidContext';
import WModicalExpRegisterModal from '@components/common/modal/WModicalExpRegisterModal';
import {
  MedicalModifyParams,
  useMedicalExpRegist,
} from '@hooks/api/hospitalDoctor/prescription';

interface WatingRoomMedicalExpensesType extends ModalType {
  setState: () => void;
  leaveVideo?: () => void;
}

const WatingRoomMedicalAmount = (props: WatingRoomMedicalExpensesType) => {
  const { setState, leaveVideo, open, handleClose } = props;
  const { ulid } = useContext(WaitingUlidContext);
  const { onClickTreatEnd, onClickRegisterLater, backUrl } =
    useMedicalExpRegist();
  const onClickEnd = (reset: () => void) => {
    onClickRegisterLater({ ulid, leaveVideo, handleClose: reset });
  };

  return (
    <WModicalExpRegisterModal
      ulid={ulid}
      onRegisterExp={(params: MedicalModifyParams) => {
        onClickTreatEnd({
          ...params,
          setState: setState,
          onPaymentSuccess: function (): void {
            setState();
            params.onPaymentSuccess();
          },
        });
      }}
      open={open}
      handleClose={handleClose}
      onClickClose={onClickEnd}
      onFaildClose={() => {
        backUrl();
        setState();
      }}
    />
  );
};

export default WatingRoomMedicalAmount;

import RegistrationModifyView from '../views/ReserveModifyView';
import useReserveModal from '../hooks/useReserveModal';
import useReserveModify from '../hooks/useReserveModify';
import {
  ReceptionAcceptModalType,
  ReserveModifyModalTemplateProps,
  ReserveModifyViewProps,
} from '../type';
import useReserveModifyMutation from '../hooks/useReserveModifyMutation';
import dayjs from 'dayjs';
import { useDoctorReceptionAccept } from '@hooks/api/hospitalDoctor/doctorReception';

/**ReserveModifyModal 예약 정보 모달 컴포넌트*/
const ReserveModifyModal = (props: ReceptionAcceptModalType) => {
  const { info } = useReserveModal();
  const { open, handleClose, ulid } = props;
  const { data: req } = useDoctorReceptionAccept(props.ulid);

  if (!info) return;
  if (!req || req.data.code !== '0000') return <></>;
  const { data } = req.data;

  const timetable = dayjs(info.reservedAt).format('HH:mm');
  const viewProps: ReserveModifyModalTemplateProps = {
    open,
    ulid,
    handleClose,
    patientInfo: {
      name: data.residentNameKo as string,
      registration: data.residentRegistrationNum as string,
      patientRegistrationNum: data.patientRegistrationNum as string,
      mobile: data.residentMobileNumNum as string,
      updateDate: info.reservedAt,
      timetable,
    },
  };
  return <ReserveModifyModalTemplate {...viewProps} />;
};

/**ReserveModifyModalTemplate 예약 정보 모달 템플릿 컴포넌트*/
const ReserveModifyModalTemplate = (props: ReserveModifyModalTemplateProps) => {
  const originInfo = props.patientInfo;
  const userInfo = useReserveModal();
  const fn = useReserveModify({
    origin: originInfo,
  });
  const { onReserveModify } = useReserveModifyMutation({
    ...fn.reserveModifyInfo,
    reservationUlid: userInfo.info ? userInfo.info.reservationUlid : '',
    reasonSelect: fn.reasonSelect,
    handleClose: props.handleClose,
  });

  const viewProps: ReserveModifyViewProps = {
    ...props,
    ...fn,
    modalFunction: onReserveModify,
  };

  return <RegistrationModifyView {...viewProps} />;
};

export default ReserveModifyModal;

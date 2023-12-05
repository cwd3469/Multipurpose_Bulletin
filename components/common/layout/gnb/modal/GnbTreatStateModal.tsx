import React, { useCallback, useContext, useState } from 'react';
import { GnbTreatStateMobalType } from '../types';
import {
  usePutDoctorTelemedicineClinicClose,
  usePutDoctorTelemedicineClinicOpen,
} from '@hooks/api/hospitalDoctor/doctorTelemedicineStatus';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useToastContext } from '@hooks/useToastContext';
import GnbTreatStateView from './GnbTreatStateView';
import UserInfoContext from '@hooks/contexts/UserInfoContext';

const useGnbTreatStateModal = (props: GnbTreatStateMobalType) => {
  const toast = useToastContext();
  const msg = useCodeMsgBundle();
  const [setting, setSetting] = useState<boolean>(false);
  const { mutate: mutateStateClose } = usePutDoctorTelemedicineClinicClose();
  const { mutate: mutateStateOpen } = usePutDoctorTelemedicineClinicOpen();

  const onClickExtensionClose = useCallback(() => {
    mutateStateClose(undefined, {
      onError() {
        toast?.on(
          '접수 상태 변경에 실패하였습니다 \n 잠시 후, 다시 시도해 주세요',
          'error',
        );
      },
      onSuccess(data) {
        if (data.data.code !== '0000') {
          if (data.data.code === '7102') {
            setSetting(true);
          }
          toast?.on(msg.errMsg(data.data.code), 'error');
          return;
        }
        props.handleClose();
      },
    });
  }, [msg, mutateStateClose, props, toast]);

  const onClickExtensionOpen = useCallback(() => {
    mutateStateOpen(undefined, {
      onError() {
        toast?.on(
          '접수 상태 변경에 실패하였습니다 \n 잠시 후, 다시 시도해 주세요',
          'error',
        );
      },
      onSuccess(data) {
        if (data.data.code !== '0000') {
          if (data.data.code === '7102') {
            setSetting(true);
          }
          toast?.on(msg.errMsg(data.data.code), 'error');
          return;
        }
        props.handleClose();
      },
    });
  }, [msg, mutateStateOpen, props, toast]);

  return { onClickExtensionOpen, onClickExtensionClose, setting, setSetting };
};

const GnbTreatStateModal = (props: GnbTreatStateMobalType) => {
  const context = useContext(UserInfoContext);
  const info = useGnbTreatStateModal(props);

  if (context.accountInfo)
    return (
      <GnbTreatStateView
        setRouter="/doctor/setting"
        open={props.open}
        status={props.status}
        nameKo={context.accountInfo.nameKo}
        setting={info.setting}
        setSetting={info.setSetting}
        handleClose={props.handleClose}
        onClickExtensionOpen={info.onClickExtensionOpen}
        onClickExtensionClose={info.onClickExtensionClose}
      />
    );
  return <></>;
};

export default GnbTreatStateModal;

import { Box, Button, Grid, styled, Typography as Text } from '@mui/material';
import { ContantsLayout, Logo } from '../Layout';
import GnbTimer from './GnbTimer';
import GnbMyInfo from './GnbMyInfo';
import { useDoctorTelemedicineClinicStatus } from '@hooks/api/hospitalDoctor/doctorTelemedicineStatus';
import { useCallback, useContext, useState } from 'react';
import { GnbSwitch } from './GnbButtons';
import UserInfoContext from '../../../../hooks/contexts/UserInfoContext';
import GnbTreatStateModal from './modal/GnbTreatStateModal';
import usePermissionRouter from '@hooks/utils/usePermissionRouter';
import { errorTestUrl } from '@hooks/api/proxy/proxy';

const GnbNavList = styled(Grid)(({ theme }) => ({
  display: 'flex',
  gap: '18px',
  alignItems: 'center',
}));

const FlexSpaceBetween = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
}));

interface GnbBodyType {
  children: JSX.Element | JSX.Element[] | React.ReactNode;

  disabled?: boolean;
}

const LogoButton = (props: { disabled?: boolean }) => {
  const { permission } = useContext(UserInfoContext);
  const { mainRouter } = usePermissionRouter();
  const onClickLogo = useCallback(() => {
    mainRouter(permission);
  }, [mainRouter, permission]);

  return (
    <Button onClick={onClickLogo} disabled={props.disabled}>
      <Logo />
    </Button>
  );
};

export const GnbBody = (props: GnbBodyType) => {
  const { children, disabled } = props;
  const { permission } = useContext(UserInfoContext);
  return (
    <ContantsLayout sx={{ padding: '11px 0' }}>
      <FlexSpaceBetween>
        <GnbNavList>
          <LogoButton disabled={disabled} />
          <Box width={'48px'} />
          {children}
        </GnbNavList>

        <GnbNavList>
          {permission === 'HOSPITAL_DOCTOR' ? (
            <>
              <GnbExtensionButton disabled={disabled} />
              <GnbTimer />
            </>
          ) : permission === 'MEDICAL_SUPPORT' ? (
            <GnbTimer />
          ) : (
            ''
          )}
          <GnbMyInfo disabled={disabled} />
        </GnbNavList>
        {/* <Button
          variant="contained"
          onClick={async () => {
            const data = await errorTestUrl();
          }}
        >
          error
        </Button> */}
      </FlexSpaceBetween>
    </ContantsLayout>
  );
};

export const GnbExtensionButton = (props: { disabled?: boolean }) => {
  const [modalOn, setmModalOn] = useState<boolean>(false);
  const { data, isLoading, isError } = useDoctorTelemedicineClinicStatus();

  const btn = {
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: '100%',
    height: '100%',
  };

  if (isLoading) {
    return <>isLoading...</>;
  }
  if (data) {
    const status = data.data.data.status;

    return (
      <>
        <Box sx={{ position: 'relative' }}>
          <GnbSwitch readOnly checked={status} />
          <Button
            sx={btn}
            onClick={() => setmModalOn(true)}
            disabled={props.disabled}
          ></Button>
        </Box>
        <GnbTreatStateModal
          open={modalOn}
          handleClose={() => setmModalOn(false)}
          status={status}
        />
      </>
    );
  }

  return <></>;
};

export const GnbInspection = () => {
  return (
    <ContantsLayout
      sx={{ padding: '11px 0' }}
      bg="#f8f8f8"
      containerColor="#f8f8f8"
    >
      <FlexSpaceBetween>
        <GnbNavList>
          <Logo />
        </GnbNavList>
      </FlexSpaceBetween>
    </ContantsLayout>
  );
};

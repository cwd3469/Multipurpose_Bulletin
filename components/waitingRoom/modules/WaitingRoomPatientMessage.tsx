import { Box, Grid, Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { WatingRoomButton } from '../WaitingRoomTheme';
import CheckIcon from '@mui/icons-material/Check';
import useValidation from '@hooks/useValidation';
import { ErrorType } from 'types/signin';
import { TreatmentState } from '../WaitingRoomPage';
import { useToastContext } from '@hooks/useToastContext';
import WMaxTextarea from '@components/common/inputs/textarea/WMaxTextarea';
import { useDoctorOfficePatientCommunications } from '@hooks/api/hospitalDoctor/doctorOffice';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import WaitingUlidContext from '../context/WaitingUlidContext';
import UserInfoContext from '@hooks/contexts/UserInfoContext';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useDebounceFn } from 'ahooks';

const WaitingRoomPatientMessage = (props: {
  state: TreatmentState;
  patientMessage?: string;
}) => {
  const { state } = props;
  const valid = useValidation();
  const msg = useCodeMsgBundle();
  const toast = useToastContext();
  const { ulid } = useContext(WaitingUlidContext);
  const { permission } = useContext(UserInfoContext);
  const { mutate: mutateDoctorOfficePatientCommunications } =
    useDoctorOfficePatientCommunications(ulid);
  const limit = 200;
  const [originData, setOriginData] = useState<string>('');
  const [communications, setCommunications] = useState<string>('');
  const [helper, setHelper] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(true);
  const [textDisable, setTextDisable] = useState<boolean>(true);
  const [error, setError] = useState<ErrorType>({ msg: '', boo: false });

  const communicationsOnClick = () => {
    const dto = {
      ulid: ulid,
      patientMessage: communications,
    };
    mutateDoctorOfficePatientCommunications(dto, {
      onSuccess(res) {
        if (res.data.code !== '0000') {
          toast?.on(msg.errMsg(res.data.code), 'error');
        } else {
          toast?.on(
            state === 'MODIFY'
              ? '진료 내용 수정을 완료하였습니다.'
              : '진료 내용 등록을 완료하였습니다.',
            'success',
          );
        }
      },
      onError() {
        toast?.on(
          state === 'MODIFY'
            ? '진료 내용 수정 요청이 실패하였습니다.\n 잠시 후, 다시 시도해 주세요'
            : '진료 내용 등록 요청이 실패하였습니다.\n 잠시 후, 다시 시도해 주세요',
          'error',
        );
      },
    });
  };
  const onDebounceCommunication = useDebounceFn(communicationsOnClick, {
    wait: 300,
  });

  const communicationsFocusOn = () => setHelper(true);
  const communicationsFocusOut = () => setHelper(false);
  const communicationsOnChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    if (e.target.value.length <= limit) {
      valid.communicationsInput({
        txt: e.target.value,
        pass: setCommunications,
        error: setError,
      });
    }
  };

  useEffect(() => {
    if (props.patientMessage) {
      setCommunications(props.patientMessage);
      setOriginData(props.patientMessage);
    }
  }, [props.patientMessage]);

  useEffect(() => {
    if (permission === 'HOSPITAL_DOCTOR') {
      if (state === 'WAIT' || state === 'HOLD' || state === 'CLOSE') {
        setTextDisable(true);
        setCommunications('');
        setDisable(true);
      } else {
        setTextDisable(false);
        setDisable(false);
      }
    } else {
      setTextDisable(true);
      setDisable(true);
    }
  }, [permission, state]);

  useEffect(() => {
    if (state === 'MODIFY') {
      if (permission !== 'HOSPITAL_DOCTOR') {
        setDisable(true);
      } else {
        if (originData !== communications) {
          setDisable(false);
        } else {
          setDisable(true);
        }
      }
    }
  }, [communications, communications.length, originData, permission, state]);

  return (
    <Stack gap="12px">
      <Grid container alignItems={'center'} gap="16px">
        <Typography variant="subtitle1" lineHeight={'1'}>
          환자 전달 사항{' '}
        </Typography>
        <Grid
          container
          width={'auto'}
          sx={{
            borderRadius: '30px',
            padding: '4.5px',
            backgroundColor: '#fff',
            border: '1px solid #4ac6ff',
            color: '#4ac6ff',
            minWidth: '171px',
            justifyContent: 'center',
            gap: '9.5px',
          }}
        >
          <InfoOutlinedIcon sx={{ fontSize: '15px' }} />
          <Typography variant="body1" lineHeight={'17px'}>
            전달 내용 외 작성 주의
          </Typography>
        </Grid>
      </Grid>
      <Stack gap="12px">
        <WMaxTextarea
          placeholder={
            permission === 'HOSPITAL_DOCTOR'
              ? textDisable
                ? '환자에게 전달할 진료 내용을 작성해 주세요.'
                : ''
              : ''
          }
          disabled={textDisable}
          value={communications}
          onChange={communicationsOnChange}
          onFocus={communicationsFocusOn}
          onBlur={communicationsFocusOut}
          maxLength={limit}
          sx={{
            '& .W-Textarea': {
              height: '114px !important',
              overflowY: 'hidden !important',
            },
          }}
        />

        <Stack gap="3px">
          <WatingRoomButton
            variant="outlined"
            endIcon={<CheckIcon />}
            disabled={disable}
            fullWidth
            onClick={onDebounceCommunication.run}
          >
            전달 사항 등록
          </WatingRoomButton>
          <Box height="16px">
            {helper ? (
              <Typography
                variant="caption"
                lineHeight={'1'}
                color={error.boo ? 'red' : '#4ac6ff'}
              >
                {error.boo
                  ? error.msg
                  : '환자에게 전달한 진료 내용을 작성해 주세요.'}
              </Typography>
            ) : (
              ''
            )}
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default WaitingRoomPatientMessage;

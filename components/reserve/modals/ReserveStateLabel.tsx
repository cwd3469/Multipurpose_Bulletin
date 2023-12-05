import Image from 'next/image';
import { Box, Chip, Stack } from '@mui/material';
type Color = {
  bgColor: string;
  fontColor: string;
  name: string;
  icon: JSX.Element;
};
type ReserveStateLabelPros = { state: string; className?: string };

/**ReserveStateLabel 예약 상태 라벨 */
const ReserveStateLabel = (props: ReserveStateLabelPros) => {
  const { state, className } = props;
  /**ReserveStateLabel 예약 상태 라벨 정보 */
  const stateColorObj: { [key: string]: Color } = {
    RESERVED_ACCEPT: {
      bgColor: '#fdf8e8',
      fontColor: '#edc63d',
      icon: <Image src={'/assets/icons/ic_waiting.svg'} alt="수락 아이콘" layout="fill" />,
      name: '예약 수락',
    },
    RESERVED: {
      bgColor: '#effcf4',
      fontColor: '#4d9e65',
      icon: <Image src={'/assets/icons/ic_accepted.svg'} alt="수락 아이콘" layout="fill" />,
      name: '예약 대기',
    },
    RESERVED_REFUSE: {
      bgColor: '#fff3f4',
      fontColor: '#ed271e',
      icon: <Image src={'/assets/icons/ic_rejected.svg'} alt="수락 아이콘" layout="fill" />,
      name: '예약 거절',
    },
    RESERVED_CANCEL: {
      bgColor: '#f8f8f8',
      fontColor: '#999999',
      icon: <Image src={'/assets/icons/ic_back.svg'} alt="수락 아이콘" layout="fill" />,
      name: '예약 취소',
    },
  };
  const keyValue = state === 'REFUSE' ? 'RESERVED_REFUSE' : state;
  const stateColor = stateColorObj[keyValue];

  if (!stateColor) return <>-</>;
  return (
    <Chip
      className={className}
      sx={{
        '&.MuiChip-root': {
          height: '36px',
          borderRadius: '30px',
          backgroundColor: stateColor.bgColor,
          color: stateColor.fontColor,
        },
        '& .MuiChip-label': {
          paddingLeft: '4px',
          fontSize: '14px',
        },
        '&.Reserve-check': {
          backgroundColor: 'transparent',
          fontWeight: '500',
          gap: '8px',
          '& .Image-box': {
            width: '17px',
            height: '20px',
          },
          '& .MuiChip-label': {
            fontSize: '16px',
            paddingLeft: '0px',
          },
        },
      }}
      label={stateColor.name}
      avatar={
        <Stack alignItems="center" justifyContent="center">
          <Box className="Image-box" sx={{ position: 'relative', width: '12px', height: '12px' }}>
            {stateColor.icon}
          </Box>
        </Stack>
      }
    />
  );
};

export default ReserveStateLabel;

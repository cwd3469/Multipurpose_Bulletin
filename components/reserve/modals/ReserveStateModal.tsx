import WAlertModal from '@components/common/modal/WAlertModal';
import { Stack, Typography } from '@mui/material';
import { ModalType } from 'types/signin';
import Image from 'next/image';

type ReserveStateModalProp = ModalType & {
  name: string;
};
type Info = {
  title: string;
  image: string;
  contants: string;
};

const infoList: { [key: string]: Info | undefined } = {
  cancelled: {
    title: '진료 접수 취소',
    image: '/assets/icons/processStatusClose.svg',
    contants: '해당 비대면 진료 접수 건은\n 이미 취소되어 접수를 수락할 수 없습니다.',
  },
  success: {
    title: '예약 접수 완료',
    image: '/assets/icons/processStatusCheck.svg',
    contants: '비대면 예약 접수가\n 수락되었습니다.',
  },
  failed: {
    title: '예약 접수 실패',
    image: '/assets/icons/processStatusClose.svg',
    contants: '환자 등록번호 등록에 실패하였습니다.\n 잠시 후, 다시 시도해 주세요.',
  },
};
/**ReserveStateModal 예약 상태 정보 모달 */
const ReserveStateModal = (props: ReserveStateModalProp) => {
  const { open, handleClose, name } = props;
  const info = infoList[name];
  if (info) {
    return (
      <WAlertModal open={open} handleClose={handleClose} title={info.title} activeOn>
        <Stack width="28.125em" minHeight="15.313em" gap="1.500em">
          <Image src={info.image} alt="환자 취소 아이콘" width={55} height={55} />
          <Stack alignItems="center">
            {info.contants.split('\n').map((item, index) => {
              return (
                <Typography variant="h5" fontWeight="400" color="#666" key={index}>
                  {item}
                </Typography>
              );
            })}
          </Stack>
        </Stack>
      </WAlertModal>
    );
  }
  return <></>;
};

export default ReserveStateModal;

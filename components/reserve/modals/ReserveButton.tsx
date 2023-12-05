import Image from 'next/image';
import useReserveModal from '../hooks/useReserveModal';
import { ReserveTableType } from '../type';
import { GridButton } from '@components/common/table/WDataTable';

import { Box } from '@mui/material';
type ButtonInfoList = {
  title: string;
  icon?: JSX.Element;
};

/**ReserveDetailButton 예약 목록 페이지 버튼 */
const ReserveDetailButton = (props: {
  state: string;
  reserveInfo: ReserveTableType;
  name: string;
}) => {
  const { reserveInfo, name, state } = props;
  /**ReserveDetailButton 예약 목록 페이지 버튼 use hook */
  const { setInInformation } = useReserveModal();
  /**ReserveDetailButton 예약 목록 모달 open 기능 */
  const onOpenModal = () => setInInformation && setInInformation(reserveInfo, name);
  const reNaming = name.split('-').slice(-1)[0];
  /**ReserveDetailButton 버튼 정보 */
  const infoList: { [key: string]: ButtonInfoList } = {
    reseveContents: {
      title: '접수 내용 보기',
    },
    reseveAccept: {
      title: '예약 수락',
      icon: <Image src={'/assets/icons/ic_accept_circle.svg'} width={25} height={25} alt="icon" />,
    },
    reseveModify: {
      title: '예약 변경',
      icon: <Image src={'/assets/icons/ic__change.svg'} width={25} height={25} alt="icon" />,
    },
    reseveRefusal: {
      title: '예약 거절',
      icon: <Image src={'/assets/icons/ic_reject_circle.svg'} width={25} height={25} alt="icon" />,
    },
  };

  if (state === 'RESERVED' || state === 'RESERVED_ACCEPT')
    return (
      <GridButton
        onClick={onOpenModal}
        startIcon={
          infoList[reNaming].icon && (
            <Box width="25px" height="25px">
              {infoList[reNaming].icon}
            </Box>
          )
        }
        style={{
          height: '36px',
          borderRadius: '7.5px',
          '&.MuiButtonBase-root.Icon-style': {
            '& .MuiTypography-root': {
              fontSize: '14px',
            },
          },
        }}
      >
        {infoList[reNaming].title}
      </GridButton>
    );

  return <></>;
};

export default ReserveDetailButton;

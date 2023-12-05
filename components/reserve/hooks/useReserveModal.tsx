/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, useCallback, useContext, useState } from 'react';
import { ReserveTableType } from '../type';
import ReserveDetail from '../modules/ReserveDetail';
import ReserveAcceptModal from '../modals/ReserveAcceptModal';
import ReserveModifyModal from '../modals/ReserveModifyModal';
import ReserveRefusalModal from '../modals/ReserveRefusalModal';
import useInModalAlert, { InModalAlertProvider } from '@hooks/utils/modal/useInModalAlert';
interface ReserveModalProviderProps {
  children: JSX.Element | JSX.Element[];
}
interface ReserveModalContextProps {
  info?: ReserveTableType;
  setInInformation?: (i: ReserveTableType, name: string) => void;
  deleteInInformation?: () => void;
  modalName?: string;
}

/**ReserveTableModal 예약 목록 모달 */
const ReserveTableModal = (props: ReserveModalContextProps) => {
  const { modalName, info, deleteInInformation } = props;
  const { onDeleteModalToast } = useInModalAlert();

  if (!deleteInInformation || !modalName || !info) return <></>;

  const modalProps = (modalCase: string) => {
    return {
      ulid: info.registrationUlid,
      open: modalName === modalCase ? true : false,
      handleClose: () => {
        onDeleteModalToast && onDeleteModalToast();
        deleteInInformation();
      },
      name: modalCase,
    };
  };

  const modalInfo = modalProps(modalName);

  switch (modalName) {
    case 'reseveContents':
      return <ReserveDetail {...modalInfo} />;
    case 'reseveAccept':
      return <ReserveAcceptModal {...modalInfo} />;
    case 'reseveModify':
      return <ReserveModifyModal {...modalInfo} />;
    case 'reseveRefusal':
      return <ReserveRefusalModal {...modalInfo} />;
    default:
      return <></>;
  }
};
/**ReserveModalContext 예약관리 모달 context api */
const ReserveModalContext = createContext<ReserveModalContextProps>({});

/**ReserveModalContext 예약관리 모달 Provider */
export const ReserveModalProvider = ({ children }: ReserveModalProviderProps): JSX.Element => {
  const [modalName, setModalName] = useState<string>();
  const [info, setInfo] = useState<ReserveTableType>();
  /**ReserveModalContext 예약 정보 및 모달 업데이트 기능  */
  const setInInformation = useCallback((i: ReserveTableType, name: string) => {
    setInfo(i);
    setModalName(name);
  }, []);
  /**ReserveModalContext 예약 정보 및 모달 삭제 기능 */
  const deleteInInformation = useCallback(() => {
    setInfo(undefined);
    setModalName(undefined);
  }, []);

  const value = { info, setInInformation, deleteInInformation, modalName };

  return (
    <ReserveModalContext.Provider value={value}>
      {children}
      <InModalAlertProvider name={modalName}>
        <ReserveTableModal {...value} />
      </InModalAlertProvider>
    </ReserveModalContext.Provider>
  );
};
/**ReserveModalContext 예약관리 모달 custom hook */
const useReserveModal = () => {
  const info = useContext(ReserveModalContext);
  return info;
};

export default useReserveModal;

import { ModalType } from 'types/signin';
import useMutateReceptionState from '../hooks/useMutateReceptionState';
import GnbTreatStateView from '@components/common/layout/gnb/modal/GnbTreatStateView';

interface SetAllReceptionState extends ModalType {
  state: boolean;
}

const SupportSetAllReceptionState = (props: SetAllReceptionState) => {
  const { onClickReceptionStateAllStart, onClickReceptionStateAllClose } =
    useMutateReceptionState({
      hospitalIsDone: props.state,
      reset: props.handleClose,
    });

  return (
    <GnbTreatStateView
      open={props.open}
      status={props.state}
      nameKo={''}
      setting={false}
      handleClose={props.handleClose}
      onClickExtensionOpen={onClickReceptionStateAllStart}
      onClickExtensionClose={onClickReceptionStateAllClose}
      title={props.state ? '전체 접수 마감' : '전체 접수 시작'}
      contentsText={
        props.state ? (
          <>
            조회된 모든 의사의 접수를 <span className="bold">마감</span>
            하시겠습니까?
          </>
        ) : (
          <>
            조회된 모든 의사의 접수를 <span className="bold">시작</span>
            하시겠습니까?
          </>
        )
      }
      setRouter={''}
    />
  );
};
export default SupportSetAllReceptionState;

import WDetailModal, {
  DocumentsType,
  WDetailModalTypeQueue,
} from '@components/common/modal/WDetailModal';
import WErrorPage from '@components/common/modal/WErrorPage';
import { useTelemedicineTreatQueueDetail } from '@hooks/api/hospitalDoctor/doctorQueue';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useRouter } from 'next/router';

const WatingRoomTreatmentDetail = (props: {
  ulid: string;
  open: boolean;
  handleClose: () => void;
}) => {
  const msg = useCodeMsgBundle();
  const router = useRouter();
  const { data: detailData, isError } = useTelemedicineTreatQueueDetail(
    props.ulid,
  );

  if (isError) {
    return (
      <WErrorPage
        isError={isError}
        errMsg={`진료 접수 상세 내용을 가져오는데 실패 하였습니다. \n 잠시후 다시 시도 해 주세요.`}
        mode="modal"
      />
    );
  }

  if (detailData) {
    if (detailData.data.code !== '0000') {
      return (
        <WErrorPage
          isError={true}
          errMsg={msg.errMsg(detailData.data.code)}
          mode="modal"
          back={() => {
            router.push('/doctor/telemedicine/reception', undefined, {
              shallow: true,
            });
            props.handleClose();
          }}
        />
      );
    } else {
      const res: WDetailModalTypeQueue = detailData.data.data;
      const symptom: string = res.symptom ? res.symptom : '-';
      const imgList: DocumentsType[] = res.symptomImages;
      const addDoc = res.documents;

      return (
        <WDetailModal
          {...props}
          symptom={symptom}
          imgList={imgList}
          addDoc={addDoc}
        />
      );
    }
  }
  return <></>;
};
export default WatingRoomTreatmentDetail;

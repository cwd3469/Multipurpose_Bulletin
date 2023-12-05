import WDetailModal, {
  DocumentsType,
  WDepartmentHistoryTalking,
  WDetailModalTypeQueue,
} from '@components/common/modal/WDetailModal';
import WErrorPage from '@components/common/modal/WErrorPage';
import { useTelemedicineTreatQueueDetail } from '@hooks/api/hospitalDoctor/doctorQueue';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import { useToastContext } from '@hooks/useToastContext';
import { useRouter } from 'next/router';
import { ModalType } from 'types/signin';
interface QueueDetailModalType extends ModalType {
  ulid: string;
}

const QueueDetail = (props: QueueDetailModalType) => {
  const toast = useToastContext();
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
        back={() => {
          props.handleClose();
        }}
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
            props.handleClose();
          }}
        />
      );
    } else {
      const res: WDetailModalTypeQueue = detailData.data.data;
      const symptom: string = res.symptom ? res.symptom : '-';
      const imgList: DocumentsType[] = res.symptomImages;
      const closedAt: string | undefined = res.closedAt;
      const medicalHistoryTalk: WDepartmentHistoryTalking[] =
        res.medicalHistoryTalk;
      const patientMessage: string | undefined = res.patientMessage;
      const addDoc = res.documents;
      return (
        <WDetailModal
          {...props}
          symptom={symptom}
          imgList={imgList}
          closedAt={closedAt}
          medicalHistoryTalk={medicalHistoryTalk}
          patientMessage={patientMessage}
          addDoc={addDoc}
        />
      );
    }
  }
  return <></>;
};

export default QueueDetail;

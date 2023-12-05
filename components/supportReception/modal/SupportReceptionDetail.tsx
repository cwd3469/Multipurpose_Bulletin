import { ModalType } from 'types/signin';
import WDetailModal, {
  DocumentsType,
  WDetailModalTypeQueue,
  WSupportDetailModalType,
} from '@components/common/modal/WDetailModal';
import { useSupportReceptionDetail } from '@hooks/api/hospitalSupport/supportReception';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import WErrorPage from '@components/common/modal/WErrorPage';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

interface ReceptionDetailModalType extends ModalType {
  ulid: string;
}

const SupportReceptionDetail = (props: ReceptionDetailModalType) => {
  const msg = useCodeMsgBundle();
  const router = useRouter();
  const now = dayjs().format('YYYY-MM-DD');
  const { data: detailData, isError } = useSupportReceptionDetail(props.ulid);

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
            router.replace('/medical-support/telemedicine/reception');
            props.handleClose();
          }}
        />
      );
    } else {
      const res: WSupportDetailModalType = detailData.data.data;
      const symptom: string = res.patientSymptomMessage
        ? res.patientSymptomMessage
        : '-';
      const imgList: DocumentsType[] = res.symptomImages;
      const addDoc = res.additionalDocuments;

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

export default SupportReceptionDetail;

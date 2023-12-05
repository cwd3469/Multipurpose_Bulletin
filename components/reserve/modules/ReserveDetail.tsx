import { ModalType } from 'types/signin';
import WDetailModal, {
  DocumentsType,
  WDetailModalTypeQueue,
} from '@components/common/modal/WDetailModal';
import useCodeMsgBundle from '@hooks/api/useCodeMsgBundle';
import WErrorPage from '@components/common/modal/WErrorPage';
import { useRouter } from 'next/router';
import { useDoctorReceptionDetail } from '@hooks/api/hospitalDoctor/doctorReception';
import useAuth from '@hooks/useAuth';

interface ReserveDetailModalType extends ModalType {
  ulid?: string;
}

/**ReserveErrorPage 에러 모달 */
const ReserveErrorPage = (props: { code?: string; handleClose?: () => void }) => {
  const { code, handleClose } = props;
  const msg = useCodeMsgBundle();
  return (
    <WErrorPage
      isError={true}
      errMsg={
        code
          ? msg.errMsg(code)
          : `진료 접수 상세 내용을 가져오는데 실패 하였습니다. \n 잠시후 다시 시도 해 주세요.`
      }
      mode="modal"
      back={code ? () => handleClose && handleClose() : undefined}
    />
  );
};

/**ReserveDetail 사용자 정보 모달 */
const ReserveDetail = (props: ReserveDetailModalType) => {
  const { ulid } = props;
  const { data: detailData, isError } = useDoctorReceptionDetail(ulid ? ulid : '');

  if (isError || (detailData && detailData.data.code !== '0000')) {
    return (
      <ReserveErrorPage code={detailData && detailData.data.code} handleClose={props.handleClose} />
    );
  }

  if (detailData && detailData.data.code === '0000') {
    const res: WDetailModalTypeQueue = detailData.data.data;
    const symptom: string = res.symptom ? res.symptom : '-';
    const imgList: DocumentsType[] = res.symptomImages;
    const addDoc = res.documents;

    return <WDetailModal {...props} symptom={symptom} imgList={imgList} addDoc={addDoc} />;
  }

  return <></>;
};

export default ReserveDetail;

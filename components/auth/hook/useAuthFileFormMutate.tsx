import { blobToFile } from '@utils/file';
import { UidList } from '@components/common/fileUpload/types';
import {
  useAuthFileUpload,
  useSignupInfoMutation,
} from '@hooks/api/user/signup';

const useAuthFileFormMutate = () => {
  const { mutate: postFileUploadMutate } = useAuthFileUpload();
  const authFileFormMutate = (
    setFileUlid: (ulid: string, img: File) => void,
    file: File[],
    UidList?: UidList[],
  ) => {
    const imgName = UidList ? UidList[0].id : '';
    const img = blobToFile(file[0], imgName);
    const formData = new FormData();
    formData.append('file', img);
    postFileUploadMutate(formData, {
      onSuccess: (data) => {
        const { fileUlid } = data.data.data;
        setFileUlid(fileUlid, img as File);
      },
    });
  };

  return { authFileFormMutate };
};

export default useAuthFileFormMutate;

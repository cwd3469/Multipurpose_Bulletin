import { useCallback } from 'react';
import { useToastContext } from '@hooks/useToastContext';
import { useDeleteNonReimbursement } from '@hooks/api/hospitalDoctor/nonReimbursement';
import { NonReimburseModifyType } from '../type';
import { useRouter } from 'next/router';
import { useDebounceFn } from 'ahooks';
import NonReimburseDeleteView from '../views/NonReimburseDeleteView';

const NonReimburseDelete = (props: NonReimburseModifyType) => {
  const { handleClose, open, id } = props;
  const router = useRouter();
  const { mutate: deleteNonReimbursement } = useDeleteNonReimbursement(
    router.query,
  );

  const toast = useToastContext();

  const onDeleteClickModal = useCallback(() => {
    deleteNonReimbursement(id, {
      onSuccess(data, variables, context) {
        handleClose();
      },
      onError(error) {
        toast?.on(
          '국내 비급여 항목 삭제에 실패하였습니다. \n 잠시 후, 다시 시도해 주세요',
          'error',
        );
      },
    });
  }, [deleteNonReimbursement, handleClose, id, toast]);

  const onDebounceFnModal = useDebounceFn(onDeleteClickModal, {
    wait: 300,
  });

  return (
    <NonReimburseDeleteView
      open={open}
      handleClose={handleClose}
      onDebounceFnModal={onDebounceFnModal.run}
    />
  );
};
export default NonReimburseDelete;

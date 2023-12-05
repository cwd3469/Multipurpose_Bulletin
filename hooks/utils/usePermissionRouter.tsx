import { useRouter } from 'next/router';

const usePermissionRouter = () => {
  const router = useRouter();
  const mainRouter = (
    permission: 'HOSPITAL_DOCTOR' | 'MEDICAL_SUPPORT' | 'HOSPITAL_ADMIN',
  ) => {
    switch (permission) {
      case 'HOSPITAL_DOCTOR':
        router.replace(`/doctor/telemedicine/queueing`, undefined, {
          shallow: true,
        });
        return;
      case 'MEDICAL_SUPPORT':
        router.replace(`/medical-support/telemedicine/reception`, undefined, {
          shallow: true,
        });
        return;
      case 'HOSPITAL_ADMIN':
        router.replace('/hospital-admin/hospital-set', undefined, {
          shallow: true,
        });
        return;
    }
  };
  return { mainRouter };
};
export default usePermissionRouter;

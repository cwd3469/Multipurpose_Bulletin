import instance from '@hooks/api/instance';
import { getCookie } from 'cookies-next';

/**진료 가능 증상의 코드와 한글명 Set으로 된 목록을 조회합니다. */
export const apiGetTreatmentSymptom = () => {
  return instance({
    method: 'get',
    url: `/hospital/api/v1/code/treatment-symptom`,
  });
};
/**진료 가능 증상의 코드와 한글명 Set으로 된 목록을 조회합니다. */
export const apiGetDepartment = () => {
  return instance({
    method: 'get',
    url: `/hospital/api/v1/code/department`,
  });
};
/**진료 가능 증상의 코드와 한글명 Set으로 된 목록을 조회합니다. */
export const apiGetDepartmentCode = (departmentCode: string) => {
  return instance({
    method: 'get',
    url: `/hospital/api/v1/code/department/${departmentCode}`,
  });
};

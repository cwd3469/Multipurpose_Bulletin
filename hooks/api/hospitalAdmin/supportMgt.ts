import {
  MedicalSupportInfoDto,
  MedicalSupportInfoModify,
} from '@components/medicalSupportInfo/type';
import instance from '@hooks/api/instance';
import { transQueryDate, transQueryUrl } from '@utils/transtext';
import { getCookie } from 'cookies-next';
import { ParsedUrlQuery } from 'querystring';
import { DataPagition, FilterDateType } from 'types/table';

/**진료 지원 리스트 조회 */
export const apiMedicalSupportList = (queryKey: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/hospital/api/v1/profile/medical-support?size=10${queryKey}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**진료 지원 등록 */
export const apiPostProfileMedicalSupport = (parms: MedicalSupportInfoDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'post',
    url: `/hospital/api/v1/profile/medical-support`,
    data: parms,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**진료 지원 상세 조회 */
export const apiMedicalSupportDetail = (parms: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'get',
    url: `/hospital/api/v1/profile/medical-support/${parms}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**진료 지원 상세 수정 */
export const apiModifyMedicalSupport = (parms: {
  info: MedicalSupportInfoModify;
  ulid: string;
}) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'put',
    url: `/hospital/api/v1/profile/medical-support/${parms.ulid}`,
    data: parms.info,
    headers: {
      Authorization: accessToken,
    },
  });
};

/**진료 지원 상세 삭제 */
export const apiDeteteMedicalSupport = (parms: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  return instance({
    method: 'delete',
    url: `/hospital/api/v1/profile/medical-support/${parms}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const SUPPORTLIST = (filter?: ParsedUrlQuery) => [
  'SUPPORT',
  'LIST',
  filter,
];
export const SUPPORTDETAIL = (ulid?: string) => ['SUPPORT', 'DETAIL', ulid];

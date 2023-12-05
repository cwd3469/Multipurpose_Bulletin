import { getCookie } from 'cookies-next';
import instance from '../instance';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { SUPPORT_RESERVE_LIST } from './queryKey';
import { useToastContext } from '@hooks/useToastContext';
import useCodeMsgBundle from '../useCodeMsgBundle';
import { useCallback, useContext, useState } from 'react';
import { ReceptionAcceptPostDto } from '@components/reception/type';
import { useRouter } from 'next/router';
import { transQueryDateToString, transQueryUrlFilter } from '@utils/transtext';
import { ReserveContext } from '@components/reserve/contexts/ReserveContext';
import useCodeWarningEffect from '@hooks/utils/useCodeWarningEffect';
import dayjs from 'dayjs';
import { ModifyReserveDto } from '@components/reserve/type';
import useInModalAlert from '@hooks/utils/modal/useInModalAlert';
import { RESERVE_LIST } from '../hospitalDoctor/queryKey';
import jwtDecode from 'jwt-decode';
import { UserInfoInterface } from 'types/signin';

/**진료지원 진료 내역
 * GET API
 */
export const apSupportReserveList = (queryString: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const userInfo: UserInfoInterface = jwtDecode(accessToken);

  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/support/reservation/clinic?size=10${queryString}&doctorAccountUlid=${userInfo.ulid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

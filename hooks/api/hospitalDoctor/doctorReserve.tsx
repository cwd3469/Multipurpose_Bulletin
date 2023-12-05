import { getCookie } from 'cookies-next';
import instance from '../instance';
import { ReceptionAcceptPostDto } from '@components/reception/type';
import { UserInfoInterface } from 'types/signin';
import jwtDecode from 'jwt-decode';

/**진료 예약 내역
 * GET API
 */
export const apiDoctorReserveList = (queryString: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const userInfo: UserInfoInterface = jwtDecode(accessToken);
  return instance({
    method: 'get',
    url: `/telemedicine/api/v1/reservation/clinic?size=10${queryString}&doctorAccountUlid=${userInfo.ulid}`,
    headers: {
      Authorization: accessToken,
    },
  });
};
/** 진료 예약 접수 수락
 * PUT API */
export const apiPutDoctorReserveAccept = (ulid: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  return instance({
    method: 'put',
    url: `/telemedicine/api/v1/reservation/clinic/${ulid}/status/accept`,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 진료 예약 환자번호등록
 * PUT API */
export const apiPutReservePatientRegistionNum = (parms: ReceptionAcceptPostDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const data = { patientRegistrationNum: parms.patientRegisterNumber };
  return instance({
    method: 'put',
    url: `/telemedicine/api/v1/telemedicine-registration/patient-registration-number/${parms.ulid}`,
    data: data,
    headers: {
      Authorization: accessToken,
    },
  });
};

/** 진료 예약 환자번호등록
 * PUT API */
export const apiPutReserveRefusal = (parms: { registrationUlid: string; refuseReason: string }) => {
  const { registrationUlid, refuseReason } = parms;
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const data = { refuseReason };
  return instance({
    method: 'put',
    url: `/telemedicine/api/v1/reservation/clinic/${registrationUlid}/status/refuse`,
    data: data,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const apiDoctorReserveModify = (parms: {
  data: {
    editReason: string;
    editDate: string;
  };
  reservationUlid: string;
}) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  const { data } = parms;
  return instance({
    method: 'put',
    url: `/telemedicine/api/v1/reservation/clinic/${parms.reservationUlid}/status/edit`,
    data: data,
    headers: {
      Authorization: accessToken,
    },
  });
};

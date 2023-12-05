import { getCookie } from 'cookies-next';
import instance from '../instance';
import { useQuery } from 'react-query';
import {
  ScheduleDeleteDto,
  SchedulePostDto,
  ScheduleUpdateDto,
} from '@components/schedule/hooks/useScheduleDto';
import { useContext, useEffect } from 'react';
import { Dayjs } from 'dayjs';
import { UserInfoInterface } from 'types/signin';
import jwtDecode from 'jwt-decode';
import { ScheduleSelectMonthContext } from '@components/schedule/contexts/ScheduleSelectMonth';
import { DateRange } from '@mui/x-date-pickers-pro';
import { ScheduleReserveeDto } from '@components/schedule/hooks/useServerReserveEffect';
import { useRouter } from 'next/router';

export const ScheduleListKey = (
  monthRangeDate: DateRange<string | number | Date | Dayjs | null | undefined>,
) => {
  const dayJsArr = monthRangeDate.map((item) => {
    const date = item as Dayjs;
    return date.format('YYYY-MM-DD');
  });
  const query = `startDate=${dayJsArr[0]}&endDate=${dayJsArr[1]}`;
  return ['doctor', 'schedule', 'list', query];
};

export const apiScheduleList = (query: string) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';
  //TODO:api url 변경 점
  return instance({
    method: 'get',
    url: `/hospital/api/v1/doctor/schedule${query}`,
    headers: {
      Authorization: accessToken,
    },
  });
};

export const apiSchedulePost = (data: SchedulePostDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'post',
    url: `/hospital/api/v1/doctor/schedule`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  });
};

export const apiScheduleUpdate = (data: ScheduleUpdateDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'put',
    url: `/hospital/api/v1/doctor/schedule`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  });
};

export const apiScheduleDelete = (data: ScheduleDeleteDto) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'delete',
    url: `/hospital/api/v1/doctor/schedule`,
    headers: {
      Authorization: accessToken,
    },
    data: data,
  });
};

export const apiScheduleReservePost = (params: { data: ScheduleReserveeDto; query: string }) => {
  const token = getCookie('accessToken');
  const accessToken = typeof token === 'string' ? token : '';

  //TODO:api url 변경 점
  return instance({
    method: 'post',
    url: `/telemedicine/api/v1/telemedicine-registration/reservation${params.query}`,
    headers: {
      Authorization: accessToken,
    },
    data: params.data,
  });
};

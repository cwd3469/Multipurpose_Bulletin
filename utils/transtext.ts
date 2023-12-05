import { DateRange } from '@mui/x-date-pickers-pro';
import dayjs from 'dayjs';
import { ParsedUrlQuery } from 'querystring';
import { FilterAllOtions, FilterAllSupportOtions, FilterDateType } from 'types/table';

export const sideDot = (txt: string, spe: string) => {
  const center = txt.substring(4);
  const dot = `${spe}${spe}${spe}${spe}${center}`;
  return dot;
};

export const paymentStatusText = (status: string) => {
  switch (status) {
    case 'SUCCESS':
      return '결제완료';
    case 'FAIL':
      return '결제실패';
    case 'CANCEL':
      return '결제취소';
    default:
      return '';
  }
};

export const genderToCode = (gender: string) => {
  switch (gender) {
    case '남성':
      return '1';
    case '여성':
      return '2';
    default:
      return '-';
  }
};

export const codeToGender = (gender: number) => {
  switch (gender) {
    case 1:
      return '남성';
    case 2:
      return '여성';
    default:
      return '-';
  }
};

export const transTextStateTreat = (state: string) => {
  switch (state) {
    case 'HOLD':
      return '진료 보류';
    case 'WAIT':
      return '진료 대기';
    case 'CLOSE':
      return '진료 종료';
    case 'CANCEL':
      return '진료 취소';
    default:
      return '진료 중';
  }
};

export const transTextStateReception = (state: string) => {
  switch (state) {
    case 'ACCEPT':
      return '접수 수락';
    case 'REFUSE':
      return '접수 거절';
    case 'CANCEL':
      return '접수 취소';
    default:
      return '접수 대기';
  }
};

export const transTextAccountState = (state: boolean | any) => {
  switch (state) {
    case true:
      return '활성';
    case false:
      return '비활성';
    default:
      return '-';
  }
};

export const transQueryUrl = (filter: FilterAllOtions) => {
  const page = filter.page ? `&page=${filter.page - 1}` : '&page=0';
  const code = filter.code === '0' ? '' : `&code=${filter.code}`;
  const nameKo = filter.nameKo ? `&nameKo=${filter.nameKo}` : '';
  const keyword = filter.keyword ? `&keyword=${filter.keyword as string}` : '';
  const location = filter.location
    ? filter.location !== 'DEFULT'
      ? `&location=${filter.location}`
      : ''
    : '';
  const doctorName = filter.location
    ? filter.doctorName !== 'DEFULT'
      ? `&doctorName=${filter.doctorName}`
      : ''
    : '';
  const status = filter.status
    ? filter.status !== 'DEFULT'
      ? `&status=${filter.status}`
      : ''
    : '';
  const enterType = filter.enterType
    ? filter.enterType !== 'DEFULT'
      ? `&enterType=${filter.enterType}`
      : ''
    : '';
  const isDone = filter.isDone
    ? filter.isDone === 'DEFULT'
      ? ''
      : `&isDone=${filter.isDone === 'true' ? true : filter.isDone === 'false' ? false : ''}`
    : '';
  return `${page}${code}${nameKo}${location}${isDone}${status}${enterType}${doctorName}${keyword}`;
};

export const transQueryString = (filter: ParsedUrlQuery, date?: boolean, history?: boolean) => {
  const start = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
  const now = dayjs().format('YYYY-MM-DD');
  const page = filter.page ? `&page=${filter.page as string}` : '&page=0';
  const code = filter.code ? `&code=${filter.code as string}` : '';
  const nameKo = filter.nameKo ? `&nameKo=${filter.nameKo as string}` : '';
  const keyword = filter.keyword ? `&keyword=${filter.keyword as string}` : '';
  const location = filter.location
    ? filter.location !== 'DEFULT'
      ? `&location=${filter.location as string}`
      : ''
    : '';
  const doctorName = filter.location
    ? filter.doctorName !== 'DEFULT'
      ? `&doctorName=${filter.doctorName as string}`
      : ''
    : '';
  const status = filter.status
    ? filter.status !== 'DEFULT'
      ? `&status=${filter.status as string}`
      : ''
    : '';
  const enterType = filter.enterType
    ? filter.enterType !== 'DEFULT'
      ? `&enterType=${filter.enterType as string}`
      : ''
    : '';
  const isDone = filter.isDone
    ? filter.isDone === 'DEFULT'
      ? ''
      : `&isDone=${filter.isDone === 'true' ? true : filter.isDone === 'false' ? false : ''}`
    : '';
  const startDate = date
    ? filter.startDate
      ? `&startDate=${filter.startDate}`
      : `&startDate=${history ? start : now}`
    : '';
  const endDate = date ? (filter.endDate ? `&endDate=${filter.endDate}` : `&endDate=${now}`) : '';
  return `${page}${nameKo}${location}${isDone}${status}${enterType}${doctorName}${startDate}${endDate}${keyword}${code}`;
};

export const transQueryDate = (filter: FilterDateType) => {
  const startDate = filter.startDate ? `&startDate=${filter.startDate}` : '';
  const endDate = filter.endDate ? `&endDate=${filter.endDate}` : '';

  return `${startDate}${endDate}`;
};

export function findWord(word: string, str: string) {
  return RegExp('\\b' + word + '\\b').test(str);
}

export const jsonStringToArrey = (jsonString: string) => {
  const obj = JSON.parse(jsonString);
  const arr = [];
  for (const prop in obj) {
    arr.push({ key: prop, value: obj[prop] });
  }
  return arr;
};

const queryToFilter = (
  key: string,
  q: FilterAllSupportOtions | FilterAllOtions | ParsedUrlQuery,
  f?: FilterAllOtions | FilterAllSupportOtions,
) => {
  const queryKey = q[key]
    ? `&${key}=${q[key]}`
    : f
    ? f[key]
      ? `&${key}=${f[key]}`
      : key === 'page'
      ? '&page=0'
      : ''
    : '';
  return queryKey;
};

export const transQueryUrlFilter = (
  query: FilterAllSupportOtions | FilterAllOtions | ParsedUrlQuery,
  filter?: FilterAllOtions | FilterAllSupportOtions,
) => {
  const page = queryToFilter('page', query, filter);
  const doctorNameKo = queryToFilter('doctorNameKo', query, filter);
  const treatmentStatus = queryToFilter('treatmentStatus', query, filter);
  const keyword = queryToFilter('keyword', query, filter);
  const code = queryToFilter('code', query, filter);
  const nameKo = queryToFilter('nameKo', query, filter);
  const location = queryToFilter('location', query, filter);
  const enterType = queryToFilter('enterType', query, filter);
  const status = queryToFilter('status', query, filter);
  const isDone = queryToFilter('isDone', query, filter);
  const registrationStatus = queryToFilter('registrationStatus', query, filter);
  const patientNameKo = queryToFilter('patientNameKo', query, filter);
  const departmentCode = queryToFilter('departmentCode', query, filter);
  const clinicStatus = queryToFilter('clinicStatus', query, filter);
  const url =
    page +
    keyword +
    treatmentStatus +
    doctorNameKo +
    code +
    nameKo +
    location +
    enterType +
    status +
    isDone +
    registrationStatus +
    patientNameKo +
    clinicStatus +
    departmentCode;
  return `${url}`;
};
export const transQueryDateToString = (filter: ParsedUrlQuery, date: DateRange<dayjs.Dayjs>) => {
  const startDate = filter.startDate
    ? `&startDate=${filter.startDate}`
    : `&startDate=${date[0] ? date[0].format('YYYY-MM-DD') : ''}`;
  const endDate = filter.endDate
    ? `&endDate=${filter.endDate}`
    : `&endDate=${date[1] ? date[1].format('YYYY-MM-DD') : ''}`;
  const day = startDate + endDate;
  return day;
};

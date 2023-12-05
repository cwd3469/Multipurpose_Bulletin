export type SEX_TYPE = 'FEMALE' | 'MALE';
import {
  DepartmentIntro,
  MedicalDepartment,
} from '@components/baseMedicalExpenses/type';
import { isEmpty } from 'lodash';
import { forinArr } from './file';
import { removeSpecialString } from './formatNumber';

/**
 *
 * @param birthDate 19900210
 * @returns number
 */
export const valueFind = (arr: string[], value: string) => {
  return arr.findIndex((n) => n == value) > -1;
};

export const permissionOn = (arr: string[]) => {
  if (valueFind(arr, 'HOSPITAL_DOCTOR')) {
    return 'HOSPITAL_DOCTOR';
  }
  if (valueFind(arr, 'HOSPITAL_ADMIN')) {
    return 'HOSPITAL_ADMIN';
  }
  return 'MEDICAL_SUPPORT';
};

export const doCopy = (name: string) => {
  const textField = document.createElement('textarea');
  textField.innerText = name;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  textField.remove();
};

export const regExpReplaceAll = (str: string, type: string) => {
  return str.replace(`/${type}/gi`, '');
};

// object key checker
export const isKeyExists = (obj: any, key: string) => {
  return obj[key] === undefined ? false : true;
};

export const getOriginalAge = (birthDate: string): number => {
  const today = new Date();
  const birth = regExpReplaceAll(birthDate, '-');
  let age = today.getFullYear() - Number(birth.slice(0, 4));
  const mon = today.getMonth() + 1 - Number(birth.slice(4, 6));
  if (mon < 0 || (mon === 0 && today.getDate() < Number(birth.slice(6, 8)))) {
    return (age = age - 1);
  }
  return age;
};

export const getBirthDayFormat = (birthDate: string, type: string) => {
  const birthDateValue = removeSpecialString(birthDate);
  return isEmpty(birthDateValue)
    ? ''
    : birthDateValue.replace(/(\d{4})(\d{2})(\d{2})/g, `$1${type}$2${type}$3`);
};

export const getTelFormat = (tel: string, type: string) => {
  return isEmpty(tel)
    ? ''
    : tel.replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1${type}$2${type}$3`);
};

export const getJuminBirthDayChange = (jumin: string) => {
  if (isEmpty(jumin)) return '';

  const splitStr = jumin.split('-');
  const fristNum = splitStr[0];
  const lastNum = splitStr[1];
  const divisionCode = Number(lastNum.substring(0, 1));
  let dateOfBirth;
  if (
    divisionCode === 1 ||
    divisionCode === 2 ||
    divisionCode === 5 ||
    divisionCode === 6
  ) {
    // 한국인 1900~, 외국인 1900~
    dateOfBirth = `19${fristNum}`;
  } else if (
    divisionCode === 3 ||
    divisionCode === 4 ||
    divisionCode === 7 ||
    divisionCode === 8
  ) {
    // 한국인 2000~, 외국인 2000~
    dateOfBirth = `20${fristNum}`;
  } else if (divisionCode === 9 || divisionCode === 0) {
    // 한국인 1800~
    dateOfBirth = `18${fristNum}`;
  }
  return dateOfBirth;
};

export const getMemberSexTypeName = (type: SEX_TYPE) => {
  return type === 'MALE' ? '남' : '여';
};

/* =========== 브라우저의 탭에서 다른 아이디로 로그인 한 경우 체크 =========
 * instance : api(), routeManager : useEffect([pathname]) 에서 사용 중 */
let loginUserId = '';
let useMsg = false;
export const sameUserCheck = (): boolean => {
  const userStorage = localStorage.getItem('user');
  if (userStorage) {
    const users = JSON.parse(userStorage);
    if (isEmpty(loginUserId)) {
      loginUserId = users.id;
    } else {
      if (loginUserId !== users.id) {
        if (useMsg === false) {
          alert('로그인 아이디가 변경되었습니다.');
          window.location.reload();
          useMsg = true;
        }
        return false;
      }
    }
  }
  return true;
};

export const reDepartment = (obj: MedicalDepartment, arr: string[]) => {
  let re = obj;
  const deArr: DepartmentIntro[] = forinArr(obj);
  for (let i = 0; i < deArr.length; i++) {
    const item = deArr[i];
    for (let k = 0; k < arr.length; k++) {
      const element = arr[k];
      if (item.id === element) {
        re[item.enName].active = true;
      }
    }
  }
  return re;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const reActiveList = (list: any[], arr: string[]) => {
  let re = list;

  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    for (let k = 0; k < arr.length; k++) {
      const element = arr[k];
      if (item.id === element) {
        re[i].active = true;
      }
    }
  }
  return re;
};

export const reTextArr = (arr: any[]) => {
  const re = arr
    .filter((item, index) => {
      if (item.active) {
        return item.id;
      }
    })
    .map((item) => item.id);
  return re;
};

/* /. ======================================================= */

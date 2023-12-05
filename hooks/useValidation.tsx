/* eslint-disable no-useless-escape */
import { useCallback } from 'react';

import { ValidInterface } from 'types/utils';

export class Validation {
  regExpNum: RegExp;
  regExpEmail: RegExp;
  regExpMobile: RegExp;
  regExpMobileNumber: RegExp;
  regExpPhoneNumber: RegExp;
  regExpId: RegExp;
  regExpPass: RegExp;
  regPwFormChack: RegExp;
  regTempPwValid: RegExp;
  regExpNumber: RegExp;
  regExpPhone: RegExp;
  regExpImage: RegExp;
  regExpFile: RegExp;
  regExpOnlyImage: RegExp;
  regExNumberOnly: RegExp;
  regKorean: RegExp;
  regHospitalName: RegExp;
  regKoEnNumPass: RegExp;
  regNonReimbures: RegExp;
  regRefusal: RegExp;
  regHospitalCode: RegExp;
  regHospitalCodeAll: RegExp;
  regCommunications: RegExp;
  regExpExpenses: RegExp;
  regExpTwoDigit: RegExp;
  regExpBirthDate: RegExp;
  regExpBirthDateOn: RegExp;
  regExpPhoneEight: RegExp;
  regExpAuthNumberEntry: RegExp;
  regExpAuthNumberVerify: RegExp;
  //정보
  regExpAdminNameVerify: RegExp;
  regAddressDetail: RegExp;
  regBusinessNumber: RegExp;
  regExpBusinessNum: RegExp;
  regExFaxNumber: RegExp;
  regRefusalCheck: RegExp;

  constructor() {
    /**한글만 입력 받기 */
    this.regKorean = /^[ㄱ-ㅎ|가-힣]{0,5}$/;

    // 정보 담당자 이름
    this.regExpAdminNameVerify = /^[가-힣]+$/;

    /** 유저 아이디 정규식*/
    this.regExpId = /^[a-z0-9]{0,20}$/;

    /** 요양- 코드 정규식*/
    this.regHospitalCode = /^[0-9]{0,8}$/;

    /** 요양- 코드 전체 확인 정규식*/
    this.regHospitalCodeAll = /^\d{8}$/;

    /** 비밀번호 정규식 최대 16자의 영문 대소문자, 숫자, 특수문자 입력 정규식*/
    this.regExpPass = /^[a-zA-Z0-9\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]{0,16}$/;

    /** 비밀번호 정규식 전체 형식 체크*/
    this.regPwFormChack =
      /^((?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+;:'",<.>/?₩`~{}\[\]]))[0-9a-zA-Z!@#$%^&*()\-_=+;:'",<.>/?₩`~{}\[\]]{8,16}$/;

    /** 임시 비밀번호 정규식 전체 형식 체크*/
    this.regTempPwValid =
      /^((?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()\-_=+;:'",<.>/?₩`~{}\[\]]))[0-9a-zA-Z!@#$%^&*()\-_=+;:'",<.>/?₩`~{}\[\]]{8,16}$/;

    /**핸드폰 입력 확인 정규식*/
    this.regExpNum = /[^0-9]/g;

    /**핸드폰번호 전체 형식 정규식*/
    this.regExpMobile = /^(^010)(\d{3,4})(\d{4})$/;

    this.regExpMobileNumber = /^[0-9-]{0,13}$/;

    /** 이메일 체크 정규식*/
    this.regExpEmail =
      /^[0-9a-zA-Z|ㄱ-ㅎ|가-힣\s]([-_.]?[0-9a-zA-Z|ㄱ-ㅎ|가-힣\s])*@[0-9a-zA-Z|ㄱ-ㅎ|가-힣\s]([-_.]?[0-9a-zA-Z|ㄱ-ㅎ|가-힣\s])*\.[0-9a-zA-Z|ㄱ-ㅎ|가-힣\s]{2,}$/i;

    /** 일반 전화번호 정규식 */
    this.regExpPhone = /^(\d{2,4})(\d{3,4})(\d{4})$/;
    /** 일반 전화번호 정규식 */
    this.regExpPhoneEight = /^(\d{4})(\d{4})$/;

    this.regExpPhoneNumber = /^[0-9-]{0,20}$/;

    /** 진료비 입력 정규식 */
    this.regExpExpenses = /^[0-9,]{0,9}$/;

    /** 2자리 슷지 입력 정규식 */
    this.regExpTwoDigit = /^[0-9]{0,2}$/;

    /** 슷자만 확인 */
    this.regExNumberOnly = /[0-9]/;

    /**거절 사유 한글 영어 숫자 20자*/
    this.regRefusal = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s.]{0,20}$/;
    this.regRefusalCheck = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s.]{2,20}$/;
    /**한글 영어 숫자 입력 받기*/
    this.regHospitalName = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s]{0,15}$/;
    /**휴대폰 인증 코드 입력 확인 */
    this.regExpAuthNumberEntry = /^[0-9]{0,6}$/;
    this.regExpAuthNumberVerify = /[0-9]{6}\d*/;
    /** 2자리 슷지 입력 정규식 */
    this.regExpTwoDigit = /^[0-9]{0,2}$/;

    /**환자 전달 사항 입력 */
    this.regCommunications =
      /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]{0,200}$/;

    /**한글 영어 숫자 특수문자 입력 받기*/
    this.regKoEnNumPass =
      /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]{0,15}$/;

    // 비급여 항목명
    this.regNonReimbures =
      /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"\s]{0,22}$/;
    /** 숫자 정규식 */
    this.regExpNumber = /^[0-9]{0,8}$/;

    /** 이미지 파일 정규식 */
    this.regExpImage = /pdf|jpg|jpeg|png|jpeg/i;
    /** 이미지 파일 정규식 */
    this.regExpOnlyImage = /jpg|jpeg|png/i;

    /** PDF 파일만 */
    this.regExpFile = /pdf/i;
    /**생년월일 포멧 확인 */
    this.regExpBirthDate = /^(19[0-9][0-9]|20\d{2}).(0[0-9]|1[0-2]).(0[1-9]|[1-2][0-9]|3[0-1])$/;
    /**생년월일 입력 확인 */
    this.regExpBirthDateOn = /^(\d{4})(\d{2})(\d{2})$/;
    /**상세 주소 받기*/
    this.regAddressDetail = /^[a-zA-Z0-9|ㄱ-ㅎ|가-힣\s]{0,15}$/;
    this.regBusinessNumber = /^[0-9-]{0,12}$/;
    /** 사업자 등록증 정규식 */
    this.regExpBusinessNum = /^(\d{3})(\d{2})(\d{5})$/;

    /**팩스 유효성 정규식 */
    this.regExFaxNumber = /^[0-9]{0,12}$/;
  }

  /**환자 전달 사항*/
  communicationsInput(param: ValidInterface): void {
    const { txt, pass, error } = param;
    if (this.regCommunications.test(txt)) {
      pass(txt);
      error({
        msg: '',
        boo: false,
      });
    } else {
      error({
        msg: '1~500자리의 한글/영문/숫자',
        boo: true,
      });
    }
  }
  // 국내 비급여 항목 명 입력
  nonReimburseListPass(param: ValidInterface) {
    const { txt, pass, error } = param;
    if (txt.length <= 22) {
      if (this.regNonReimbures.test(txt)) {
        pass(txt);
        if (!txt) {
          error({
            msg: '비급여 항목명을 입력해 주세요.',
            boo: true,
          });
        } else {
          error({
            msg: '',
            boo: false,
          });
        }
      } else {
        error({
          msg: '비급여 항목명을 입력해 주세요.',
          boo: true,
        });
      }
    }
  }
  // 국내 제증명 항목 명 입력
  certificatePass(param: ValidInterface) {
    const { txt, pass, error } = param;
    if (txt.length <= 15) {
      if (this.regNonReimbures.test(txt)) {
        pass(txt);
        if (!txt) {
          error({
            msg: '제증명 항목명을 입력해주세요.',
            boo: true,
          });
        } else {
          error({
            msg: '',
            boo: false,
          });
        }
      } else {
        error({
          msg: '제증명 항목명을 입력해주세요.',
          boo: true,
        });
      }
    }
  }
}

const useValidation = () => {
  const validationClass = useCallback(() => {
    return new Validation();
  }, []);

  const validation = validationClass();
  return validation;
};

export default useValidation;

import { useCallback, useState, useEffect } from 'react';
import { ErrorType, ModalType } from 'types/signin';
import { HospitalInfo, HospitalInfoError, SignupInfoValue } from 'types/signup';
import { mobileFormat } from '@utils/formatNumber';
import signupInfo from '@components/auth/signup/jsons/signupInfo.json';

export interface AuthFileUlid {
  businessLicense: string;
  bankbookCopy: string;
}
interface useSignupType extends ModalType {
  mobileValue: string;
}

const useSignup = (props: useSignupType) => {
  const { open, handleClose, mobileValue } = props;
  const originData = JSON.parse(JSON.stringify(signupInfo));

  const [info, setInfo] = useState<HospitalInfo>(originData.data);
  const [modalOn, setModalOn] = useState<boolean>(false);
  const [infoErr, setInfoErr] = useState<HospitalInfoError>(originData.errs);
  const [fileUlid, setFileUlid] = useState<AuthFileUlid>(originData.fileUlid);
  const [btnDisable, setBtnDisable] = useState<boolean>(true);

  const setInFileUlid = useCallback((ulid: string, keyId: string) => {
    setFileUlid((prec) => {
      return { ...prec, [keyId]: ulid };
    });
  }, []);

  /**useSignup info updata 기능*/
  const setInInfo = useCallback((value: SignupInfoValue, keyId: string) => {
    setInfo((prec) => {
      return { ...prec, [keyId]: value };
    });
  }, []);
  /**useSignup infoErr updata 기능*/
  const setInInfoErr = useCallback((err: ErrorType, keyId: string) => {
    setInfoErr((prec) => {
      return { ...prec, [keyId + 'Err']: err };
    });
  }, []);

  /**useSignup info infoErr reset 기능*/
  const reset = useCallback(() => {
    setInfo(originData.data);
    setInfoErr(originData.errs);
    setBtnDisable(true);
  }, [originData]);

  /**useSignup 모달 off 기능*/
  const handleCloseAll = useCallback(() => {
    reset();
    handleClose();
    setModalOn(false);
  }, [handleClose, reset]);

  /**useSignup 계정 상태 알림 모달 on 기능*/
  const handleOpenModal = useCallback(() => {
    setModalOn(true);
  }, []);

  /**useSignup info post update 기능*/
  const addressOnChange = useCallback(
    (address: string, postCode: string) => {
      setInfo({
        ...info,
        ['hocAddress']: address,
        ['postCode']: postCode,
      });
    },
    [info],
  );

  /** useSignup -전화번호 '-' 추가*/
  const formChanger = mobileValue ? mobileFormat(mobileValue) : '';

  /**useSignup - 정보 입력 유효성 검사 */
  useEffect(() => {
    for (const key in info) {
      if (Object.prototype.hasOwnProperty.call(info, key)) {
        if (key !== 'addressDetail') {
          if (key !== 'mobile') {
            const element = info[key];
            if (element) {
              for (const k in infoErr) {
                if (Object.prototype.hasOwnProperty.call(infoErr, k)) {
                  if (k !== 'addressDetailErr') {
                    const el = infoErr[k];
                    if (el.boo) {
                      setBtnDisable(true);
                      return;
                    }
                    if (!el.boo) {
                      setBtnDisable(false);
                    }
                  }
                }
              }
            } else {
              setBtnDisable(true);
              return;
            }
          }
        }
      }
    }
  }, [info, infoErr, mobileValue]);

  return {
    formChanger,
    btnDisable,
    infoErr,
    modalOn,
    info,
    open,
    addressOnChange,
    handleCloseAll,
    handleOpenModal,
    setInInfoErr,
    setInInfo,
    fileUlid,
    setInFileUlid,
  };
};

export default useSignup;

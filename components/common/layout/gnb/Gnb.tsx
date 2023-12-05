import { GnbBody } from './GnbModules';
import { GnbLink } from './GnbButtons';
import { useGnb } from './useGnb';
import { useContext } from 'react';
import UserInfoContext from '../../../../hooks/contexts/UserInfoContext';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';

export const Gnb = (props: { disabled?: boolean }) => {
  const { disabled } = props;
  const router = useRouter();
  const { doctorUlid } = router.query;
  const { permission, accountInfo } = useContext(UserInfoContext);
  const { itmeMenuActive, activeChildren } = useGnb();
  const now = dayjs().format('YYYY-MM-DD');

  return (
    <GnbBody disabled={disabled}>
      {permission === 'HOSPITAL_ADMIN' ? (
        <>
          <GnbLink
            href="/hospital-admin/hospital-set"
            style={itmeMenuActive('hospital-set')}
            disabled={disabled}
          >
            -소개
          </GnbLink>
          <GnbLink
            href="/hospital-admin/non-reimburse"
            style={itmeMenuActive('non-reimburse')}
            disabled={disabled}
          >
            국내 비급여
          </GnbLink>
          {/* <GnbLink
            href="/hospital-admin/certification-mgt"
            style={itmeMenuActive('certification-mgt')}
            disabled={disabled}
          >
            국내 제증명
          </GnbLink> */}

          {/* TODO: 해외 부분 임시 HOLD  */}
          {/* <GnbItem
            sx={itmeMenuActive('base-medical-expenses')}
            disabled={disabled}
          >
            <Link href="/hospital-admin/base-medical-expenses">
              해외 기본 진료비
            </Link>
          </GnbItem> */}
          {/* <GnbItem
            sx={itmeMenuActive('add-medical-expenses')}
            disabled={disabled}
          >
            <Link href="/hospital-admin/add-medical-expenses">
              해외 추가 진료비
            </Link>
          </GnbItem> */}

          <GnbLink
            href="/hospital-admin/doctor-mgt"
            style={activeChildren('doctor-info', 'doctor-mgt', 2)}
            disabled={disabled}
          >
            의사 관리
          </GnbLink>
          <GnbLink
            href="/hospital-admin/medical-support-mgt"
            style={activeChildren('medical-support-info', 'medical-support-mgt', 2)}
            disabled={disabled}
          >
            진료 지원 관리
          </GnbLink>
          <GnbLink
            href="/hospital-admin/security-set"
            style={itmeMenuActive('security-set')}
            disabled={disabled}
          >
            보안 설정
          </GnbLink>
        </>
      ) : (
        ''
      )}
      {permission === 'MEDICAL_SUPPORT' ? (
        <>
          <GnbLink
            style={itmeMenuActive('reception')}
            disabled={disabled}
            href={`/medical-support/telemedicine/reception`}
          >
            당일 진료 접수
          </GnbLink>
          <GnbLink
            style={itmeMenuActive('queueing')}
            disabled={disabled}
            href={`/medical-support/telemedicine/queueing`}
          >
            진료 대기열
          </GnbLink>
          <GnbLink
            style={activeChildren('history-detail', 'history', 3)}
            disabled={disabled}
            href={`/medical-support/telemedicine/history`}
          >
            진료 내역
          </GnbLink>

          {/* <GnbLink
            style={itmeMenuActive('certification')}
            disabled={disabled}
            href="/medical-support/certification"
          >
            제증명 접수 관리
          </GnbLink> */}
          {accountInfo?.useEmr ? (
            ''
          ) : (
            <GnbLink
              style={itmeMenuActive('reserve')}
              disabled={disabled}
              href="/medical-support/reserve"
            >
              예약관리
            </GnbLink>
          )}
          <GnbLink
            style={
              doctorUlid
                ? activeChildren('doctor-schedule', 'treatment-set', 2)
                : activeChildren('doctor-set', 'treatment-set', 2)
            }
            disabled={disabled}
            href={`/medical-support/treatment-set`}
          >
            의사 진료 설정
          </GnbLink>
        </>
      ) : (
        ''
      )}
      {permission === 'HOSPITAL_DOCTOR' ? (
        <>
          <GnbLink
            style={itmeMenuActive('reception')}
            disabled={disabled}
            href={`/doctor/telemedicine/reception`}
          >
            당일 진료 접수
          </GnbLink>

          <GnbLink
            style={activeChildren('waiting-room', 'queueing', 3)}
            disabled={disabled}
            href={`/doctor/telemedicine/queueing`}
          >
            진료 대기열
          </GnbLink>

          <GnbLink
            style={activeChildren('history-detail', 'history', 3)}
            disabled={disabled}
            href={`/doctor/telemedicine/history`}
          >
            진료 내역
          </GnbLink>

          {/* <GnbLink
            style={itmeMenuActive('certification')}
            disabled={disabled}
            href="/doctor/certification"
          >
            제증명 접수 관리
          </GnbLink> */}

          <GnbLink style={itmeMenuActive('setting')} disabled={disabled} href="/doctor/setting">
            진료 설정
          </GnbLink>
          {accountInfo?.useEmr ? (
            ''
          ) : (
            <>
              <GnbLink style={itmeMenuActive('reserve')} disabled={disabled} href="/doctor/reserve">
                예약관리
              </GnbLink>
              <GnbLink
                style={activeChildren('schedule', 'schedule', 2)}
                disabled={disabled}
                href={`/doctor/schedule`}
              >
                스케줄 관리
              </GnbLink>
            </>
          )}
        </>
      ) : (
        ''
      )}
    </GnbBody>
  );
};

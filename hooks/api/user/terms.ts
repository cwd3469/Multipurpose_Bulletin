import instance from '../instance';

/**개인정보 처리에 관한 동의서를 조회 */
export const apiPrivacyUsageAgreement = () => {
  return instance({
    method: 'get',
    url: `hospital/api/v1/terms/privacy-usage-agreement`,
  });
};

/**파트너 개인정보 보호 의무 동의를 조회 */
export const apiPrivacyPolicy = () => {
  return instance({
    method: 'get',
    url: `hospital/api/v1/terms/privacy-policy`,
  });
};

/**파트너사 이용약관을 조회  */
export const apiPartnerAgreement = () => {
  return instance({
    method: 'get',
    url: `hospital/api/v1/terms/partner-agreement`,
  });
};

import { apiPrivacyUsageAgreement } from '@hooks/api/user/terms';
import { useEffect, useState } from 'react';

/**개인정보 처리에 관한 동의서 조회 */
const PrivacyAgree = () => {
  const [html, setHtml] = useState<string>('');
  useEffect(() => {
    apiPrivacyUsageAgreement()
      .then((data) => {
        setHtml(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default PrivacyAgree;

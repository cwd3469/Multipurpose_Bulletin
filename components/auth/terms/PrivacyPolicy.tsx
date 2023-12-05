import { apiPrivacyPolicy } from '@hooks/api/user/terms';
import { useEffect, useState } from 'react';

/**파트너 개인정보 보호 의무 동의서 조회 */
const PrivacyPolicy = () => {
  const [html, setHtml] = useState<string>('');
  useEffect(() => {
    apiPrivacyPolicy()
      .then((data) => {
        setHtml(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default PrivacyPolicy;

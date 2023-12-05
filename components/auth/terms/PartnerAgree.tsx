import { apiPartnerAgreement } from '@hooks/api/user/terms';
import { useEffect, useState } from 'react';

/**파트너사 이용약관을 조회 */
const PartnerAgree = () => {
  const [html, setHtml] = useState<string>('');
  useEffect(() => {
    apiPartnerAgreement()
      .then((data) => {
        setHtml(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: html }}></div>;
};

export default PartnerAgree;

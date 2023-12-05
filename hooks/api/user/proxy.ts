import instance from '@hooks/api/instance';
import { useQuery } from 'react-query';

export const temporaryFileData = () => {
  return instance({
    method: 'get',
    url: `/proxy/api/v1/file/give-me-the-file`,
  });
};

/**Todo Get API useQuery custom Hook*/
export const useTemporaryFileData = () => {
  return useQuery(['proxy', 'get', 'file'], () => temporaryFileData());
};

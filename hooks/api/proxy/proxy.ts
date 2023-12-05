import instance from '../instance';

export const fileDownload = (ulid: string) => {
  return instance({
    method: 'get',
    url: `/proxy/api/v1/file/${ulid}`,
  });
};

export const errorTestUrl = () => {
  return instance({
    method: 'get',
    url: `/proxy/api/errorTestUrl`,
  });
};

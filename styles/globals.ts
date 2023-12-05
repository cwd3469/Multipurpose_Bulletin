import { css } from '@emotion/react';

const glodal = css`
  @font-face {
    font-family: 'Pretendard';
    src: url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css');
  }

  * {
    font-family: 'Pretendard Variable', Pretendard, -apple-system,
      BlinkMacSystemFont, system-ui, Roboto, 'Helvetica Neue', 'Segoe UI',
      'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic',
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', sans-serif !important;
  }
  body {
    background-color: #f8f8f8;
  }
`;

export default glodal;

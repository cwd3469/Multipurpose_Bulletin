import { css } from '@emotion/react';
import colors from './colors';
import fonts from './fonts';

export const cssx = {
  flexBtw: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  flexCenter: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexStart: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `,
  flexEnd: css`
    display: flex;
    justify-content: flex-end;
    align-items: center;
  `,
  flexBtwR: css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `,
  flexCenterR: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  flexStartR: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  `,
  flexEndR: css`
    display: flex;
    justify-content: center;
    align-items: flex-end;
  `,
  guide: css`
    border: 2px dashed red;
  `,
  contentWidth: css`
    min-width: 1280px;
    max-width: 1500px;
    padding: 0 30px;
  `,
  container: css`
    width: 100%;
    padding: 40px 40px;
    border: solid 1px ${colors.gray_09};
    background-color: ${colors.gray_11};
    & + div {
      margin-top: 20px;
    }
  `,
  title: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 40px;
    color: ${colors.gray_01};
    ${fonts.h2_b}
  `,
  check: css`
    label {
      margin-bottom: 0;
      div {
        ${fonts.body_02_b}
      }
    }
  `,
  titleSmall: css`
    margin: 0 0 40px;
    color: ${colors.gray_01};
    ${fonts.h2_b}
    span {
      ${fonts.h2}
    }
  `,
  gridWrap: css`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 40px;
  `,
  grid: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    flex: 1;
    align-items: flex-start;
  `,
  cellWrap: css`
    display: flex;
    justify-content: space-between;
    /* align-items: flex-start; */
    align-items: center;
    width: 100%;
    min-height: 52px;
    padding-top: 10px;
    border-bottom: 1px solid ${colors.gray_09};
    & + div {
      margin-top: 11px;
    }
  `,
  cellLabel: css`
    display: flex;
    align-items: center;
    flex: none;
    width: 140px;
    height: 32px;
    margin-right: 10px;
    ${fonts.body_02}
    color: ${colors.gray_03};
    text-align: left;
  `,
  cellValue: css`
    display: flex;
    flex: 1;
    min-height: 32px;
    /* padding-right: 22px; */
    ${fonts.body_02}
    color: ${colors.gray_01};
    line-height: 32px;
  `,
  cellValueRight: css`
    display: flex;
    flex: 1;
    min-height: 32px;
    ${fonts.body_02}
    color: ${colors.gray_01};
    line-height: 32px;
    text-align: right;
    > div {
      flex: 1;
    }
  `,
  wrapHorizon: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    > div {
      width: calc(100% - 75px);
      /* border: 2px dashed red; */
      > div {
        width: 370px;
      }
    }
    label {
      height: 32px;
    }
  `,
  wrapVertical: css`
    display: flex;
    /* width: fit-content; */
    flex: 1;
    flex-direction: column;
    /* formItem 영역 제어가 필요할 경우 > div{} */
    > div {
      > div {
        width: 370px;
      }
    }
  `,
  buttonsWrap: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin-top: 20px;
  `,
  gnbOn: css`
    opacity: 1;
    &:after {
      position: absolute;
      left: 0;
      bottom: -4px;
      content: '';
      width: 100%;
      height: 4px;
      flex-grow: 0;
      background-color: ${colors.ays_maincolor};
    }
  `,
  mngTitle: css`
    margin-bottom: 25px;
    ${fonts.h0}
  `,
  mngStatBox: css`
    margin-bottom: 15px;
  `,
  mngTotalRow: css`
    ${fonts.body_03}
    strong {
      ${fonts.body_03_b}
    }
  `,
  mngButtonWrap: css`
    margin: 20px 0 -10px;
  `,
  listWrapper: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid ${colors.gray_09};
  `,
  listWrap: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 44px;
  `,
  listLeft: css`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-right: 2px;
    gap: 20px;
  `,
  listRight: css`
    padding: 6px 12px;
    text-align: right;
    ${fonts.body_01}
    span {
      ${fonts.body_01}
      color: ${colors.ays_maincolor};
    }
  `,
  listDate: css`
    ${fonts.body_02}
    color: ${colors.gray_03};
  `,
  listStatus: css`
    ${fonts.body_02}
  `,
};

/*

*** z-index
modal: 100

*/

export type ICssx = typeof cssx;
export default cssx;

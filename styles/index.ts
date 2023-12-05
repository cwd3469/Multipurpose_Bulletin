import colors, { IColor } from './colors';
import fonts, { IFont } from './fonts';
import styles, { ICssx } from './style';

export interface ITheme {
  colors: IColor;
  fonts: IFont;
  cssx: ICssx;
}

export { colors, fonts, styles };

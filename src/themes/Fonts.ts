import {Colors} from './Colors';
import {scaleFont} from './Metrics';

export const defaultTexts = {
  title: {
    fontWeight: '900',
    color: Colors.textBlack,
    fontSize: scaleFont(20),
    lineHeight: scaleFont(19),
    letterSpacing: 0,
  },
  bodyBold: {
    fontWeight: '700',
    color: Colors.textBlack,
    fontSize: scaleFont(16),
    lineHeight: scaleFont(19),
    letterSpacing: 0,
  },
  body: {
    fontWeight: '300',
    color: Colors.textBlack,
    fontSize: scaleFont(16),
    lineHeight: scaleFont(19),
    letterSpacing: 0,
  },
  bodySubtitle: {
    fontWeight: '300',
    color: Colors.textBlack,
    fontSize: scaleFont(14),
    lineHeight: scaleFont(16),
    letterSpacing: 0,
  },
};

import * as React from 'react';
import {Text, TextProps, TextStyle, View} from 'react-native';
import {Colors} from '../../themes/Colors';
import {defaultTexts} from '../../themes/Fonts';

interface TextAtomProps extends TextProps {
  text: string;
  style?: TextStyle;
  preset?: TextPresets;
}

export const TextAtom: React.FC<TextAtomProps> = ({
  text,
  style,
  preset = 'body',
  ...rest
}) => {
  const textStyle = [Presets[preset], style];
  return (
    <View>
      <Text
        {...rest}
        maxFontSizeMultiplier={1}
        style={[
          {
            flexShrink: 1,
            flexWrap: 'wrap',
            color: Colors.textBlack,
          },
          textStyle,
        ]}>
        {text}
      </Text>
    </View>
  );
};

const Presets = {
  title: {...defaultTexts.title} as TextStyle,
  bodyBold: {...defaultTexts.bodyBold} as TextStyle,
  body: {...defaultTexts.body} as TextStyle,
  bodySubtitle: {...defaultTexts.bodySubtitle} as TextStyle,
};

export type TextPresets = keyof typeof Presets;

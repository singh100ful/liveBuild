import * as React from 'react';
import {ActivityIndicator, Pressable, PressableProps, View} from 'react-native';
import {TextAtom} from './TextAtom';
import {Colors} from '../../themes/Colors';
import {SCALE_10, SCALE_20} from '../../themes/Spacing';

interface ButtonAtomProps extends PressableProps {
  text: string;
  loading?: boolean;
  disable?: boolean;
  onPress?(): any;
}

export const ButtonAtom: React.FC<ButtonAtomProps> = ({
  text,
  loading,
  disabled,
  onPress,
}) => {
  return (
    <View>
      <Pressable
        onPress={onPress}
        disabled={disabled}
        style={({pressed}) => [
          {
            backgroundColor: disabled ? Colors.disabled : Colors.secondary,
            opacity: pressed ? 0.7 : 1,
            paddingVertical: SCALE_20,
            borderRadius: SCALE_10,
            alignItems: 'center',
          },
        ]}>
        {loading ? (
          <ActivityIndicator color={Colors.white} />
        ) : (
          <TextAtom
            text={text}
            preset="bodyBold"
            style={{textTransform: 'uppercase', color: Colors.white}}
          />
        )}
      </Pressable>
    </View>
  );
};

import * as React from 'react';
import {TextInput, TextInputProps, View} from 'react-native';
import {SCALE_10, SCALE_15, SCALE_5} from '../../themes/Spacing';
import {scaleFont} from '../../themes/Metrics';
import {Colors} from '../../themes/Colors';
import {TextAtom} from './TextAtom';

interface TextInputAtomProps extends TextInputProps {
  touched?: any;
  error?: any;
  label?: string;
  clear?: boolean;
}

export const TextInputAtom: React.FC<TextInputAtomProps> = ({
  touched,
  error,
  label,
  ...rest
}) => {
  return (
    <View style={{marginVertical: SCALE_10}}>
      {label ? (
        <TextAtom
          text={label}
          preset="body"
          style={{paddingVertical: SCALE_5}}
        />
      ) : null}
      <TextInput
        {...rest}
        style={[styles.inputStyle, {height: rest.numberOfLines ? 200 : 45}]}
      />
      {touched && error && <TextAtom style={styles.errorText} text={error} />}
    </View>
  );
};

import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  inputStyle: {
    borderRadius: SCALE_10,
    fontSize: scaleFont(16),
    paddingHorizontal: SCALE_15,
    paddingVertical: SCALE_10,
    backgroundColor: Colors.white,
    color: 'rgba(0, 0, 0, 0.7)',
    borderColor: 'rgba(148, 148, 148, 0.6)',
    borderWidth: 1,
  },
  errorText: {
    fontSize: scaleFont(16),
    color: Colors.error,
  },
});

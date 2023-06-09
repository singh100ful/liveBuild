import * as React from 'react';
import {Pressable, PressableProps, View, StyleSheet} from 'react-native';
import {SCALE_20, SCALE_25, SCALE_40} from '../../themes/Spacing';
import {Colors} from '../../themes/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

interface FloatingButtonAtomProps extends PressableProps {}

export const FloatingButtonAtom: React.FC<FloatingButtonAtomProps> = props => {
  return (
    <Pressable
      {...props}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}>
      <View style={styles.buttonContainer}>
        <Icon name="create-outline" color={Colors.white} size={SCALE_25} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: Colors.primary,
    paddingHorizontal: SCALE_20,
    paddingVertical: SCALE_20,
    borderRadius: SCALE_40,
  },
});

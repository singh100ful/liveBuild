import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {SCALE_10, SCALE_20, SCALE_5} from '../../themes/Spacing';
import {InitialsAtom} from '../atom/InitialAtom';
import {TextAtom} from '../atom/TextAtom';

interface CommentMoleculeProps {
  data: Comment;
}

export const CommentMolecule: React.FC<CommentMoleculeProps> = ({data}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <InitialsAtom initial={data.email} />
      </View>
      <View style={styles.textContainer}>
        <TextAtom
          text={data.email}
          style={{
            paddingVertical: SCALE_5,
          }}
        />
        <TextAtom preset="bodyBold" text={data.name} style={styles.textStyle} />
        <TextAtom text={data.body} style={styles.textStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingVertical: SCALE_10,
    paddingHorizontal: SCALE_20,
  },
  textContainer: {flex: 5, paddingHorizontal: SCALE_10},
  textStyle: {
    textTransform: 'capitalize',
    paddingVertical: SCALE_5,
  },
});

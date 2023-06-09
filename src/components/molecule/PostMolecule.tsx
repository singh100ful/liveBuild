import * as React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {RouteKeys} from '../../navigation/RouteKeys';
import {SCALE_20, SCALE_10, SCALE_5, SCALE_25} from '../../themes/Spacing';
import {InitialsAtom} from '../atom/InitialAtom';
import {TextAtom} from '../atom/TextAtom';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

interface PostMoleculeProps {
  data: Post;
}

export const PostMolecule: React.FC<PostMoleculeProps> = ({data}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate(RouteKeys.PostScreen, {
          data: data,
        })
      }>
      <View style={styles.container}>
        <InitialsAtom initial={data.title} />
        <View style={styles.textContainer}>
          <TextAtom
            text={data.title}
            style={styles.titleText}
            preset="bodyBold"
            numberOfLines={1}
          />
          <TextAtom
            text={data.body}
            style={{textTransform: 'capitalize'}}
            numberOfLines={3}
            ellipsizeMode="tail"
          />
        </View>
        <Icon name="chevron-forward" size={SCALE_25} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SCALE_20,
    paddingVertical: SCALE_10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textContainer: {paddingHorizontal: SCALE_10, width: '80%'},
  titleText: {
    textTransform: 'uppercase',
    paddingVertical: SCALE_5,
  },
});

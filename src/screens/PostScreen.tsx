import * as React from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import {GenericNavigation} from '../navigation/Navigation';
import {useDispatch, useSelector} from 'react-redux';
import {getComment} from '../store/services/PostService';
import {RootState} from '../store/store';
import {TextAtom} from '../components/atom/TextAtom';
import {SCALE_10, SCALE_20, SCALE_5} from '../themes/Spacing';
import {Colors} from '../themes/Colors';
import {CommentMolecule} from '../components/molecule/CommentMolecule';
import {globalStyles} from '../themes/Styles';

interface PostScreenProps extends GenericNavigation {}

export const PostScreen: React.FC<PostScreenProps> = ({route, navigation}) => {
  const {comment, loading} = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (route?.params?.data) {
      navigation.setOptions({
        title: route?.params?.data?.title,
      });
      const id = route?.params?.data?.id;
      dispatch(getComment(id));
    }
  }, []);

  const title = route?.params?.data?.title;
  const body = route?.params?.data?.body;

  console.log(comment);

  return (
    <View style={globalStyles.mainContainer}>
      <View style={{paddingHorizontal: SCALE_20}}>
        <TextAtom
          text={title}
          preset="title"
          style={{
            textTransform: 'uppercase',
            paddingVertical: SCALE_10,
          }}
        />
        <TextAtom
          text={body}
          preset="body"
          style={{textTransform: 'capitalize', paddingVertical: SCALE_5}}
        />
        <TextAtom text="Comments :" preset="bodyBold" />
      </View>

      <ScrollView>
        {loading.comment ? (
          <ActivityIndicator size={'large'} color={Colors.secondary} />
        ) : (
          <View style={{flex: 1}}>
            {comment.map((data: Comment, index: number) => {
              return <CommentMolecule data={data} key={index} />;
            })}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

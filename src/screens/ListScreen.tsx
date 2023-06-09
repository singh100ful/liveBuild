import * as React from 'react';
import {FlatList, View, StyleSheet, Pressable, Animated} from 'react-native';
import {FloatingButtonAtom} from '../components/atom/FloatingButtonAtom';
import {getPost} from '../store/services/PostService';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {SCALE_10, SCALE_20} from '../themes/Spacing';
import {SeparatorAtom} from '../components/atom/SeparatorAtom';
import {GenericNavigation} from '../navigation/Navigation';
import {RouteKeys} from '../navigation/RouteKeys';
import {PostMolecule} from '../components/molecule/PostMolecule';
import {globalStyles} from '../themes/Styles';
import {Colors} from '../themes/Colors';
import {WINDOW_WIDTH, moderateScale} from '../themes/Metrics';
import {TextInputAtom} from '../components/atom/TextInputAtom';
import Icon from 'react-native-vector-icons/Ionicons';
import {addSearch} from '../store/reducers/postSlice';

interface ListScreenProps extends GenericNavigation {}

export const ListScreen: React.FC<ListScreenProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = React.useState(false);
  const [search, setSearch] = React.useState('');
  const searchSlide = React.useRef(new Animated.Value(0)).current;
  const {post, searchData, loading} = useSelector((state: RootState) => state);

  React.useEffect(() => {
    dispatch(getPost());
  }, []);

  const toggleSearch = () => {
    setToggle(!toggle);

    Animated.timing(searchSlide, {
      duration: 300,
      toValue: 100,
      useNativeDriver: true,
    }).start();
  };

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        toggle ? (
          <View style={{borderRadius: 30}}>
            <Pressable
              android_ripple={{
                color: 'rgba(0,0,0,0.5)',
                radius: 20,
                borderless: false,
              }}
              onPress={() => toggleSearch()}>
              <Icon name="close" size={25} color={Colors.white} />
            </Pressable>
          </View>
        ) : (
          <View style={{borderRadius: 30}}>
            <Pressable
              android_ripple={{
                color: 'rgba(0,0,0,0.5)',
                radius: 20,
                borderless: false,
              }}
              onPress={() => toggleSearch()}>
              <Icon name="search" size={25} color={Colors.white} />
            </Pressable>
          </View>
        ),
    });
  }, [toggle]);

  const searchFilter = (text: string) => {
    setSearch(text);

    const newData = post.filter((item: Post) => {
      if (item !== null) {
        const title = item.title.toUpperCase();
        const body = item.body.toUpperCase();

        const textData = text.toUpperCase();

        return title.indexOf(textData) > -1 || body.indexOf(textData) > -1;
      }
    });

    if (text === '') {
      dispatch(addSearch(post));
    } else {
      dispatch(addSearch(newData));
    }
  };

  return (
    <View style={globalStyles.mainContainer}>
      {toggle ? (
        <Animated.View
          style={[
            {
              transform: [{translateY: searchSlide}],
            },
            styles.searchContainer,
          ]}>
          <TextInputAtom
            value={search}
            placeholder="Search"
            onChangeText={text => searchFilter(text)}
          />
        </Animated.View>
      ) : null}
      <FlatList
        data={searchData}
        initialNumToRender={6}
        windowSize={11}
        keyExtractor={item => item.id.toString()}
        ItemSeparatorComponent={() => <SeparatorAtom />}
        renderItem={({item, index}) => {
          return <PostMolecule data={item} key={index} />;
        }}
      />
      <View style={styles.buttonPosition}>
        <FloatingButtonAtom
          onPress={() => navigation.navigate(RouteKeys.AddPost)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: Colors.primary,
    width: WINDOW_WIDTH,
    height: moderateScale(60, 0.25),
    paddingHorizontal: SCALE_10,
    position: 'absolute',
    top: -100,
    right: 0,
    left: 0,
    zIndex: 1000,
  },
  buttonPosition: {position: 'absolute', bottom: SCALE_20, right: SCALE_20},
});

import {useFormik} from 'formik';
import * as React from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {addPost} from '../store/services/PostService';
import {SCALE_10, SCALE_20} from '../themes/Spacing';
import {TextInputAtom} from '../components/atom/TextInputAtom';
import {ButtonAtom} from '../components/atom/ButtonAtom';
import {RootState} from '../store/store';
import {useDidUpdate} from '../utils/hooks/useDidUpdate';
import {resetAdd} from '../store/reducers/postSlice';
import {GenericNavigation} from '../navigation/Navigation';
import {globalStyles} from '../themes/Styles';

interface AddPostProps extends GenericNavigation {}

const yupValidation = Yup.object().shape({
  title: Yup.string().required('Title is Required'),
  body: Yup.string().required('Message is Required'),
});

const INITIAL_VALUES: PostParams = {
  userId: 1,
  title: '',
  body: '',
};

export const AddPost: React.FC<AddPostProps> = ({navigation}) => {
  const {add, loading} = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: INITIAL_VALUES,
    validationSchema: yupValidation,
    onSubmit: async (values: PostParams) => {
      let data = {
        userId: values.userId,
        title: values.title,
        body: values.body,
      };
      dispatch(addPost(data));
    },
  });

  useDidUpdate(() => {
    if (add?.id) {
      dispatch(resetAdd());
      navigation.goBack();
    }
  }, [add]);

  const {handleChange, handleSubmit, values, touched, errors, setFieldTouched} =
    formik;

  return (
    <View style={globalStyles.mainContainer}>
      <View style={{paddingHorizontal: SCALE_20, paddingVertical: SCALE_10}}>
        <TextInputAtom
          label="Title"
          value={values.title}
          placeholder="Title"
          onChangeText={handleChange('title')}
          onBlur={() => setFieldTouched('title')}
          touched={touched.title}
          error={errors.title}
        />
        <TextInputAtom
          label="Message"
          value={values.body}
          placeholder="Message"
          onChangeText={handleChange('body')}
          onBlur={() => setFieldTouched('body')}
          touched={touched.body}
          error={errors.body}
          numberOfLines={6}
          multiline
        />
        <ButtonAtom
          text="Submit"
          loading={loading.post}
          onPress={handleSubmit}
          disabled={!(formik.isValid && formik.dirty) || loading.post}
        />
      </View>
    </View>
  );
};

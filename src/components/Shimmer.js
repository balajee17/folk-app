import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  COLORS,
  horizontalScale,
  moderateScale,
  verticalScale,
} from '../styles/MyStyles';
import {View} from 'react-native';

export const HomeTitleShimmer = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        width={horizontalScale(300)}
        height={verticalScale(30)}
        borderRadius={moderateScale(20)}
      />
    </SkeletonPlaceholder>
  );
};

export const HomeIconShimmer = () => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        height={horizontalScale(30)}
        width={horizontalScale(30)}
        borderRadius={moderateScale(30)}
      />
    </SkeletonPlaceholder>
  );
};

export const ImageShimmer = props => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item {...props} />
    </SkeletonPlaceholder>
  );
};

export const YoutubeShimmer = props => {
  const shimmerBgColor = '#B8B8B8';
  return (
    <View style={{backgroundColor: '#E1E9EE', ...props}}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          padding: '2%',
        }}>
        <SkeletonPlaceholder backgroundColor={shimmerBgColor}>
          <View
            style={{
              width: 60,
              height: 60,
              backgroundColor: 'gray',
              borderRadius: 30,
            }}
          />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder backgroundColor={shimmerBgColor}>
          <View
            style={{
              width: 245,
              height: 20,
              backgroundColor: 'gray',
              borderRadius: 10,
            }}
          />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder backgroundColor={shimmerBgColor}>
          <View
            style={{
              width: 7,
              height: 25,
              backgroundColor: 'gray',
              borderRadius: 10,
              marginRight: 20,
            }}
          />
        </SkeletonPlaceholder>
      </View>
      <SkeletonPlaceholder backgroundColor={'red'}>
        <View
          style={{
            width: 350,
            height: 10,
            backgroundColor: 'red',
            alignSelf: 'center',
            marginTop: 70,
          }}
        />
      </SkeletonPlaceholder>

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          position: 'absolute',
          bottom: 0,
          padding: '2%',
          paddingHorizontal: 20,
        }}>
        <SkeletonPlaceholder backgroundColor={shimmerBgColor}>
          <View
            style={{
              width: 70,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'gray',
                borderRadius: 30,
              }}
            />
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'gray',
                borderRadius: 30,
              }}
            />
          </View>
        </SkeletonPlaceholder>
        <SkeletonPlaceholder backgroundColor={shimmerBgColor}>
          <View
            style={{
              width: 150,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: 25,
                height: 25,
                backgroundColor: 'gray',
                borderRadius: 30,
              }}
            />
            <View
              style={{
                width: 80,
                height: 25,
                backgroundColor: 'gray',
                borderRadius: 4,
              }}
            />
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: 'gray',
                borderRadius: 6,
              }}
            />
          </View>
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

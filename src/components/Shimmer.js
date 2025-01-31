import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  COLORS,
  horizontalScale,
  moderateScale,
  MyStyles,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import {View} from 'react-native';

const OFF_SET = moderateScale(25);
const ITEM_WIDTH = windowWidth - OFF_SET * 2 + horizontalScale(2);
const ITEM_HEIGHT = verticalScale(200);

export const HomeTitleShimmer = () => {
  return (
    <SkeletonPlaceholder
      highlightColor={COLORS.highLightColor}
      backgroundColor={COLORS.shimmerBg}>
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
    <SkeletonPlaceholder
      highlightColor={COLORS.highLightColor}
      backgroundColor={COLORS.shimmerBg}>
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
    <SkeletonPlaceholder
      highlightColor={COLORS.highLightColor}
      backgroundColor={COLORS.shimmerBg}>
      <SkeletonPlaceholder.Item {...props} />
    </SkeletonPlaceholder>
  );
};

export const YoutubeShimmer = props => {
  const shimmerBgColor = '#b0b0b0';
  return (
    <View style={{backgroundColor: COLORS.shimmerBg, ...props}}>
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
              width: horizontalScale(60),
              height: horizontalScale(60),
              backgroundColor: 'gray',
              borderRadius: moderateScale(30),
            }}
          />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder backgroundColor={shimmerBgColor}>
          <View
            style={{
              width: horizontalScale(245),
              height: verticalScale(20),
              backgroundColor: 'gray',
              borderRadius: moderateScale(10),
            }}
          />
        </SkeletonPlaceholder>
        <SkeletonPlaceholder backgroundColor={shimmerBgColor}>
          <View
            style={{
              width: horizontalScale(7),
              height: verticalScale(25),
              backgroundColor: 'gray',
              borderRadius: moderateScale(10),
              marginRight: '5%',
            }}
          />
        </SkeletonPlaceholder>
      </View>
      <SkeletonPlaceholder backgroundColor={'red'}>
        <View
          style={{
            width: horizontalScale(345),
            height: verticalScale(10),
            backgroundColor: 'red',
            alignSelf: 'center',
            marginTop: '18%',
          }}
        />
      </SkeletonPlaceholder>

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          // position: 'absolute',
          // bottom: 0,
          padding: '3%',
          paddingHorizontal: '7%',
        }}>
        <SkeletonPlaceholder backgroundColor={shimmerBgColor}>
          <View
            style={{
              width: horizontalScale(70),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                width: horizontalScale(25),
                height: horizontalScale(25),
                backgroundColor: 'gray',
                borderRadius: moderateScale(30),
              }}
            />
            <View
              style={{
                width: horizontalScale(25),
                height: horizontalScale(25),
                backgroundColor: 'gray',
                borderRadius: moderateScale(30),
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

export const TitleShimmer = props => {
  return (
    <SkeletonPlaceholder
      highlightColor={COLORS.highLightColor}
      backgroundColor={COLORS.shimmerBg}>
      <SkeletonPlaceholder.Item
        marginTop={'3%'}
        height={verticalScale(20)}
        width={horizontalScale(130)}
        borderRadius={20}
        {...props}
      />
    </SkeletonPlaceholder>
  );
};

export const DarshanShimmer = () => {
  return (
    <>
      <TitleShimmer />

      <View style={MyStyles.imageContainer}>
        {/* // # Left Container */}
        <View style={MyStyles.leftImgCont}>
          <View>
            <SkeletonPlaceholder
              highlightColor={COLORS.highLightColor}
              backgroundColor={COLORS.shimmerBg}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={verticalScale(200)}
                borderRadius={moderateScale(10)}
              />
            </SkeletonPlaceholder>
          </View>

          <View>
            <SkeletonPlaceholder
              highlightColor={COLORS.highLightColor}
              backgroundColor={COLORS.shimmerBg}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={verticalScale(112)}
                borderRadius={moderateScale(10)}
                marginTop={'5%'}
              />
            </SkeletonPlaceholder>
          </View>
        </View>
        {/* // # Right Container */}
        <View style={MyStyles.rightImgCont}>
          <View>
            <SkeletonPlaceholder
              highlightColor={COLORS.highLightColor}
              backgroundColor={COLORS.shimmerBg}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={verticalScale(122)}
                borderRadius={moderateScale(10)}
              />
            </SkeletonPlaceholder>
          </View>

          <View>
            <SkeletonPlaceholder
              highlightColor={COLORS.highLightColor}
              backgroundColor={COLORS.shimmerBg}>
              <SkeletonPlaceholder.Item
                width={'100%'}
                height={verticalScale(190)}
                borderRadius={moderateScale(10)}
                marginTop={'5%'}
              />
            </SkeletonPlaceholder>
          </View>
        </View>
      </View>
    </>
  );
};

export const ParallexShimmer = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: verticalScale(10),
      }}>
      <View
        style={{
          marginLeft: moderateScale(25),
        }}>
        {/* First item loader */}
        <SkeletonPlaceholder
          highlightColor={COLORS.highLightColor}
          backgroundColor={COLORS.shimmerBg}>
          <View
            style={{
              borderRadius: moderateScale(15),
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              overflow: 'hidden',
              shadowColor: COLORS.white,
            }}
          />
        </SkeletonPlaceholder>
      </View>
      <View
        style={{
          marginLeft: moderateScale(8),
        }}>
        <SkeletonPlaceholder
          highlightColor={COLORS.highLightColor}
          backgroundColor={COLORS.shimmerBg}>
          <View
            style={{
              borderRadius: moderateScale(15),
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              overflow: 'hidden',
              shadowColor: COLORS.white,
            }}
          />
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

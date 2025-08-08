import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  COLORS,
  horizontalScale,
  moderateScale,
  MyStyles,
  verticalScale,
  windowWidth,
} from '../styles/MyStyles';
import {View, StyleSheet} from 'react-native';

const OFF_SET = moderateScale(25);
const ITEM_WIDTH = windowWidth - OFF_SET * 2 + horizontalScale(2);
const ITEM_HEIGHT = verticalScale(200);

export const HomeTitleShimmer = () => {
  return (
    <SkeletonPlaceholder
      highlightColor={COLORS.highLightColor}
      backgroundColor={COLORS.shimmerBg}>
      <SkeletonPlaceholder.Item
        width={horizontalScale(200)}
        height={verticalScale(30)}
        borderRadius={moderateScale(20)}
      />
    </SkeletonPlaceholder>
  );
};

export const HomeIconShimmer = ({marginTop}) => {
  return (
    <SkeletonPlaceholder
      highlightColor={COLORS.highLightColor}
      backgroundColor={COLORS.shimmerBg}>
      <SkeletonPlaceholder.Item
        height={horizontalScale(30)}
        width={horizontalScale(30)}
        borderRadius={moderateScale(30)}
        marginTop={marginTop}
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
        borderRadius={moderateScale(20)}
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
        marginTop: verticalScale(12),
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

export const EventShimmer = props => {
  const shimmerBgColor = '#b0b0b0';
  return (
    <View
      style={{
        backgroundColor: COLORS.btIcon,
        alignSelf: 'center',
        borderRadius: moderateScale(12),
        width: '93%',
        padding: '2%',
        ...props,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{width: '40%'}}>
        <SkeletonPlaceholder
          highlightColor={COLORS.white}
          backgroundColor={COLORS.shimmerBg}>
          <SkeletonPlaceholder.Item
            width={'100%'}
            height={verticalScale(160)}
            borderRadius={moderateScale(10)}
          />
        </SkeletonPlaceholder>
      </View>

      <View style={{width: '66%'}}>
        <SkeletonPlaceholder
          highlightColor={COLORS.white}
          backgroundColor={COLORS.shimmerBg}>
          <SkeletonPlaceholder.Item
            width={'80%'}
            height={horizontalScale(15)}
            borderRadius={moderateScale(25)}
            marginLeft={'4%'}
            marginTop={verticalScale(5)}
          />
        </SkeletonPlaceholder>

        <SkeletonPlaceholder
          highlightColor={COLORS.white}
          backgroundColor={COLORS.shimmerBg}>
          <SkeletonPlaceholder.Item
            marginTop={verticalScale(10)}
            width={'56%'}
            height={horizontalScale(15)}
            borderRadius={moderateScale(25)}
            marginLeft={'4%'}
          />
        </SkeletonPlaceholder>

        <SkeletonPlaceholder
          highlightColor={COLORS.white}
          backgroundColor={COLORS.shimmerBg}>
          <SkeletonPlaceholder.Item
            marginTop={verticalScale(80)}
            width={horizontalScale(100)}
            height={horizontalScale(30)}
            borderRadius={moderateScale(25)}
            marginLeft={'45%'}
          />
        </SkeletonPlaceholder>
      </View>
    </View>
  );
};

export const HostelShimmer = () => {
  return (
    <View style={styles.hostelShimmerCard}>
      {/* Image Shimmer */}
      <SkeletonPlaceholder
        highlightColor={COLORS.highLightColor}
        backgroundColor={COLORS.shimmerBg}>
        <SkeletonPlaceholder.Item
          width={'100%'}
          height={verticalScale(375)}
          borderTopLeftRadius={moderateScale(12)}
          borderTopRightRadius={moderateScale(12)}
        />
      </SkeletonPlaceholder>
      
      {/* Tag Shimmer */}
      <View style={styles.tagShimmerContainer}>
        <SkeletonPlaceholder
          highlightColor={COLORS.highLightColor}
          backgroundColor={COLORS.shimmerBg}>
          <SkeletonPlaceholder.Item
            width={horizontalScale(120)}
            height={verticalScale(32)}
            borderRadius={moderateScale(20)}
          />
        </SkeletonPlaceholder>
      </View>
      
      {/* Content Shimmer */}
      <View style={styles.contentShimmer}>
        <SkeletonPlaceholder
          highlightColor={COLORS.highLightColor}
          backgroundColor={COLORS.shimmerBg}>
          <SkeletonPlaceholder.Item
            width={'80%'}
            height={verticalScale(20)}
            borderRadius={moderateScale(10)}
            marginBottom={verticalScale(8)}
          />
        </SkeletonPlaceholder>
        
        <View style={styles.addressShimmerContainer}>
          <SkeletonPlaceholder
            highlightColor={COLORS.highLightColor}
            backgroundColor={COLORS.shimmerBg}>
            <SkeletonPlaceholder.Item
              width={horizontalScale(16)}
              height={horizontalScale(16)}
              borderRadius={moderateScale(8)}
            />
          </SkeletonPlaceholder>
          
          <SkeletonPlaceholder
            highlightColor={COLORS.highLightColor}
            backgroundColor={COLORS.shimmerBg}>
            <SkeletonPlaceholder.Item
              width={'85%'}
              height={verticalScale(16)}
              borderRadius={moderateScale(8)}
              marginLeft={horizontalScale(8)}
            />
          </SkeletonPlaceholder>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hostelShimmerCard: {
    backgroundColor: COLORS.white,
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(16),
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tagShimmerContainer: {
    position: 'absolute',
    top: verticalScale(12),
    right: horizontalScale(12),
  },
  contentShimmer: {
    padding: horizontalScale(16),
  },
  addressShimmerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

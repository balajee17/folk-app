import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  COLORS,
  FONTS,
  horizontalScale,
  moderateScale,
  MyStyles,
  SIZES,
  verticalScale,
} from '../styles/MyStyles';
import {screenNames} from '../constants/ScreenNames';
import {EventShimmer} from '../components/Shimmer';
import NoDataFound from '../components/NoDataFound';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const UpcomingEvents = ({navigation, upcomingList, shimmer, refresh}) => {
  // # Navigate Sreen
  const navigateTo = (screen, params) => {
    navigation.navigate(screen, params);
  };
  return (
    <>
      {!shimmer ? (
        <FlatList
          contentContainerStyle={{paddingBottom: verticalScale(250)}}
          data={upcomingList}
          showsVerticalScrollIndicator={false}
          renderItem={({item, index}) => {
            return (
              <>
                {/*  // @ Events Card */}
                <View
                  style={[MyStyles.card, {marginTop: index == 0 ? '2%' : '5%'}]}
                  key={item?.id}>
                  {/* // # Card image */}
                  <View
                    style={{
                      borderRadius: moderateScale(20),
                      overflow: 'hidden',
                    }}>
                    <Image
                      style={{
                        aspectRatio: 1 / 0.4,
                        borderRadius: moderateScale(20),
                      }}
                      source={{
                        uri: item?.image,
                      }}
                    />
                  </View>

                  {/* // # Date Mode Container */}
                  <View style={MyStyles.dateModeCont}>
                    <View style={MyStyles.dateCont}>
                      <Text style={MyStyles.dateTxt}>{item?.start_date}</Text>
                      <Text style={MyStyles.monthTxt}>{item?.start_month}</Text>
                    </View>

                    <View style={MyStyles.modeCont}>
                      <Text style={MyStyles.modeTxt}>
                        {item?.event_type === 'F' ? 'Offline' : 'Online'}
                      </Text>
                    </View>
                  </View>

                  {item?.isLive === 'Y' && (
                    <View style={styles.liveCont}>
                      <MaterialCommunityIcons
                        name="access-point"
                        size={horizontalScale(12)}
                        color={COLORS.white}
                      />
                      <Text style={styles.liveTxt}>LIVE</Text>
                    </View>
                  )}

                  {/* // # Content Container */}
                  <View style={MyStyles.boxContentContainer}>
                    <View style={{width: '72%'}}>
                      <Text numberOfLines={1} style={MyStyles.titleTxt}>
                        {item?.session_name}
                      </Text>
                      <Text numberOfLines={1} style={MyStyles.descripTxt}>
                        {item?.description}
                      </Text>
                    </View>

                    <View style={{width: '25%'}}>
                      <Text style={MyStyles.amtTxt}>{item?.amount}</Text>
                    </View>
                  </View>

                  {/* // # Icon & Register Btn Container */}
                  <View
                    style={[
                      MyStyles.boxContentContainer,
                      {marginBottom: '1%', justifyContent: 'space-between'},
                    ]}>
                    <View style={styles.leftContainer}>
                      <Text style={styles.avlSlotTxt}>
                        {item?.availableSlot && item?.availableSlot !== ''
                          ? `Available Seats : ${item?.availableSlot}`
                          : ''}
                      </Text>
                    </View>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => {
                        navigateTo(screenNames.eventDetails, {
                          screen: 'Upcoming',
                          eventId: item?.id,
                        });
                      }}
                      style={[
                        MyStyles.registerBtn,
                        {opacity: item?.availableSlot === 0 ? 0.5 : 1},
                        {
                          backgroundColor:
                            item?.availableSlot === 0
                              ? COLORS.cloud
                              : COLORS.atlantis,
                        },
                      ]}>
                      <Text style={MyStyles.registerTxt}>
                        {item?.availableSlot === 0 ? 'Full' : 'Register'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={refresh} />
          }
          ListEmptyComponent={
            !shimmer && <NoDataFound screen={screenNames.events} />
          }
        />
      ) : (
        Array(2)
          .fill(2)
          .map((_, i) => <EventShimmer marginTop={i === 0 ? '2%' : '5%'} />)
      )}
    </>
  );
};

export default UpcomingEvents;

const styles = StyleSheet.create({
  leftContainer: {
    width: '40%',
  },
  avlSlotTxt: {
    fontFamily: FONTS.urbanistRegular,
    fontSize: SIZES.m,
    color: COLORS.white,
  },
  liveCont: {
    width: horizontalScale(40),
    borderRadius: moderateScale(3),
    position: 'absolute',
    bottom: '50%',
    alignSelf: 'flex-end',
    right: '8%',
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: '1%',
  },
  liveTxt: {
    fontFamily: FONTS.poppinsSemiBold,
    fontSize: SIZES.s,
    color: COLORS.white,
    top: '4%',
  },
});

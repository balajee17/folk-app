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
import {useAppContext} from '../../App';

const UpcomingEvents = ({navigation, upcomingList, shimmer, refresh}) => {
  const {globalState} = useAppContext();
  const {eventCardColor, buttonColor} = globalState;

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
                  style={[
                    MyStyles.card,
                    {
                      marginTop: index == 0 ? '2%' : '5%',
                      backgroundColor: eventCardColor || COLORS.eventCard,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    },
                  ]}
                  key={item?.id}>
                  {/* // # Left Side Image */}
                  <View style={[MyStyles.imgCont]}>
                    <Image
                      style={MyStyles.image}
                      source={{
                        uri: item?.image,
                      }}
                    />
                  </View>

                  {/* // # Right Side - Event Title */}
                  <View style={{width: '66%'}}>
                    <Text numberOfLines={1} style={MyStyles.titleTxt}>
                      {item?.session_name}
                    </Text>
                    <Text
                      numberOfLines={3}
                      style={[
                        MyStyles.descripTxt,
                        {marginTop: '1%', lineHeight: 17},
                      ]}>
                      {item?.description}
                    </Text>
                    {/* // # Date & mode */}
                    <View style={MyStyles.dateModeCont}>
                      <Text numberOfLines={1} style={MyStyles.dateTxt}>
                        {item?.start_date}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[MyStyles.dateTxt, {marginLeft: '2%'}]}>
                        {item?.start_month},
                      </Text>

                      <Text
                        numberOfLines={1}
                        style={[MyStyles.dateTxt, {marginLeft: '1%'}]}>
                        {item?.event_type === 'F' ? 'Offline' : 'Online'}
                      </Text>
                    </View>

                    {/*  // # Amount & Available Seats */}
                    <Text
                      numberOfLines={1}
                      style={[
                        MyStyles.amtTxt,
                        {width: '100%', marginTop: '2%'},
                      ]}>
                      {item?.amount}
                    </Text>

                    {/*  // # Button */}
                    <Text
                      numberOfLines={1}
                      style={[
                        MyStyles.avlSlotTxt,
                        {marginTop: '2%', width: '100%'},
                      ]}>
                      {item?.availableSlot && item?.availableSlot !== ''
                        ? `Available Seats : ${item?.availableSlot}`
                        : ''}
                    </Text>
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
                              ? COLORS.border
                              : buttonColor || COLORS.button,
                        },
                      ]}>
                      <Text numberOfLines={1} style={MyStyles.registerTxt}>
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
        Array(3)
          .fill(3)
          .map((_, i) => <EventShimmer marginTop={i === 0 ? '2%' : '5%'} />)
      )}
    </>
  );
};

export default UpcomingEvents;

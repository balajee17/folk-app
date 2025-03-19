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
import {MyStyles, verticalScale} from '../styles/MyStyles';
import {screenNames} from '../constants/ScreenNames';
import {EventShimmer} from '../components/Shimmer';
import moment from 'moment';
import NoDataFound from '../components/NoDataFound';

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
                  <Image
                    style={MyStyles.cdImage}
                    resizeMode="stretch"
                    source={{
                      uri: item?.image,
                    }}
                  />

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
                      {marginBottom: '1%', justifyContent: 'flex-end'},
                    ]}>
                    <TouchableOpacity
                      activeOpacity={0.6}
                      onPress={() => {
                        navigateTo(screenNames.eventDetails, {
                          screen: 'Upcoming',
                          eventId: item?.id,
                        });
                      }}
                      style={MyStyles.registerBtn}>
                      <Text style={MyStyles.registerTxt}>Register</Text>
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

const styles = StyleSheet.create({});

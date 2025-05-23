import {FlatList, StyleSheet, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AndroidBackHandler from '../components/BackHandler';
import {MyStyles} from '../styles/MyStyles';
import Container from '../components/Container';
import CustomHeader from '../components/CustomHeader';
import {screenNames} from '../constants/ScreenNames';
import ChallengeCompletedCard from '../components/ChallengeCompletedCard';

const CompletedChallenge = props => {
  const [challengesList, setChallengesList] = useState([
    {
      id: 3,
      title: 'Service - Volunteer',
      image:
        'https://static.vecteezy.com/system/resources/previews/004/449/833/non_2x/volunteers-2d-isolated-illustration-contributing-to-humanitarian-aid-smiling-man-and-woman-social-service-worker-flat-characters-on-cartoon-background-charity-work-colourful-scene-vector.jpg',
      percentage: 30,
      color: '#C4331F',
    },
    {
      id: 4,
      title: 'Puja Services',
      image:
        'https://png.pngtree.com/png-clipart/20230124/ourmid/pngtree-pooja-plate-and-kalash-with-flowers-sweets-png-image_6568931.png',
      percentage: 60,
      color: '#FEB600',
    },
    {
      id: 5,
      title: 'Homam',
      image:
        'https://www.shutterstock.com/image-vector/rishis-doing-homam-cartoon-illustration-260nw-2514756875.jpg',
      percentage: 40,
      color: '#FC7D14',
    },
    {
      id: 6,
      title: 'Bhajan',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbhL3tKJVGHNEwaUtwd6YiDhOSHU0eheVVuQ&s',
      percentage: 100,
      color: '#FD6D00',
    },
    {
      id: 7,
      title: 'Sankalpam',
      image:
        'https://c0.klipartz.com/pngpicture/766/158/gratis-png-sociedad-internacional-para-la-conciencia-de-krishna-libro-de-febrero-de-noviembre-krishna-thumbnail.png',
      percentage: 85,
      color: '#F4D6A8',
    },
    {
      id: 8,
      title: 'Annadanam',
      image:
        'https://lightup-temples.s3.ap-south-1.amazonaws.com/wp-content/uploads/Annadanam.png',
      percentage: 25,
      color: '#F9C999',
    },
  ]);

  const {navigation} = props;

  useEffect(() => {
    AndroidBackHandler.setHandler(props);

    return AndroidBackHandler.removerHandler();
  }, []);

  return (
    <Container>
      {/* // # Header */}
      <CustomHeader
        goBack={() => navigation.goBack()}
        titleName={screenNames.completedChallenge}
      />
      {/* // # Contents */}
      <View style={MyStyles.contentCont}>
        <FlatList
          data={challengesList}
          contentContainerStyle={{paddingBottom: '5%'}}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <ChallengeCompletedCard
              key={item?.id}
              title={item?.title}
              image={item?.image}
              fillPercentage={item?.percentage}
              color={item?.color}
            />
          )}
        />
      </View>
    </Container>
  );
};

export default CompletedChallenge;

const styles = StyleSheet.create({});

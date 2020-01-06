import React, {useContext} from 'react';
import {StyleSheet, Text, Image, Platform, ScrollView, View} from 'react-native';
import {NavigationContext} from 'navigation-react';
import {NavigationBar} from 'navigation-react-native';
import Tweets from './Tweets';

export default ({timeline: {id, name, username, logo, bio, 
  followers, following, tweets}}) => {
  const {stateNavigator} = useContext(NavigationContext);
  return (
    <>
      <NavigationBar
        title={name}
        navigationImage={require('./arrow.png')}
        barTintColor={Platform.OS === 'android' ? '#fff' : null}
        tintColor={Platform.OS === 'android' ? "deepskyblue" : null}
        onNavigationPress={() => {
          stateNavigator.navigateBack(1)
        }} />
      <ScrollView 
        contentInsetAdjustmentBehavior="automatic"
        style={styles.view}>
        <View>
          <Image style={styles.logo} source={logo} />
          <Text style={styles.name}>{name}</Text>
          <Text>{username}</Text>
          <Text style={styles.bio}>{bio}</Text>
        </View>
        <View style={styles.interactions}>
          <Text style={styles.count}>{following.toLocaleString()}</Text>
          <Text style={styles.interaction}>FOLLOWING</Text>
          <Text style={styles.count}>{followers.toLocaleString()}</Text>
          <Text style={styles.interaction}>FOLLOWERS</Text>
        </View>
        <Tweets tweets={tweets} onTimeline={accountId => accountId !== id} />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 20,
    borderRadius: 50,
    marginRight: 12,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18, 
    marginTop: 5,
    marginBottom: 2,
  },
  bio: {
    marginTop: 10, 
    marginBottom: 10, 
  },
  interactions: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ccd6dd',
    paddingTop: 12,
    paddingBottom: 12,
  },
  count: {
    fontWeight: 'bold',
    fontSize: 13,
    marginRight: 5,
  },
  interaction: {
    color: '#657786',
    fontSize: 13,
    marginRight: 10,
  },
});

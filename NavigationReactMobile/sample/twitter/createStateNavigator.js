import React from 'react';
import {StateNavigator} from 'navigation';
import {MobileHistoryManager} from 'navigation-react-mobile';
import Home from './Home';
import Tweet from './Tweet';
import Timeline from './Timeline';
import Photo from './Photo';
import {getHome, getTweet, getTimeline} from './data';

export default () => {
  const buildStartUrl = url => {
    const {state, data} = stateNavigator.parseLink(url);
    let fluent = stateNavigator.fluent().navigate('home');
    if (state.key === 'photo')
      fluent = fluent.navigate('tweet', {id: data.id});
    return fluent.navigate(state.key, data).url;
  };

  const stateNavigator = new StateNavigator([
    {key: 'home', route: '', title: 'Home'},
    {key: 'tweet', trackCrumbTrail: true, title: 'Tweet'},
    {key: 'timeline', trackCrumbTrail: true, title: 'Timeline'},
    {key: 'photo', trackCrumbTrail: true, title: 'Photo'}
  ], new MobileHistoryManager(buildStartUrl));

  const {home, tweet, timeline, photo} = stateNavigator.states;
  home.renderScene = () => <Home tweets={getHome()} />;
  tweet.renderScene = ({id}) => <Tweet tweet={getTweet(id)} />;
  timeline.renderScene = ({id}) => <Timeline timeline={getTimeline(id)} />;
  photo.renderScene = ({id}) => <Photo photo={getTweet(id).photo} />;
  
  return stateNavigator;
}

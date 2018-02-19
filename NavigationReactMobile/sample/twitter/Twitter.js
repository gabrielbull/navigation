import React from 'react';
import {NavigationMotion} from 'navigation-react-mobile';
import PhotoZoom from './PhotoZoom';

export default () => (
  <NavigationMotion
    unmountedStyle={(state, data, crumbs) => {
      var previousCrumb = crumbs[crumbs.length - 1];
      var fromSameTweet = previousCrumb && previousCrumb.state.key === 'tweet' && previousCrumb.data.id === data.id;
      return (state.key !== 'photo' || fromSameTweet) ? {translate: 100, scale: 1, opacity: 1} : {translate: 0, scale: 1, opacity: 0}
    }}
    mountedStyle={{translate: 0, scale: 1, opacity: 1}}
    crumbStyle={(state, data, crumbs, nextState) => (
      nextState.key !== 'photo' ? {translate: 5, scale: 0.9, opacity: 0} : {translate: 0, scale: 1, opacity: 0}
    )}
    sharedElementMotion={props => <PhotoZoom {...props} />}>
    {({translate, scale, opacity}, scene, key, active) => (
      <div key={key}
        className="scene"
        style={{
          transform: `translate(${translate}%, 0) scale(${scale}, ${scale})`,
          opacity
        }}>
        {scene}
      </div>
    )}
  </NavigationMotion>
);

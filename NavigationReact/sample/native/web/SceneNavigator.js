import {spring, Motion, TransitionMotion} from 'react-motion';
import React, {Component} from 'react';

class SceneNavigator extends Component{
    constructor(props) {
        super(props);
        var {state, data, url} = props.stateNavigator.stateContext;
        this.state = {scenes: {[url]: state.renderScene(data)}};
        this.onNavigate = this.onNavigate.bind(this);
    }
    componentDidMount() {
        this.props.stateNavigator.onNavigate(this.onNavigate);
    }
    componentWillUnmount() {
        this.props.stateNavigator.offNavigate(this.onNavigate);
    }
    onNavigate(oldState, state, data, asyncData) {
        this.setState((prevState) => {
            var {url, crumbs} = this.props.stateNavigator.stateContext;
            var scenes = {[url]: state.renderScene(data, asyncData)};
            for(var i = 0; i < crumbs.length; i++) {
                scenes[crumbs[i].url] = prevState.scenes[crumbs[i].url]; 
            }
            return {scenes};
        });
    }
    renderScene({key, data: {scene, state, data, mount}, style: {parent,...parentStyle}}) {
        var {getMountStyle, getMountedStyle, children} = this.props;
        var style = (mount ? getMountStyle : getMountedStyle)(state, data);
        return (
            <Motion key={key} style={parent ? parentStyle : style}>
                {(tweenStyle) => children(tweenStyle, scene, state, data)}
            </Motion>
        );
    }
    render() {
        var {oldState, state, data, url, crumbs} = this.props.stateNavigator.stateContext;
        var {getUnmountedStyle, getMountStyle, getUnmountStyle} = this.props;
        var sceneContexts = crumbs.concat({state, data, url, mount: true});
        return (
            <TransitionMotion
                willEnter={() => ({...getUnmountedStyle(state, data), parent: 1})} 
                willLeave={() => ({...getUnmountStyle(state, data), parent: 1})}
                styles={sceneContexts.map(({state, data, url, mount}) => ({
                    key: url,
                    data: {scene: this.state.scenes[url], state, data, mount},
                    style: {...getMountStyle(state, data), parent: spring(0)}
                }))}>
                {tweenStyles => <div>{tweenStyles.map((config) => this.renderScene(config))}</div>}
            </TransitionMotion>
        );
    }
}

export default SceneNavigator;

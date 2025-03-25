import React from 'react';
import {Animated} from 'react-native';

export default class SlideInView extends React.Component {
  state = {
    slideAnim: new Animated.Value(-100), // Initial value for opacity: 0
    fadeAnim: new Animated.Value(0), // Initial value for opacity: 0
  };

  componentDidMount() {
    const {index = 0} = this.props;
    setTimeout(() => {
      Animated.timing(
        // Animate over time
        this.state.fadeAnim, // The animated value to drive
        {
          toValue: 1, // Animate to opacity: 1 (opaque)
          duration: 500, // Make it take a while
        },
      ).start(); // Starts the animation
      Animated.timing(
        // Animate over time
        this.state.slideAnim, // The animated value to drive
        {
          toValue: 0, // Animate to opacity: 1 (opaque)
          duration: 400, // Make it take a while
        },
      ).start(); // Starts the animation
    }, index * 250);
  }

  render() {
    let {fadeAnim, slideAnim} = this.state;

    return (
      <Animated.View // Special animatable View
        style={{
          ...this.props.style,
          opacity: fadeAnim,
          marginLeft: slideAnim, // Bind opacity to animated value
        }}>
        {this.props.children}
      </Animated.View>
    );
  }
}

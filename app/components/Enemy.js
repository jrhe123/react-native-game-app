import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
} from 'react-native'

export default class Enemy extends Component{

  render(){

    return(
      <Animated.Image
        source={this.props.enemyImg}
        style={{
          width: 100,
          height: 80,
          resizeMode: 'stretch',
          position: 'absolute',
          left: this.props.enemyStartposX,
          transform: [
            {translateY: this.props.moveEnemyVal}
          ]
        }}>

      </Animated.Image>
    )
  }
}

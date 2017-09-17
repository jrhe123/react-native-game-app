import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Animated,
  Image,
} from 'react-native';

// components
import Enemy from './app/components/Enemy'


export default class GameApp extends Component {

  constructor(props){
    super(props)
    this.state = {
      movePlayerVal: new Animated.Value(40),
      playerSide: 'left',
      points: 0,

      moveEnemyVal: new Animated.Value(0),
      enemySide: 'left',
      enemySpeed: 4200,

      gameOver: false,
    }
  }

  componentDidMount(){
    this.animateEnemy()
  }

  animateEnemy(){

    var windowH = Dimensions.get('window').height
    var r = Math.floor(Math.random() * 2) + 1

    if(r == 2){
      r = 40
      this.setState({
        enemySide: 'left'
      })
    } else {
      r = Dimensions.get('window').width - 140
      this.setState({
        enemySide: 'right'
      })
    }
    this.setState({
      enemyStartposX: r
    })

    let refreshIntervalId;
    refreshIntervalId = setInterval(() => {
      if(this.state.moveEnemyVal._value > windowH - 280
        && this.state.moveEnemyVal._value < windowH - 180
        && this.state.playerSide == this.state.enemySide){

        clearInterval(refreshIntervalId)
        this.setState({
          gameOver: true
        })
        this.gameOver()
      }
    }, 50)

    setInterval(() => {
      this.setState({
        enemySpeed: this.state.enemySpeed - 50
      })
    }, 10000)

    Animated.timing(
      this.state.moveEnemyVal,
      {
        toValue: Dimensions.get('window').height,
        duration: this.state.enemySpeed
      }
    ).start(event => {
      if(event.finished && this.state.gameOver === false){
        clearInterval(refreshIntervalId)
        this.setState({
          points: ++this.state.points,
          moveEnemyVal: new Animated.Value(0)
        })
        this.animateEnemy()
      }
    })

  }

  gameOver(){
    alert('game over')
  }

  movePlayer = (direction) => {

    if(direction === 'right'){
      this.setState({
        playerSide: 'right'
      })

      Animated.spring(
        this.state.movePlayerVal,
        {
          toValue: Dimensions.get('window').width - 140,
          tension: 120
        }
      ).start();
    }else{
      this.setState({
        playerSide: 'left'
      })

      Animated.spring(
        this.state.movePlayerVal,
        {
          toValue: 40,
          tension: 120
        }
      ).start();
    }

  }

  render() {

    return (
        <Image
          style={styles.container}
          source={require('./app/img/bg.png')}>

          <StatusBar barStyle="light-content" />

          <View style={{flex:1, alignItems: 'center', marginTop: 80}}>
            <View style={styles.points}>
              <Text styl={{fontSize: 40, fontWeight: 'bold'}}>
                {this.state.points}
              </Text>
            </View>
          </View>

          <Enemy
            enemyImg={require('./app/img/enemy.png')}
            enemyStartposX={this.state.enemyStartposX}
            moveEnemyVal={this.state.moveEnemyVal} />

          <Animated.Image
            source={require('./app/img/car.png')}
            style={{
              width: 100,
              height: 80,
              resizeMode: 'stretch',
              position: 'absolute',
              zIndex: 1,
              bottom: 50,
              transform: [
                {translateX: this.state.movePlayerVal}
              ]
            }}>
          </Animated.Image>

          <View style={styles.controls}>
            <Text
              style={styles.left}
              onPress={() => this.movePlayer('left')}>{'<'}</Text>
            <Text
              style={styles.right}
              onPress={() => this.movePlayer('right')}>{'>'}</Text>
          </View>

        </Image>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    position: 'relative',
    alignSelf: 'stretch',
    width: null,
    resizeMode: 'cover'
  },
  points: {
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent'
  },
  left: {
    flex: 1,
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'right'
  },
  right: {
    flex: 1,
    color: '#fff',
    margin: 0,
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'left'
  },

});

AppRegistry.registerComponent('GameApp', () => GameApp);

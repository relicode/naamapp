import React, { Component } from 'react'
import { Animated, Modal, Text, View } from 'react-native'

interface RotatingSymbolProps {
  char: string,
  style?: {},
}

class RotatingSymbol extends Component<RotatingSymbolProps, { rotation?: any }> {
  constructor(props: RotatingSymbolProps) {
    super(props)
    this.setState({ rotation: {
      rotation: new Animated.Value(0),
    }})
  }

  public componentDidMount() {
    Animated.spring(this.state.rotation, {
      toValue: 1,
      tension: 150,
      friction: 5,
      useNativeDriver: true,
    }).start()
  }

  public render() {
    const { style, ...other } = this.props
    const rotate = this.state.rotation.interpolate({
      inputRange: [0, 1],
      outputRange: [`${this.state.rotation - 60}deg`, `${this.state.rotation}deg`],
    })
    return (
      <Animated.Text
        {...other}
        source={this.props.char}
        style={[style, { transform: [{ rotate }] }]}
      />
    )
  }
}

interface Props {
  visible: boolean,
  content: string,
}

export default (props: Props) => (
  <Modal transparent={true}
      visible={props.visible}
    >
    <View style={{
      backgroundColor: '#00000080',
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'}}
    >
      <View style={{
        backgroundColor: '#fff', padding: 20,
        width: 300,
        height: 300}}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}><Text style={{ fontSize: 24/*, transform: [{ rotate: '90deg' }]*/ }}>{props.content}</Text>
        </View>
      </View>
    </View>
  </Modal>
)

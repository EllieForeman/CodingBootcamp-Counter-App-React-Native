import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight, FlatList } from 'react-native';// React Native does not render to a browser, so we cannot use HTML elements. Instead, we render React Native elements such as `View`, `Text` and `Image` and these components are rendered as the target platform's native components.
import moment from 'moment'; // a JS library for displaying dates better. You couldn't use a moment if the app interacted with the DOM

const countImage = require('./count.jpg');//different mobile devices use different 'pixel densities'
//react Native will choose the correct file for the pixel density of the device by the  `@nx` naming convention.


// The CounterHistoryItem is a stateless component which is rendered inside the History list. It describes when the action was taken and what the action was.
// The button here is passed the base `counterButton` style, and if the button is disabled, the `counterButtonDisabled` style is also applied.
const CounterHistoryItem = ({item}) => { 
  const { timestamp, operation, before, after } = item;
  // The `item` prop contains 4 properties.
  const dateOfOperation = moment(timestamp).calendar() //moment `calendar` method generates this from the raw timestamp 
  const didOperation = operation === 'increment' ? 'Incremented' : 'Decremented';
  const text = `${dateOfOperation}: ${didOperation} from ${before} to ${after}`
  return <Text>{text}</Text>;
}

// The parent component is the Counter, which is exported  from this file to be used by the root App component.
const CounterButton = ({label, onPress, disabled}) => ( 
  <TouchableHighlight
    style={[styles.counterButton, disabled ? styles.counterButtonDisabled : null]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={styles.counterButtonText}>{label}</Text>
  </TouchableHighlight>
)

export default class Counter extends Component {
  constructor() {
    super();

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment() {
    this.props.updateCounter('increment');
  }

  decrement() {
    this.props.updateCounter('decrement');
  }

  render() {
    const { counterValue, history } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Count Tuten</Text>
        <Image style={styles.image} source={countImage} />
        <View style={styles.counter}>
          <CounterButton label="–" onPress={this.decrement} disabled={counterValue === 0} />
          <View style={styles.counterTextContainer}>
            <Text style={styles.counterText}>{counterValue}</Text>
          </View>
          <CounterButton label="+" onPress={this.increment} disabled={counterValue === 10} />
        </View>
        <Text style={styles.historyHeading}>History</Text>
        <FlatList
          data={history}
          renderItem={this.renderHistoryItem}
          keyExtractor={this.extractHistoryItemKey} />
      </View>
    );
}

  renderHistoryItem({item}) {
    return <CounterHistoryItem item={item} />;
  }
  extractHistoryItemKey(item) {
    return item.timestamp;
  }
}


//this would normally all go into a theme file

const colours = {
  primary: '#5a2961', //primary colour of our theme
  white: '#fff',
  midgrey: '#999' //NEVER HARD CODE COLOURS. ALWAYS USE VARIABLES
};

const fontsize = {
  huge: 32,
  medium: 20,
  small: 10,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,//this expands the container to fit the screen, but means you can't scroll. This means you can't see the end of the history section as it is now.
    backgroundColor: colours.white,
    alignItems: 'center',
    marginTop: fontsize.medium,
    // justifyContent: 'center',
  },
  title: {
    color: colours.primary,
    marginVertical: 18,
    fontSize: fontsize.huge,
    fontWeight: 'bold',
  },
  counter: {
    flexDirection: 'row',
    marginTop: 15,
    width: '100%',
    justifyContent: 'center',
  },
  counterButton: {
    backgroundColor: colours.primary,
    borderRadius: 10,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  counterButtonText: {
    fontSize: fontsize.huge,
    color: colours.white,
    textAlign: 'center',
  },
  counterText: {
    fontSize: fontsize.huge,
    marginHorizontal: 30,
    paddingVertical: 5,
    textAlign: 'center',
    width: 40,
  },
  resetButton: {
    backgroundColor: colours.primary,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center', 
    padding: 10,
    marginTop: 10,
  },
  resetButtonText: {
    color: colours.white,
    fontSize: fontsize.medium,
  },

  historyTitle: {
    fontSize: fontsize.medium, 
    fontWeight: 'bold',
    color: colours.primary,
    marginTop: 10,
    textAlign:'center',
  },
  historyContainer: {
    flex: 1,
    width:'100%',
  },
  historyItem: {
  width:'100%',
  textAlign:'center',
 }
});
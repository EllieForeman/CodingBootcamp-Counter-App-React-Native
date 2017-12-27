import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableHighlight, FlatList } from 'react-native';
import moment from 'moment'; // a JS library - helps us display dates better. You couldn't use a moment if the app interacted with the DOM

const countImage = require("./count.jpg");


const CounterHistoryItem = ({item}) => { //this is all the counterhistoryitem has access to/

const operationstr = (item.operation === 'increment'?  'incremented' : 'decremented');
const valueBefore = item.valueBefore;
const valueAfter = item.valueAfter;
const dateOfChange = moment(item.timestamp).calendar();
const text = '{operationstr} from {valueBefore} to {valueAfter} at {dateOfChange}'
 return <Text>{text}</Text>;
}

const CounterButton = ({label, onPress, style, textStyle, disabled}) => (
  <TouchableHighlight 
    style={style} 
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={textStyle}>{label}</Text>
  </TouchableHighlight>
);

export default class Counter extends React.Component {

  constructor(props) {
    super();

    this.decrement = this.decrement.bind(this); 
    this.increment = this.increment.bind(this);
  }

  decrement() {
    this.updateCounter('decrement');
  }

  increment() {
        this.updateCounter('increment');
  }

updateCounter(operation) {
    this.props.dispatch({
        type: 'updateCounter'
        
    });

  this.setState((currentState) => {
      const valueBefore = currentState.count;
      const valueAfter = (operation === 'increment') ? valueBefore + 1 : valueBefore - 1;

      const newHistory = [
        {
          timestamp: Date.now(),
          operation: 'increment',
          valueBefore: valueBefore,
          valueAfter: valueAfter,
       },
             ...currentState.history 
     ];

  return {
  counterValue: valueAfter,
  history: newHistory
  }
 });
}

  render() {
    const { count } = this.props;
    const isDecrementDisabled = !count;
    const isIncrementDisabled = count === 10;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Count von Count</Text>
        <Image source={countImage} />
        <View style={styles.counter}>
          <CounterButton 
            style={[
              styles.counterButton, 
              isDecrementDisabled ? styles.disabledButton : null,
            ]} 
            textStyle={styles.counterButtonText} 
            label="-" 
            onPress={this.decrement}
            disabled={isDecrementDisabled}
          />  
          
          <Text style={styles.counterText}>{this.props.count}</Text>
        
          <CounterButton 
            style={[
              styles.counterButton, 
              isIncrementDisabled ? styles.disabledButton : null,
            ]} 
            textStyle={styles.counterButtonText} 
            label="+" 
            onPress={this.increment} 
            disabled={isIncrementDisabled}
          />  
        </View>
        <CounterButton 
          style={[
            styles.resetButton, 
            isDecrementDisabled ? styles.disabledButton : null,
          ]}  
          textStyle={styles.resetButtonText} 
          label="Reset" 
          onPress={this.reset} 
          disabled={isDecrementDisabled}
        />  

        <View style={styles.historyContainer}>
            <Text style ={styles.historyTitle}>History</Text>
    

        <FlatList //ScrollView instead of view so the items don't disappear off the end of the screen . problem is on scroll, al are always rendered, this slows doewn the app. Sau of there were 10,000 itms in a list, it would render them all.
          data={this.props.history}
          renderItem={this.renderHistoryItem} 
          keyExtractor = {this.extractHistoryItemKey} />
        </View>
      </View>
    );
  }
  
  renderHistoryItem({item}) {
    return <counterHistoryItem item = {item} />
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
    width:'100%',//they can scroll but within fixed container
  },
  historyItem: {
  width:'100%',
  textAlign:'center',
 }
});
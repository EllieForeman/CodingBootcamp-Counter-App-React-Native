import React from 'react';
import { connect, Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { actionCreators, store, persistor } from './store';
import Counter from './Counter';
import Loading from './Loading';

const mapStateToProps = state => ({
  counterValue: state.amount,
  history: state.history
});

const mapDispatchToProps = dispatch => ({
  updateCounter: operation =>
    dispatch(actionCreators.updateCounter(operation))
});

const CounterWithState = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter);

const App = () => (
  <PersistGate persistor={persistor} loading={<Loading />}>
    <Provider store={store}>
      <CounterWithState />
    </Provider>
  </PersistGate>
);

export default App;
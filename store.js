import { createStore } from 'redux';
import { AsyncStorage } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';


const types = {
  UPDATE_COUNTER: 'Update Counter'
};


const actionCreators = {
  updateCounter: operation => ({
    type: types.UPDATE_COUNTER,
    payload: operation
  })
};

const initialState = {
  amount: 0,
  history: []
};


function reducer(state = initialState, action) {
  switch(action.type) {
    case types.UPDATE_COUNTER: {

      const operation = action.payload;
      const amountBefore = state.amount;
      const amountAfter = operation === 'increment' ?
        state.amount + 1 :
        state.amount - 1;

      return {
        amount: amountAfter,

        history: [
          {
            timestamp: Date.now(),
            operation,
            before: amountBefore,
            after: amountAfter
          },
          ...state.history
        ]
      };
    }

    default:
      return state;
  }
}

const persistConfig = {
  key: 'counter',
  storage: AsyncStorage
};

const store = createStore(
  persistReducer(persistConfig, reducer)
);

const persistor = persistStore(store);

export {
  store,
  persistor,
  actionCreators
}

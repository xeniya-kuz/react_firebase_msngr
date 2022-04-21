import { RoutesComponent } from './components/Routes/Routes'
import { Provider } from "react-redux"
import { store, persistor } from './store';
import './App.sass';
import { PersistGate } from 'redux-persist/integration/react';
import { CircularProgress } from '@material-ui/core';
import './fontawesome';


function App() {

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={<CircularProgress />}>
        <RoutesComponent />
      </PersistGate>
    </Provider>
  )
}

export default App;

import logo from './logo.svg';
import './App.css';
import { Title } from './Components/UX/Title';
import Page from './Components/UX/Page/Page';
import Splash from './Components/Views/Splash';
import { Provider } from 'react-redux';
import store from './Store';
import SigninPage from './Components/Views/Signin/SigninPage';
import TodoPage from './Components/Views/Todo/TodoPage';
import LoginPage from './Components/Views/Login/LoginPage';


function App() {
  return (
    <Provider store={store}>
      
      <LoginPage></LoginPage>
    </Provider>
  );
}

export default App;

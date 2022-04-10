import { useState } from 'react';
import './_reset.scss';
import './App.scss';
import { RequestStats, Button, RegistrationModal } from './components';
import { useSelector } from 'react-redux';

function App() {
  const requestState = useSelector(({ requestReducer }) => requestReducer);
  const [registrationModalVisibility, setRegistrationModalVisibility] = useState(false);

  const [globalId, setGlobalId] = useState(1);
  const incrementGlobaldId = () => {
    setGlobalId((prev) => prev + 1);
  };

  return (
    <div className="App">
      <div className="header">
        <Button
          active={true}
          color={'red'}
          text={'Добавить заказ'}
          onClick={() => {
            setRegistrationModalVisibility(true);
            console.log('asd');
          }}></Button>
      </div>
      <div className="body">
        {requestState &&
          requestState.map((request) => <RequestStats key={request.id} currentRequest={request} />)}
      </div>
      <RegistrationModal
        globalId={globalId}
        incrementGlobaldId={incrementGlobaldId}
        setRegistrationModalVisibility={setRegistrationModalVisibility}
        // ? 1 : 0 это костыль, т.к. иначе styled-components выдает ошибку "received false for a non-boolean attribute". Хотя
        // ничего не крашится и все работает одинаково что так, что так, решил ее убрать. Вероятно, проблема в типизации
        // самого styled-components, потому что когда я работал с TS и указывал типы для пропсов в компоненте стилей
        // такого никогда не вылетало
        visibility={registrationModalVisibility ? 1 : 0}
      />
    </div>
  );
}

export default App;

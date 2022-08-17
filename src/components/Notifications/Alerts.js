import Alert from 'react-bootstrap/Alert';
import { useNotificationContext } from '../../contexts/NotificationsContext';

import '../Home/Home.css';


function Alerts() {
  const { alert, hideAlert} = useNotificationContext();

  if(!alert.show) {
    return null;
  }
  function closeAlert() {
    hideAlert()
  }

  return (

        <Alert className='alert-container' onClose={() => closeAlert()} dismissible={true} variant={alert.type}>
          {alert.message}
        </Alert>
  );
}

export default Alerts;
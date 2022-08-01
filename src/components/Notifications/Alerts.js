import Alert from 'react-bootstrap/Alert';
import { useNotificationContext } from '../../contexts/NotificationsContext';


function Alerts() {
  const { alert, hideAlert} = useNotificationContext();

  if(!alert.show) {
    return null;
  }
  function closeAlert() {
    hideAlert()
  }

  return (

        <Alert onClose={() => closeAlert()} dismissible={true} variant={alert.type}>
          {alert.message}
        </Alert>
  );
}

export default Alerts;
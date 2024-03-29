import Toast from 'react-bootstrap/Toast';

import { useNotificationContext } from '../../contexts/NotificationsContext';
import '../Home/Home.css';


function Toasts() {

  const { toast, hideToast} = useNotificationContext();

  if(!toast.show) {
    return null;
  }
  function closeToast() {
    hideToast();
  }

  return (
      <Toast
          className="d-inline-block m-1"
          bg={toast.type}
          onClose={() => closeToast()}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Notification</strong>
          </Toast.Header>
          <Toast.Body >
            {toast.message}
          </Toast.Body>
        </Toast>
  );
}

export default Toasts;
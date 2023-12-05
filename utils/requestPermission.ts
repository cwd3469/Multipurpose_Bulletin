import { getCookie, setCookie } from 'cookies-next';

function requestPermission() {
  Notification.requestPermission().then((permission) => {
    if (permission === 'granted') {
      setCookie('isNotication', 'on');
    } else {
      setCookie('isNotication', 'off');
    }
  });
}

export { requestPermission };

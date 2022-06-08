import React from 'react';
import axios from 'axios';

const _Events = () => {
  const [message, setMessage] = React.useState([]);

  const loadMessage = async () => {
    try {
      const res = await axios
        .get('http://localhost:5001/events', {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    loadMessage();
  }, []);

  // console.log(message);
  return <div></div>;
};

export default _Events;

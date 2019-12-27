import _ from 'lodash';

const message = {};
const messageMap = new Map();

window.addEventListener('message', (event) => {
  const {data} = event;
  if (data && data.uniqueId && messageMap.has(data.uniqueId)) {
    const curMessage = messageMap.get(data.uniqueId);
    curMessage.resolve(data);
  }
}, false)

message.emit = (handler, data = {}) => {
  data.uniqueId = _.uniqueId('message_');
  data.handler = handler;
  console.log(data);
  console.log('*********')
  return new Promise((resolve, reject) => {
    window.parent.postMessage(data, '*');
    messageMap.set(data.uniqueId, {
      resolve,
      reject
    })
  });
}

export default message;
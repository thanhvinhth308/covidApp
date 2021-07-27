import { Modal } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalActions } from '../../../redux/rootAction';

function MessageModal(props) {
  const dispatch = useDispatch();
  const visible = useSelector((state) => state.GlobalReducer.isErrorHandler);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState('Get Data failed,please try again');

  const handleOk = () => {
    setModalText('Please wait a minutes');
    setConfirmLoading(true);
    setTimeout(() => {
      dispatch(GlobalActions.toggleErrorHandler(false));
      setConfirmLoading(false);
    }, 1000);
  };
  const handleCancel = () => {
    dispatch(GlobalActions.toggleErrorHandler(false));
  };

  return (
    <>
      <Modal
        title="Notification"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>
    </>
  );
}

export default MessageModal;

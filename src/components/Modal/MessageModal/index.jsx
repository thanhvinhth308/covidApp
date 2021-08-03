import { Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { GlobalActions } from '../../../redux/rootAction';

function MessageModal(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const visible = useSelector((state) => state.GlobalReducer.isErrorHandler);
  const [confirmLoading, setConfirmLoading] = React.useState(false);

  const handleOk = () => {
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
        <p>{t('modal.failMessage.inform')}</p>
      </Modal>
    </>
  );
}

export default MessageModal;

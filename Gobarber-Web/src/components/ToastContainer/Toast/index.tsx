import React, { useCallback, useEffect } from 'react';
import { FiAlertCircle, FiCheck, FiInfo, FiXCircle } from 'react-icons/fi';
import { Container } from './styles';
import { useToast, ToastMessage } from '../../../hooks/toastContext';

interface ToastProp {
  toast: ToastMessage;
  style: Record<string, unknown>;
}

const Toast: React.FC<ToastProp> = ({ toast, style }) => {
  const { removeToat } = useToast();
  const handleRemoveToast = useCallback(
    (id: string) => {
      removeToat(id);
    },
    [removeToat],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToat(toast.id);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [removeToat, toast.id]);

  const icons = {
    error: <FiAlertCircle size={20} />,
    info: <FiInfo size={20} />,
    sucess: <FiCheck size={20} />,
  };

  return (
    <Container
      style={style}
      type={toast.type}
      hasDescription={!!toast.description}
    >
      {icons[toast.type || 'info']}
      <div>
        <strong> {toast.title}</strong>
        {toast.description && <p>{toast.description}</p>}
      </div>
      <button onClick={() => handleRemoveToast(toast.id)} type="button">
        <FiXCircle size={20} />
      </button>
    </Container>
  );
};

export default Toast;

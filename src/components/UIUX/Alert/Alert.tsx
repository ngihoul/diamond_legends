type AlertProps = {
  type: 'success' | 'error' | 'info';
  children: React.ReactNode;
};

import './Alert.css';

export default function Alert({ type, children }: AlertProps) {
  return (
    <div className={`alert alert-${type}`}>
      <p className='alert-message'>{children}</p>
    </div>
  );
}

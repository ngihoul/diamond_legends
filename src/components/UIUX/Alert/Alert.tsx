type AlertProps = {
  type: 'success' | 'error' | 'warning' | 'info';
  children: React.ReactNode;
};

export default function Alert({ type, children }: AlertProps) {
  return <div className={`alert alert-${type}`}>{children}</div>;
}

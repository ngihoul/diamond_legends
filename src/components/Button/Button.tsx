import './Button.css';

export interface ButtonProps {
  className?: string;
  action: () => void;
  children: React.ReactNode;
}

export default function Button({ className, action, children }: ButtonProps) {
  return (
    <button className={className} onClick={action}>
      {children}
    </button>
  );
};

'use client';

import { useToaster } from '@/lib/contexts/toasterContext';
import './Toaster.css';

export default function Toaster() {
    const { toast, hideToast

     } = useToaster();

    if(!toast) {
        return null;
    }

    return (
        <div className="toast-container">
            <div className={`toast toast-${toast.type}`}>
                {toast.message}
                <button onClick={() => hideToast()} className="close-btn">
                ×
                </button>
            </div>
        </div>
        
    )
}
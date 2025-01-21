'use client'; 

import { useAuth } from "@/lib/contexts/authContext";
import { useToaster } from "@/lib/contexts/toasterContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOut() {
    const { logout } = useAuth();
    const { showToast } = useToaster();
    const router = useRouter();
    
    useEffect(() => {
        logout();
        showToast("Deconnexion réussie", 'success');
        router.push('/');
    }, []);
}
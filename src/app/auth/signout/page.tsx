'use client'; 

import { useAuth } from "@/lib/contexts/authContext";
import { useToaster } from "@/lib/contexts/toasterContext";
import { redirect } from "next/navigation";

export default function SignOut() {
    const { logout } = useAuth();
    const { showToast } = useToaster();

    logout();
    showToast("Deconnexion réussie", 'success');
    redirect('/');
}
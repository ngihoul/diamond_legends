'use server'
 

// Si possibilité d'utiliser les session, à priviligier
import { cookies } from 'next/headers'

export async function saveToken(token : string) {
    const cookieStore = await cookies();
      
    cookieStore.set({
        name: 'token',
        value: token,
        httpOnly: true,
        secure: true,
        path: '/'
    });
}

export async function getToken() : Promise<string | undefined> {
    const cookieStore = await cookies();
    return cookieStore.get('token')?.value;
}

export async function clearToken(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('token');
}
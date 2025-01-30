

I'll provide a comprehensive solution that shows how to implement toast notifications across server and client components:

1. First, let's create a toast provider using shadcn/ui:

```tsx project="Toast Example" file="components/ui/toast-provider.tsx" type="react"
'use client'

import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/components/ui/use-toast"
import { useEffect } from "react"

export function ToastProvider({ 
  message, 
  type = 'default' 
}: { 
  message?: string, 
  type?: 'default' | 'destructive' | 'success' 
}) {
  const { toast } = useToast()

  useEffect(() => {
    if (message) {
      toast({
        description: message,
        variant: type === 'destructive' ? 'destructive' : 
                 type === 'success' ? 'success' : 'default'
      })
    }
  }, [message, type, toast])

  return <Toaster />
}
```

2. Create a server action to trigger the toast:

```tsx project="Toast Example" file="actions/toast-action.ts" type="react"
'use server'

export async function triggerToast(message: string) {
  return message
}
```

3. Create a page that demonstrates server-side toast triggering:

```tsx project="Toast Example" file="app/page.tsx" type="react"
import { ToastProvider } from '@/components/ui/toast-provider'
import { triggerToast } from '@/actions/toast-action'
import { Button } from '@/components/ui/button'

export default async function ToastPage() {
  const serverMessage = await triggerToast("Hello from server component!")

  return (
    <div className="p-4">
      <ToastProvider message={serverMessage} type="success" />
      <h1>Server Component Toast Example</h1>
    </div>
  )
}
```

4. Ensure you have the shadcn/ui toast components:

```tsx project="Toast Example" file="components/ui/toaster.tsx" type="react"
'use client'

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
```

```tsx project="Toast Example" file="components/ui/use-toast.ts" type="react"
import * as React from "react"

type ToastActionElement = React.ReactElement<
  typeof ToastAction
>

type ToastProps = {
  id?: string
  title?: string
  description?: string
  action?: ToastActionElement
  variant?: 'default' | 'destructive' | 'success'
}

const TOAST_LIMIT = 3
const TOAST_REMOVE_DELAY = 1000000

type State = {
  toasts: ToastProps[]
}

const initialState: State = { toasts: [] }

export function useToast() {
  const [state, setState] = React.useState<State>(initialState)

  const toast = React.useCallback(
    (props: ToastProps) => {
      const id = props.id || generateId()

      const update = props.id
        ? state.toasts.map((t) =>
            t.id === props.id ? { ...t, ...props } : t
          )
        : [...state.toasts, { ...props, id }]

      setState({
        toasts: update.slice(0, TOAST_LIMIT),
      })
    },
    [state.toasts]
  )

  const dismiss = React.useCallback((toastId?: string) => {
    setState((prev) => ({
      toasts: prev.toasts.filter((t) => t.id !== toastId),
    }))
  }, [])

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setState((prev) => ({
        toasts: prev.toasts.slice(0, -1),
      }))
    }, TOAST_REMOVE_DELAY)

    return () => clearTimeout(timer)
  }, [state.toasts])

  return {
    ...state,
    toast,
    dismiss,
  }
}

function generateId() {
  return Math.random().toString(36).substring(2, 
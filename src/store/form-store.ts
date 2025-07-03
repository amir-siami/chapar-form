import { create } from 'zustand'

export type FormData = {
    fullName: string
    email: string
    phone: string
    birthday: string
    skills: string[]
}

const initialData: FormData = {
    fullName: '',
    email: '',
    phone: '',
    birthday: '',
    skills: [],
}

type FormState = {
    step: number
    data: FormData
    setStep: (step: number) => void
    updateData: (newData: Partial<FormData>) => void
    reset: () => void
    resetData: () => void
}

export const useFormStore = create<FormState>((set) => ({
    step: 1,
    data: initialData,
    setStep: (step) => set({ step }),
    updateData: (newData) =>
        set((state) => ({ data: { ...state.data, ...newData } })),
    reset: () =>
        set({
            step: 1,
            data: initialData,
        }),
    resetData: () =>
        set({
            data: initialData,
        }),
}))

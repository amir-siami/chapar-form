import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export const isAtLeast18 = (dateStr: string): boolean => {
    const dob = new Date(dateStr)
    const now = new Date()
    const age = now.getFullYear() - dob.getFullYear()
    const m = now.getMonth() - dob.getMonth()
    const d = now.getDate() - dob.getDate()
    return age > 18 || (age === 18 && (m > 0 || (m === 0 && d >= 0)))
}
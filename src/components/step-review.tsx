import { useState } from "react"
import axios from "axios"
import { useFormStore } from "../store/form-store.ts"
import { Button } from "./ui/button/button.tsx"

interface ApiErrorResponse {
    errors: Record<string, string[]>
}

export const StepReview = () => {
    const { data, setStep, resetData } = useFormStore()
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async () => {
        setError(null)
        setLoading(true)

        const payload = {
            full_name: data.fullName,
            email: data.email,
            phone: data.phone,
            birthday: data.birthday,
            skills: data.skills,
        }

        try {
            const res = await axios.post(
                "https://task.chapar.co/api/volunteers",
                payload
            )

            if (res.status === 201) {
                setSuccess(true)
                resetData()
            } else {
                setError("Unexpected response. Please try again.")
            }
        } catch (err: unknown) {
            if (
                axios.isAxiosError(err) &&
                err.response?.status === 422 &&
                err.response.data
            ) {
                const apiErr = err.response.data as ApiErrorResponse
                const firstKey = Object.keys(apiErr.errors)[0]
                const firstError = apiErr.errors[firstKey][0]
                setError(firstError)
            } else {
                setError("Submission failed. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="text-center space-y-4 max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-green-600">
                    🎉 Submission successful!
                </h2>
                <p>Thank you for submitting your information.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <h2 className="text-lg font-semibold">Review Your Information</h2>

            <div className="border p-4 rounded space-y-2 text-sm">
                <p>
                    <strong>Full Name:</strong> {data.fullName}
                </p>
                <p>
                    <strong>Email:</strong> {data.email || "-"}
                </p>
                <p>
                    <strong>Phone:</strong> {data.phone || "-"}
                </p>
                <p>
                    <strong>Birthday:</strong> {data.birthday}
                </p>
                <p>
                    <strong>Skills:</strong> {data.skills.join(", ")}
                </p>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div className="flex justify-between pt-4">
                <Button type="button" onClick={() => setStep(2)}>
                    Back
                </Button>
                <Button type="button" onClick={handleSubmit} disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </Button>
            </div>
        </div>
    )
}

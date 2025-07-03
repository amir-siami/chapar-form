import {useFormStore} from "../../store/form-store.ts";
import {cn} from "../../lib/utils.ts";


const steps = [
    { id: 1, label: "Personal Info" },
    { id: 2, label: "Skills" },
    { id: 3, label: "Review" },
]

export const Stepper = () => {
    const { step } = useFormStore()

    return (
        <div className="flex items-center justify-center gap-4 py-6">
            {steps.map((s, i) => {
                const isActive = step === s.id
                const isCompleted = step > s.id

                return (
                    <div key={s.id} className="flex items-center gap-2">
                        <div
                            className={cn(
                                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium transition-all",
                                isCompleted
                                    ? "border-green-500 bg-green-500 text-white"
                                    : isActive
                                        ? "border-blue-600 text-blue-600"
                                        : "border-gray-300 text-gray-400"
                            )}
                        >
                            {isCompleted ? "✓" : s.id}
                        </div>

                        <div className="text-sm text-gray-600">{s.label}</div>

                        {i !== steps.length - 1 && (
                            <div className="h-px w-8 bg-gray-300" />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

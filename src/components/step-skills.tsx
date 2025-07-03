import { useState } from "react"
import {useFormStore} from "../store/form-store.ts";
import {Label} from "./ui/label.tsx";
import {Input} from "./ui/input.tsx";
import {Button} from "./ui/button/button.tsx";

export const StepSkills = () => {
    const { data, updateData, setStep } = useFormStore()
    const [skillInput, setSkillInput] = useState("")
    const [skills, setSkills] = useState<string[]>(data.skills || [])
    const [error, setError] = useState<string | null>(null)

    const addSkill = () => {
        const trimmed = skillInput.trim()
        if (!trimmed) return
        if (skills.includes(trimmed)) {
            setError("Skill already added")
            return
        }
        setSkills((prev) => [...prev, trimmed])
        setSkillInput("")
        setError(null)
    }

    const removeSkill = (index: number) => {
        const newSkills = [...skills]
        newSkills.splice(index, 1)
        setSkills(newSkills)
    }

    const handleNext = () => {
        if (skills.length === 0) {
            setError("Please add at least one skill before proceeding")
            return
        }
        updateData({ skills })
        setStep(3)
    }

    const handleBack = () => {
        updateData({ skills })
        setStep(1)
    }

    return (
        <div className="space-y-6 max-w-md mx-auto">
            <div>
                <Label htmlFor="skill">Add a Skill</Label>
                <div className="flex gap-2">
                    <Input
                        id="skill"
                        value={skillInput}
                        onChange={(e) => setSkillInput(e.target.value)}
                        placeholder="e.g. JavaScript"
                    />
                    <Button type="button" onClick={addSkill}>
                        Add
                    </Button>
                </div>
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>

            <ul className="list-disc pl-5 space-y-1">
                {skills.map((skill, index) => (
                    <li key={index} className="flex justify-between items-center">
                        <span>{skill}</span>
                        <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="text-red-600 text-sm"
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            <div className="flex justify-between pt-4">
                <Button type="button" onClick={handleBack}>
                    Back
                </Button>
                <Button type="button" onClick={handleNext}>
                    Next
                </Button>
            </div>
        </div>
    )
}

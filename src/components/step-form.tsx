import { useEffect } from "react"
import {type Resolver, useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {useFormStore} from "../store/form-store.ts";
import {personalInfoSchema, type TPersonalInfoForm} from "../lib/validations.ts";
import {Label} from "./ui/label.tsx";
import {Input} from "./ui/input.tsx";
import {Button} from "./ui/button/button.tsx";


export const StepForm = () => {
    const { data, updateData, setStep } = useFormStore()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<TPersonalInfoForm>({
        resolver: zodResolver(personalInfoSchema) as Resolver<TPersonalInfoForm>,
        defaultValues: {
            ...data,
            email: data.email || "",
            phone: data.phone || "",
        },
    })

    useEffect(() => {
        setValue("fullName", data.fullName)
        setValue("email", data.email)
        setValue("phone", data.phone)
        setValue("birthday", data.birthday)
    }, [data, setValue])

    const onSubmit = (formData: TPersonalInfoForm) => {
        updateData({
            fullName:    formData.fullName,
            email:       formData.email || "",
            phone:       formData.phone || "",
            birthday:    formData.birthday,
        })
        setStep(2)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md mx-auto">
            <div className="space-y-1">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" {...register("fullName")} error={errors.fullName?.message} />
            </div>

            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    error={errors.email?.message}
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="phone">Phone</Label>
                <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    error={errors.phone?.message}
                />
            </div>

            <div className="space-y-1">
                <Label htmlFor="birthday">Birthday</Label>
                <Input
                    id="birthday"
                    type="date"
                    {...register("birthday")}
                    error={errors.birthday?.message}
                />
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit">Next</Button>
            </div>
        </form>
    )
}

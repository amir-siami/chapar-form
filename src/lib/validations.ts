import { z } from "zod"
import { isAtLeast18 } from "./utils"

const emptyToUndefined = (val: unknown) => (val === "" ? undefined : val)

export const personalInfoSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(3, { message: "Full name must be at least 3 characters" })
        .max(100),

    email: z
        .preprocess(emptyToUndefined, z.string().trim().email({ message: "Invalid email address" }).max(100))
        .optional(),

    phone: z
        .preprocess(emptyToUndefined, z.string()
            .trim()
            .regex(/^\d+$/, { message: "Phone must contain only digits" })
            .min(10, { message: "Phone must be at least 10 digits" })
            .max(15, { message: "Phone must be at most 15 digits" }))
        .optional(),

    birthday: z
        .string()
        .trim()
        .refine((val) => isAtLeast18(val), {
            message: "You must be at least 18 years old",
        }),
})
    .superRefine((data, ctx) => {
        if (!data.email && !data.phone) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please provide either an email address or phone number",
                path: ["email"],
            })
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Please provide either an email address or phone number",
                path: ["phone"],
            })
        }
    })

export type TPersonalInfoForm = z.infer<typeof personalInfoSchema>

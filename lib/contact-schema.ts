import { z } from 'zod'

export const ContactSchema = z.object({
  name: z.string().trim().min(2, 'Ime mora imati najmanje 2 znaka').max(80, 'Ime je predugačko'),
  email: z.string().trim().email('Neispravna email adresa').max(120, 'Email je predugačak'),
  message: z
    .string()
    .trim()
    .min(10, 'Poruka mora imati najmanje 10 znakova')
    .max(2000, 'Poruka je predugačka'),
})

export type ContactInput = z.infer<typeof ContactSchema>

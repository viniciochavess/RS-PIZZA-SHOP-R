import { api } from "@/utils/axios"


export interface SignInBody {
  email: string
}

export async function signIn({ email }: SignInBody) {
  await api.post('/authenticate', { email },{headers:{getAuthorization: true}}
  )
}
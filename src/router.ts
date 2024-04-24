import { initTRPC } from '@trpc/server';
const t = initTRPC.create();
import { z } from 'zod';
import {extendZodWithSwift} from "trpc-swift";
import { createClient } from '@typeform/api-client'

extendZodWithSwift(z)
const router = t.router;
const publicProcedure = t.procedure;

const helloRequest = z.object({name:z.string()}).swift({name:"HelloRequest"})
const helloResponse = z.object({hello:z.string()}).swift({name:"HelloResponse"})
const onboardingStatusRequest = z.object({
    email:z.string(),
    home_id:z.string(),
    assessment_id:z.string()
}).swift({name:"OnboardingStatusRequest"})
const onboardingStatusResponse = z.object({form1:z.enum(["complete","incomplete"])})
const typeformToken = process.env["TYPEFORM_API_KEY"]
const typeformAPI = createClient({ token: typeformToken})

export const appRouter = router({
    hello: publicProcedure
        .input(helloRequest)
        .output(helloResponse)
        .query(async ({ctx,input:{name}})=> {
            console.log(`got request: ${name}`)
            return ({hello:`hello ${name}`})
        }),
    onboarding: router({
        status: publicProcedure
            .input(onboardingStatusRequest)
            .output(onboardingStatusResponse)
            .query( async ({ctx,input:{email,home_id,assessment_id}}) => {
                //TODO validate home/email/assessments all match and match token
                console.log(`about to make typeform request with token`)
                const responses = await typeformAPI.responses.list({uid:"nUGifo6N",query:assessment_id})
                const response = responses.items.find(o=>(o.hidden||{})["assessment_id"]==assessment_id)
                return {form1:response&&response.answers ? "complete" : "incomplete"}
            })
    })
});
export type AppRouter = typeof appRouter

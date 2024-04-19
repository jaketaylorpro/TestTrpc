import { initTRPC } from '@trpc/server';
const t = initTRPC.create();
import { z } from 'zod';
import {extendZodWithSwift} from "trpc-swift";

extendZodWithSwift(z)
const router = t.router;
const publicProcedure = t.procedure;

const helloRequest = z.object({name:z.string()}).swift({name:"HelloRequest"})
const helloResponse = z.object({hello:z.string()}).swift({name:"HelloResponse"})
export const appRouter = router({
    hello: publicProcedure.input(helloRequest)
        .output(helloResponse)
        .query(async ({ctx,input:{name}})=> {
            console.log(`got request: ${name}`)
            return ({hello:`hello ${name}`})
        })
});
export type AppRouter = typeof appRouter

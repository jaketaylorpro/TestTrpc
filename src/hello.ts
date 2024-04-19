// import { createTRPCClient, httpBatchLink } from '@trpc/client';
// import type { AppRouter } from './router.js';
//
// const trpc = createTRPCClient<AppRouter>({
//     links: [
//         httpBatchLink({
//             url: 'http://localhost:3000',
//         }),
//     ],
// });
//
// const response = await trpc.hello.query('jake')
// console.log(response.hello)

import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './router.js';

//     👆 **type-only** import

// Pass AppRouter as generic here. 👇 This lets the `trpc` object know
// what procedures are available on the server and their input/output types.
const trpc = createTRPCProxyClient<AppRouter>({
    links: [
        httpBatchLink({
            url: 'http://localhost:3000',
        }),
    ],
});
trpc.hello.query({name:"jake"})
import {createHTTPServer} from "@trpc/server/adapters/standalone";
import {appRouter} from "./router.js";

const server = createHTTPServer({
    router: appRouter,
    onError: ({ctx,error,req,path,input}) => {
        console.log(`error: ${error.message}, path: ${req.url} / ${path} ${input}`);
    }
});

server.listen(3000);
to run
`npm start`
in antoher tab to test
`npm run hello`

to test the swift translation of router:
```node ./dist/cli.js -r appRouter -i ../TestTrpc/dist/router.js -o ../TestTrpc/gen/swift/appRouter.swift```
then to copy to xcode
```cp ../TestTrpc/gen/swift/appRouter.swift ../../XcodeProjects/TestApp/TestApp/Trpc.swift```
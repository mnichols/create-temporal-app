import {register} from 'node:module'
import {pathToFileURL} from 'node:url'

register('ts-node/esm', pathToFileURL('./'))

/*
this lets you do this:
```
node --import ./ts-loader my-script.ts
```
 */
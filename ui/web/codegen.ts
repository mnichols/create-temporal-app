import type {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: ['../../graphql/diag.graphql', '../../graphql/app.graphql'],
    documents: ['src/**/*.svelte', 'src/lib/operations/**/*.graphql'],
    ignoreNoDocuments: true,
    generates: {
        './src/gql/index.ts': {
            plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
            config: {
                useTypeImports: true,
            }
        }
    },
}
export default config

import type {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: '../../graphql/schema.graphql',
    documents: ['src/**/*.svelte', 'src/lib/operations/**/*.graphql'],
    ignoreNoDocuments: true,
    generates: {
        './src/gql/index.ts': {
            plugins: ['typescript', 'typescript-operations', 'typed-document-node', 'graphql-codegen-svelte-apollo'],
            config: {
                useTypeImports: true,
                clientPath: '$lib/http/apollo-client',
            }
        }
    },
}
export default config

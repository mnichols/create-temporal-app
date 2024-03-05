import type {CodegenConfig} from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: '../../graphql/schema.graphql',
    // documents: ['src/**/*.svelte', 'src/lib/operations/**/*.graphql'],
    ignoreNoDocuments: true,
    generates: {
        './generated.ts': {
            plugins: ['typescript', 'typescript-operations', 'typed-document-node'],
            config: {
                useTypeImports: true,
            }
        }
    },
}
export default config

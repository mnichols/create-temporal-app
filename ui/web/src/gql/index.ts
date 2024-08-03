import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Time: { input: any; output: any; }
};

export type AppInfo = {
  __typename?: 'AppInfo';
  name: Scalars['String']['output'];
  temporal: TemporalConnection;
};

export type BeginRequest = {
  value: Scalars['String']['input'];
};

export type BeginResponse = {
  __typename?: 'BeginResponse';
  value: Scalars['String']['output'];
};

export type CompensateRequest = {
  value: Scalars['String']['input'];
};

export type CompensateResponse = {
  __typename?: 'CompensateResponse';
  value: Scalars['String']['output'];
};

export type CurrentWorkflowState = {
  __typename?: 'CurrentWorkflowState';
  applicationMutation1?: Maybe<MutateApplicationResponse>;
  applicationMutation2?: Maybe<MutateApplicationResponse>;
  beginning?: Maybe<BeginResponse>;
  compensation?: Maybe<CompensateResponse>;
  finalizable?: Maybe<Scalars['String']['output']>;
  finalization?: Maybe<FinalizeResponse>;
  reply?: Maybe<ReplyResponse>;
  validation?: Maybe<ValidateResponse>;
  value: Scalars['String']['output'];
  workflowId: Scalars['String']['output'];
};

export type DoPingInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ExecuteWorkflowRequest = {
  reply?: InputMaybe<ReplyRequest>;
  value: Scalars['String']['input'];
  workflowId: Scalars['String']['input'];
};

export type FinalizeRequest = {
  value: Scalars['String']['input'];
  workflowId: Scalars['String']['input'];
};

export type FinalizeResponse = {
  __typename?: 'FinalizeResponse';
  value: Scalars['String']['output'];
  workflowId: Scalars['String']['output'];
};

export type MarkFinalizableRequest = {
  value: Scalars['String']['input'];
};

export type MutateApplicationRequest = {
  value: Scalars['String']['input'];
};

export type MutateApplicationResponse = {
  __typename?: 'MutateApplicationResponse';
  value: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  doPing?: Maybe<Pong>;
  executeWorkflow: ReplyResponse;
  markFinalizable: FinalizeResponse;
};


export type MutationDoPingArgs = {
  input?: InputMaybe<DoPingInput>;
};


export type MutationExecuteWorkflowArgs = {
  input: ExecuteWorkflowRequest;
};


export type MutationMarkFinalizableArgs = {
  input: MarkFinalizableRequest;
};

export type PingInput = {
  timestamp?: InputMaybe<Scalars['Time']['input']>;
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Pong = {
  __typename?: 'Pong';
  timestamp?: Maybe<Scalars['Time']['output']>;
  value?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  appInfo: AppInfo;
  ping?: Maybe<Pong>;
  pong?: Maybe<Pong>;
  queryWorkflow: CurrentWorkflowState;
};


export type QueryPingArgs = {
  input?: InputMaybe<PingInput>;
};


export type QueryPongArgs = {
  input?: InputMaybe<PingInput>;
};


export type QueryQueryWorkflowArgs = {
  input?: InputMaybe<QueryRequest>;
};

export type QueryRequest = {
  value?: InputMaybe<Scalars['String']['input']>;
  workflowId: Scalars['String']['input'];
};

export type QueryResponse = {
  __typename?: 'QueryResponse';
  value: Scalars['String']['output'];
  workflowId: Scalars['String']['output'];
};

export type ReplyRequest = {
  activityName: Scalars['String']['input'];
  taskQueue: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ReplyResponse = {
  __typename?: 'ReplyResponse';
  id: Scalars['String']['output'];
  value: Scalars['String']['output'];
  workflowId: Scalars['String']['output'];
};

export type SubPingInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  subPing?: Maybe<Pong>;
};


export type SubscriptionSubPingArgs = {
  input?: InputMaybe<SubPingInput>;
};

export type TemporalConnection = {
  __typename?: 'TemporalConnection';
  namespace: Scalars['String']['output'];
  taskQueue?: Maybe<Scalars['String']['output']>;
};

export type ValidateRequest = {
  value: Scalars['String']['input'];
};

export type ValidateResponse = {
  __typename?: 'ValidateResponse';
  value: Scalars['String']['output'];
};

export type ExecuteWorkflowMutationVariables = Exact<{
  input: ExecuteWorkflowRequest;
}>;


export type ExecuteWorkflowMutation = { __typename?: 'Mutation', executeWorkflow: { __typename?: 'ReplyResponse', workflowId: string, value: string } };

export type MarkFinalizableMutationVariables = Exact<{
  input: MarkFinalizableRequest;
}>;


export type MarkFinalizableMutation = { __typename?: 'Mutation', markFinalizable: { __typename?: 'FinalizeResponse', workflowId: string } };

export type AppInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type AppInfoQuery = { __typename?: 'Query', appInfo: { __typename?: 'AppInfo', name: string, temporal: { __typename?: 'TemporalConnection', namespace: string, taskQueue?: string | null } } };

export type PingTestQueryVariables = Exact<{
  input?: InputMaybe<PingInput>;
}>;


export type PingTestQuery = { __typename?: 'Query', ping?: { __typename?: 'Pong', value?: string | null, timestamp?: any | null } | null };

export type SveltePingTestQueryVariables = Exact<{
  input?: InputMaybe<PingInput>;
}>;


export type SveltePingTestQuery = { __typename?: 'Query', ping?: { __typename?: 'Pong', value?: string | null, timestamp?: any | null } | null };

export type QueryWorkflowQueryVariables = Exact<{
  input?: InputMaybe<QueryRequest>;
}>;


export type QueryWorkflowQuery = { __typename?: 'Query', queryWorkflow: { __typename?: 'CurrentWorkflowState', workflowId: string, value: string, finalizable?: string | null, validation?: { __typename?: 'ValidateResponse', value: string } | null, applicationMutation1?: { __typename?: 'MutateApplicationResponse', value: string } | null, applicationMutation2?: { __typename?: 'MutateApplicationResponse', value: string } | null, compensation?: { __typename?: 'CompensateResponse', value: string } | null, reply?: { __typename?: 'ReplyResponse', value: string } | null, beginning?: { __typename?: 'BeginResponse', value: string } | null, finalization?: { __typename?: 'FinalizeResponse', value: string } | null } };

export type SubPingSubscriptionVariables = Exact<{
  input?: InputMaybe<SubPingInput>;
}>;


export type SubPingSubscription = { __typename?: 'Subscription', subPing?: { __typename?: 'Pong', value?: string | null } | null };


export const ExecuteWorkflowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ExecuteWorkflow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ExecuteWorkflowRequest"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"executeWorkflow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workflowId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<ExecuteWorkflowMutation, ExecuteWorkflowMutationVariables>;
export const MarkFinalizableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MarkFinalizable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MarkFinalizableRequest"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"markFinalizable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workflowId"}}]}}]}}]} as unknown as DocumentNode<MarkFinalizableMutation, MarkFinalizableMutationVariables>;
export const AppInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AppInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"temporal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"taskQueue"}}]}}]}}]}}]} as unknown as DocumentNode<AppInfoQuery, AppInfoQueryVariables>;
export const PingTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PingTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ping"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<PingTestQuery, PingTestQueryVariables>;
export const SveltePingTestDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SveltePingTest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ping"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}}]}}]}}]} as unknown as DocumentNode<SveltePingTestQuery, SveltePingTestQueryVariables>;
export const QueryWorkflowDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"QueryWorkflow"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"QueryRequest"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"queryWorkflow"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workflowId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"validation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationMutation1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationMutation2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"compensation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"beginning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"finalizable"}},{"kind":"Field","name":{"kind":"Name","value":"finalization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<QueryWorkflowQuery, QueryWorkflowQueryVariables>;
export const SubPingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"SubPing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SubPingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subPing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<SubPingSubscription, SubPingSubscriptionVariables>;
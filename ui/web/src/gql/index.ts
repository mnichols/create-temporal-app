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
};

export type AppInfo = {
  __typename?: 'AppInfo';
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

export type DoPingInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

export type ExecuteWorkflowRequest = {
  reply?: InputMaybe<ReplyRequest>;
  value: Scalars['String']['input'];
};

export type ExecuteWorkflowState = {
  __typename?: 'ExecuteWorkflowState';
  applicationMutation1?: Maybe<MutateApplicationResponse>;
  applicationMutation2?: Maybe<MutateApplicationResponse>;
  beginning?: Maybe<BeginResponse>;
  compensation?: Maybe<CompensateResponse>;
  finalization?: Maybe<FinalizeResponse>;
  reply?: Maybe<ReplyResponse>;
  validation?: Maybe<ValidateResponse>;
  value: Scalars['String']['output'];
};

export type FinalizeRequest = {
  value: Scalars['String']['input'];
};

export type FinalizeResponse = {
  __typename?: 'FinalizeResponse';
  value: Scalars['String']['output'];
};

export type MarkFinalizable = {
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
  input: MarkFinalizable;
};

export type PingInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Pong = {
  __typename?: 'Pong';
  value?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  appInfo: AppInfo;
  pong?: Maybe<Pong>;
  queryWorkflow: ExecuteWorkflowState;
};


export type QueryPongArgs = {
  input?: InputMaybe<PingInput>;
};


export type QueryQueryWorkflowArgs = {
  input?: InputMaybe<QueryRequest>;
};

export type QueryRequest = {
  value: Scalars['String']['input'];
};

export type QueryResponse = {
  __typename?: 'QueryResponse';
  value: Scalars['String']['output'];
};

export type ReplyRequest = {
  activityName: Scalars['String']['input'];
  taskQueue: Scalars['String']['input'];
  value: Scalars['String']['input'];
};

export type ReplyResponse = {
  __typename?: 'ReplyResponse';
  value: Scalars['String']['output'];
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

export type AppInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type AppInfoQuery = { __typename?: 'Query', appInfo: { __typename?: 'AppInfo', temporal: { __typename?: 'TemporalConnection', namespace: string, taskQueue?: string | null } } };

export type SubPingSubscriptionVariables = Exact<{
  input?: InputMaybe<SubPingInput>;
}>;


export type SubPingSubscription = { __typename?: 'Subscription', subPing?: { __typename?: 'Pong', value?: string | null } | null };


export const AppInfoDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AppInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"appInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"temporal"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"namespace"}},{"kind":"Field","name":{"kind":"Name","value":"taskQueue"}}]}}]}}]}}]} as unknown as DocumentNode<AppInfoQuery, AppInfoQueryVariables>;
export const SubPingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"SubPing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SubPingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subPing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<SubPingSubscription, SubPingSubscriptionVariables>;
import type { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
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
  workflowId: Scalars['String']['input'];
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
  workflowState: CurrentWorkflowState;
};


export type SubscriptionSubPingArgs = {
  input?: InputMaybe<SubPingInput>;
};


export type SubscriptionWorkflowStateArgs = {
  input: WorkflowStateRequest;
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

export type WorkflowStateRequest = {
  workflowId: Scalars['String']['input'];
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

export type SubCurrentWorkflowStateSubscriptionVariables = Exact<{
  input: WorkflowStateRequest;
}>;


export type SubCurrentWorkflowStateSubscription = { __typename?: 'Subscription', workflowState: { __typename?: 'CurrentWorkflowState', workflowId: string, value: string, finalizable?: string | null, validation?: { __typename?: 'ValidateResponse', value: string } | null, applicationMutation1?: { __typename?: 'MutateApplicationResponse', value: string } | null, applicationMutation2?: { __typename?: 'MutateApplicationResponse', value: string } | null, compensation?: { __typename?: 'CompensateResponse', value: string } | null, reply?: { __typename?: 'ReplyResponse', value: string } | null, beginning?: { __typename?: 'BeginResponse', value: string } | null, finalization?: { __typename?: 'FinalizeResponse', value: string } | null } };

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
export const SubCurrentWorkflowStateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"SubCurrentWorkflowState"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WorkflowStateRequest"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workflowState"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"workflowId"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"validation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationMutation1"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"applicationMutation2"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"compensation"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reply"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"beginning"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}},{"kind":"Field","name":{"kind":"Name","value":"finalizable"}},{"kind":"Field","name":{"kind":"Name","value":"finalization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<SubCurrentWorkflowStateSubscription, SubCurrentWorkflowStateSubscriptionVariables>;
export const SubPingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"SubPing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SubPingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subPing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<SubPingSubscription, SubPingSubscriptionVariables>;


export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AppInfo: ResolverTypeWrapper<AppInfo>;
  BeginRequest: BeginRequest;
  BeginResponse: ResolverTypeWrapper<BeginResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CompensateRequest: CompensateRequest;
  CompensateResponse: ResolverTypeWrapper<CompensateResponse>;
  CurrentWorkflowState: ResolverTypeWrapper<CurrentWorkflowState>;
  DoPingInput: DoPingInput;
  ExecuteWorkflowRequest: ExecuteWorkflowRequest;
  FinalizeRequest: FinalizeRequest;
  FinalizeResponse: ResolverTypeWrapper<FinalizeResponse>;
  MarkFinalizableRequest: MarkFinalizableRequest;
  MutateApplicationRequest: MutateApplicationRequest;
  MutateApplicationResponse: ResolverTypeWrapper<MutateApplicationResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  PingInput: PingInput;
  Pong: ResolverTypeWrapper<Pong>;
  Query: ResolverTypeWrapper<{}>;
  QueryRequest: QueryRequest;
  QueryResponse: ResolverTypeWrapper<QueryResponse>;
  ReplyRequest: ReplyRequest;
  ReplyResponse: ResolverTypeWrapper<ReplyResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  SubPingInput: SubPingInput;
  Subscription: ResolverTypeWrapper<{}>;
  TemporalConnection: ResolverTypeWrapper<TemporalConnection>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  ValidateRequest: ValidateRequest;
  ValidateResponse: ResolverTypeWrapper<ValidateResponse>;
  WorkflowStateRequest: WorkflowStateRequest;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AppInfo: AppInfo;
  BeginRequest: BeginRequest;
  BeginResponse: BeginResponse;
  Boolean: Scalars['Boolean']['output'];
  CompensateRequest: CompensateRequest;
  CompensateResponse: CompensateResponse;
  CurrentWorkflowState: CurrentWorkflowState;
  DoPingInput: DoPingInput;
  ExecuteWorkflowRequest: ExecuteWorkflowRequest;
  FinalizeRequest: FinalizeRequest;
  FinalizeResponse: FinalizeResponse;
  MarkFinalizableRequest: MarkFinalizableRequest;
  MutateApplicationRequest: MutateApplicationRequest;
  MutateApplicationResponse: MutateApplicationResponse;
  Mutation: {};
  PingInput: PingInput;
  Pong: Pong;
  Query: {};
  QueryRequest: QueryRequest;
  QueryResponse: QueryResponse;
  ReplyRequest: ReplyRequest;
  ReplyResponse: ReplyResponse;
  String: Scalars['String']['output'];
  SubPingInput: SubPingInput;
  Subscription: {};
  TemporalConnection: TemporalConnection;
  Time: Scalars['Time']['output'];
  ValidateRequest: ValidateRequest;
  ValidateResponse: ValidateResponse;
  WorkflowStateRequest: WorkflowStateRequest;
};

export type AppInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['AppInfo'] = ResolversParentTypes['AppInfo']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  temporal?: Resolver<ResolversTypes['TemporalConnection'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BeginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BeginResponse'] = ResolversParentTypes['BeginResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompensateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompensateResponse'] = ResolversParentTypes['CompensateResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CurrentWorkflowStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['CurrentWorkflowState'] = ResolversParentTypes['CurrentWorkflowState']> = {
  applicationMutation1?: Resolver<Maybe<ResolversTypes['MutateApplicationResponse']>, ParentType, ContextType>;
  applicationMutation2?: Resolver<Maybe<ResolversTypes['MutateApplicationResponse']>, ParentType, ContextType>;
  beginning?: Resolver<Maybe<ResolversTypes['BeginResponse']>, ParentType, ContextType>;
  compensation?: Resolver<Maybe<ResolversTypes['CompensateResponse']>, ParentType, ContextType>;
  finalizable?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  finalization?: Resolver<Maybe<ResolversTypes['FinalizeResponse']>, ParentType, ContextType>;
  reply?: Resolver<Maybe<ResolversTypes['ReplyResponse']>, ParentType, ContextType>;
  validation?: Resolver<Maybe<ResolversTypes['ValidateResponse']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workflowId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FinalizeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FinalizeResponse'] = ResolversParentTypes['FinalizeResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workflowId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutateApplicationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutateApplicationResponse'] = ResolversParentTypes['MutateApplicationResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  doPing?: Resolver<Maybe<ResolversTypes['Pong']>, ParentType, ContextType, Partial<MutationDoPingArgs>>;
  executeWorkflow?: Resolver<ResolversTypes['ReplyResponse'], ParentType, ContextType, RequireFields<MutationExecuteWorkflowArgs, 'input'>>;
  markFinalizable?: Resolver<ResolversTypes['FinalizeResponse'], ParentType, ContextType, RequireFields<MutationMarkFinalizableArgs, 'input'>>;
};

export type PongResolvers<ContextType = any, ParentType extends ResolversParentTypes['Pong'] = ResolversParentTypes['Pong']> = {
  timestamp?: Resolver<Maybe<ResolversTypes['Time']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  appInfo?: Resolver<ResolversTypes['AppInfo'], ParentType, ContextType>;
  ping?: Resolver<Maybe<ResolversTypes['Pong']>, ParentType, ContextType, Partial<QueryPingArgs>>;
  pong?: Resolver<Maybe<ResolversTypes['Pong']>, ParentType, ContextType, Partial<QueryPongArgs>>;
  queryWorkflow?: Resolver<ResolversTypes['CurrentWorkflowState'], ParentType, ContextType, Partial<QueryQueryWorkflowArgs>>;
};

export type QueryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['QueryResponse'] = ResolversParentTypes['QueryResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workflowId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReplyResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReplyResponse'] = ResolversParentTypes['ReplyResponse']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  workflowId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  subPing?: SubscriptionResolver<Maybe<ResolversTypes['Pong']>, "subPing", ParentType, ContextType, Partial<SubscriptionSubPingArgs>>;
  workflowState?: SubscriptionResolver<ResolversTypes['CurrentWorkflowState'], "workflowState", ParentType, ContextType, RequireFields<SubscriptionWorkflowStateArgs, 'input'>>;
};

export type TemporalConnectionResolvers<ContextType = any, ParentType extends ResolversParentTypes['TemporalConnection'] = ResolversParentTypes['TemporalConnection']> = {
  namespace?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  taskQueue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type ValidateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidateResponse'] = ResolversParentTypes['ValidateResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AppInfo?: AppInfoResolvers<ContextType>;
  BeginResponse?: BeginResponseResolvers<ContextType>;
  CompensateResponse?: CompensateResponseResolvers<ContextType>;
  CurrentWorkflowState?: CurrentWorkflowStateResolvers<ContextType>;
  FinalizeResponse?: FinalizeResponseResolvers<ContextType>;
  MutateApplicationResponse?: MutateApplicationResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Pong?: PongResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QueryResponse?: QueryResponseResolvers<ContextType>;
  ReplyResponse?: ReplyResponseResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TemporalConnection?: TemporalConnectionResolvers<ContextType>;
  Time?: GraphQLScalarType;
  ValidateResponse?: ValidateResponseResolvers<ContextType>;
};


import type { GraphQLResolveInfo } from 'graphql';
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

export type ExecuteWorkflowRequest = {
  value: Scalars['String']['input'];
};

export type ExecuteWorkflowState = {
  __typename?: 'ExecuteWorkflowState';
  applicationMutation1?: Maybe<MutateApplicationResponse>;
  applicationMutation2?: Maybe<MutateApplicationResponse>;
  beginning?: Maybe<BeginResponse>;
  compensation?: Maybe<CompensateResponse>;
  finalization?: Maybe<FinalizeResponse>;
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

export type MutateApplicationRequest = {
  value: Scalars['String']['input'];
};

export type MutateApplicationResponse = {
  __typename?: 'MutateApplicationResponse';
  value: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  executeWorkflow: ReplyResponse;
  finalizeRequest: FinalizeResponse;
};


export type MutationExecuteWorkflowArgs = {
  input: ExecuteWorkflowRequest;
};


export type MutationFinalizeRequestArgs = {
  input: FinalizeRequest;
};

export type Query = {
  __typename?: 'Query';
  queryWorkflow: ExecuteWorkflowState;
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
  value: Scalars['String']['input'];
};

export type ReplyResponse = {
  __typename?: 'ReplyResponse';
  value: Scalars['String']['output'];
};

export type ValidateRequest = {
  value: Scalars['String']['input'];
};

export type ValidateResponse = {
  __typename?: 'ValidateResponse';
  value: Scalars['String']['output'];
};



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
  BeginRequest: BeginRequest;
  BeginResponse: ResolverTypeWrapper<BeginResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  CompensateRequest: CompensateRequest;
  CompensateResponse: ResolverTypeWrapper<CompensateResponse>;
  ExecuteWorkflowRequest: ExecuteWorkflowRequest;
  ExecuteWorkflowState: ResolverTypeWrapper<ExecuteWorkflowState>;
  FinalizeRequest: FinalizeRequest;
  FinalizeResponse: ResolverTypeWrapper<FinalizeResponse>;
  MutateApplicationRequest: MutateApplicationRequest;
  MutateApplicationResponse: ResolverTypeWrapper<MutateApplicationResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  QueryRequest: QueryRequest;
  QueryResponse: ResolverTypeWrapper<QueryResponse>;
  ReplyRequest: ReplyRequest;
  ReplyResponse: ResolverTypeWrapper<ReplyResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  ValidateRequest: ValidateRequest;
  ValidateResponse: ResolverTypeWrapper<ValidateResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  BeginRequest: BeginRequest;
  BeginResponse: BeginResponse;
  Boolean: Scalars['Boolean']['output'];
  CompensateRequest: CompensateRequest;
  CompensateResponse: CompensateResponse;
  ExecuteWorkflowRequest: ExecuteWorkflowRequest;
  ExecuteWorkflowState: ExecuteWorkflowState;
  FinalizeRequest: FinalizeRequest;
  FinalizeResponse: FinalizeResponse;
  MutateApplicationRequest: MutateApplicationRequest;
  MutateApplicationResponse: MutateApplicationResponse;
  Mutation: {};
  Query: {};
  QueryRequest: QueryRequest;
  QueryResponse: QueryResponse;
  ReplyRequest: ReplyRequest;
  ReplyResponse: ReplyResponse;
  String: Scalars['String']['output'];
  ValidateRequest: ValidateRequest;
  ValidateResponse: ValidateResponse;
};

export type BeginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BeginResponse'] = ResolversParentTypes['BeginResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CompensateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompensateResponse'] = ResolversParentTypes['CompensateResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExecuteWorkflowStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ExecuteWorkflowState'] = ResolversParentTypes['ExecuteWorkflowState']> = {
  applicationMutation1?: Resolver<Maybe<ResolversTypes['MutateApplicationResponse']>, ParentType, ContextType>;
  applicationMutation2?: Resolver<Maybe<ResolversTypes['MutateApplicationResponse']>, ParentType, ContextType>;
  beginning?: Resolver<Maybe<ResolversTypes['BeginResponse']>, ParentType, ContextType>;
  compensation?: Resolver<Maybe<ResolversTypes['CompensateResponse']>, ParentType, ContextType>;
  finalization?: Resolver<Maybe<ResolversTypes['FinalizeResponse']>, ParentType, ContextType>;
  validation?: Resolver<Maybe<ResolversTypes['ValidateResponse']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FinalizeResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['FinalizeResponse'] = ResolversParentTypes['FinalizeResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutateApplicationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['MutateApplicationResponse'] = ResolversParentTypes['MutateApplicationResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  executeWorkflow?: Resolver<ResolversTypes['ReplyResponse'], ParentType, ContextType, RequireFields<MutationExecuteWorkflowArgs, 'input'>>;
  finalizeRequest?: Resolver<ResolversTypes['FinalizeResponse'], ParentType, ContextType, RequireFields<MutationFinalizeRequestArgs, 'input'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  queryWorkflow?: Resolver<ResolversTypes['ExecuteWorkflowState'], ParentType, ContextType, Partial<QueryQueryWorkflowArgs>>;
};

export type QueryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['QueryResponse'] = ResolversParentTypes['QueryResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReplyResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ReplyResponse'] = ResolversParentTypes['ReplyResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ValidateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ValidateResponse'] = ResolversParentTypes['ValidateResponse']> = {
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  BeginResponse?: BeginResponseResolvers<ContextType>;
  CompensateResponse?: CompensateResponseResolvers<ContextType>;
  ExecuteWorkflowState?: ExecuteWorkflowStateResolvers<ContextType>;
  FinalizeResponse?: FinalizeResponseResolvers<ContextType>;
  MutateApplicationResponse?: MutateApplicationResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  QueryResponse?: QueryResponseResolvers<ContextType>;
  ReplyResponse?: ReplyResponseResolvers<ContextType>;
  ValidateResponse?: ValidateResponseResolvers<ContextType>;
};


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

export type DoPingInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  doPing?: Maybe<Pong>;
};


export type MutationDoPingArgs = {
  input?: InputMaybe<DoPingInput>;
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
  pong?: Maybe<Pong>;
};


export type QueryPongArgs = {
  input?: InputMaybe<PingInput>;
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

export type SubPingSubscriptionVariables = Exact<{
  input?: InputMaybe<SubPingInput>;
}>;


export type SubPingSubscription = { __typename?: 'Subscription', subPing?: { __typename?: 'Pong', value?: string | null } | null };


export const SubPingDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"SubPing"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"SubPingInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subPing"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<SubPingSubscription, SubPingSubscriptionVariables>;
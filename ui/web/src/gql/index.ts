import client from "$lib/http/apollo-client";
import type {
        
      } from "@apollo/client";
import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import gql from "graphql-tag"
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

export type AMutationInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

export type AQueryInput = {
  value?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  aMutation?: Maybe<Scalars['String']['output']>;
};


export type MutationAMutationArgs = {
  input?: InputMaybe<AMutationInput>;
};

export type Query = {
  __typename?: 'Query';
  aQuery?: Maybe<Scalars['String']['output']>;
};


export type QueryAQueryArgs = {
  input?: InputMaybe<AQueryInput>;
};



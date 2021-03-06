import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  ObjectID: String;
};

export type CreateOrderInput = {
  amount: Scalars['Int'];
  interest_rate: Scalars['Float'];
  user: Scalars['ObjectID'];
};

export type CreateUserRequest = {
  age?: InputMaybe<Scalars['Int']>;
  full_name: Scalars['String'];
  gender?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
};

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Other = 'Other'
}

export type Mutation = {
  __typename?: 'Mutation';
  createOrder?: Maybe<OrderResult>;
  createUser?: Maybe<UserResult>;
  updateUser?: Maybe<UserResult>;
};


export type MutationCreateOrderArgs = {
  order: CreateOrderInput;
};


export type MutationCreateUserArgs = {
  user: CreateUserRequest;
};


export type MutationUpdateUserArgs = {
  user: UpdateUserRequest;
};

export type OrderResult = {
  __typename?: 'OrderResult';
  _id?: Maybe<Scalars['ObjectID']>;
  accrued_amount?: Maybe<Array<Maybe<Scalars['Int']>>>;
  amount?: Maybe<Scalars['Int']>;
  code?: Maybe<Scalars['String']>;
  interest_rate?: Maybe<Scalars['Float']>;
  user?: Maybe<Scalars['ObjectID']>;
};

export type Query = {
  __typename?: 'Query';
  getOrderById?: Maybe<OrderResult>;
  getOrderByUser?: Maybe<Array<Maybe<OrderResult>>>;
  user?: Maybe<UserResult>;
};


export type QueryGetOrderByIdArgs = {
  _id: Scalars['ObjectID'];
};


export type QueryGetOrderByUserArgs = {
  user: Scalars['ObjectID'];
};


export type QueryUserArgs = {
  _id: Scalars['ObjectID'];
};

export type UpdateUserRequest = {
  _id: Scalars['ObjectID'];
  age?: InputMaybe<Scalars['Int']>;
  full_name?: InputMaybe<Scalars['String']>;
  gender?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type UserResult = {
  __typename?: 'UserResult';
  _id?: Maybe<Scalars['ObjectID']>;
  age?: Maybe<Scalars['Int']>;
  full_name?: Maybe<Scalars['String']>;
  gender?: Maybe<Gender>;
  phone?: Maybe<Scalars['String']>;
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateOrderInput: CreateOrderInput;
  CreateUserRequest: CreateUserRequest;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  Gender: Gender;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectID: ResolverTypeWrapper<Scalars['ObjectID']>;
  OrderResult: ResolverTypeWrapper<OrderResult>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  UpdateUserRequest: UpdateUserRequest;
  UserResult: ResolverTypeWrapper<UserResult>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateOrderInput: CreateOrderInput;
  CreateUserRequest: CreateUserRequest;
  Float: Scalars['Float'];
  Int: Scalars['Int'];
  Mutation: {};
  ObjectID: Scalars['ObjectID'];
  OrderResult: OrderResult;
  Query: {};
  String: Scalars['String'];
  UpdateUserRequest: UpdateUserRequest;
  UserResult: UserResult;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createOrder?: Resolver<Maybe<ResolversTypes['OrderResult']>, ParentType, ContextType, RequireFields<MutationCreateOrderArgs, 'order'>>;
  createUser?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'user'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'user'>>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectID'], any> {
  name: 'ObjectID';
}

export type OrderResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderResult'] = ResolversParentTypes['OrderResult']> = {
  _id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  accrued_amount?: Resolver<Maybe<Array<Maybe<ResolversTypes['Int']>>>, ParentType, ContextType>;
  amount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  code?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  interest_rate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getOrderById?: Resolver<Maybe<ResolversTypes['OrderResult']>, ParentType, ContextType, RequireFields<QueryGetOrderByIdArgs, '_id'>>;
  getOrderByUser?: Resolver<Maybe<Array<Maybe<ResolversTypes['OrderResult']>>>, ParentType, ContextType, RequireFields<QueryGetOrderByUserArgs, 'user'>>;
  user?: Resolver<Maybe<ResolversTypes['UserResult']>, ParentType, ContextType, RequireFields<QueryUserArgs, '_id'>>;
};

export type UserResultResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResult'] = ResolversParentTypes['UserResult']> = {
  _id?: Resolver<Maybe<ResolversTypes['ObjectID']>, ParentType, ContextType>;
  age?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  full_name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>;
  ObjectID?: GraphQLScalarType;
  OrderResult?: OrderResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UserResult?: UserResultResolvers<ContextType>;
};


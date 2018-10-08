import { Expression } from "jokenizer";

export type Ctor<T> = new (...args) => T;

export type Func1<T1, T2 = any> = ((p1: T1) => T2) | string;
export type Func2<T1, T2, T3 = any> = ((p1: T1, p2: T2) => T3) | string;
export type Predicate<T> = Func1<T, boolean>;

export interface IGrouping<T, TKey> extends Array<T> {
    key: TKey;
}

export interface IQueryProvider {
    createQuery(parts?: IQueryPart[]): IQueryBase;
    execute<TResult = any[]>(parts: IQueryPart[]): TResult;
    executeAsync<TResult = any[]>(parts: IQueryPart[]): PromiseLike<TResult>;
    executeAsyncIterator<TResult = any>(parts: IQueryPart[]): AsyncIterator<TResult>;
}

export interface IPartArgument {
    readonly func: Function;
    readonly exp: Expression;
    readonly literal;
    readonly scopes: any[];
}

export interface IQueryPart {
    readonly type: string;
    readonly args: IPartArgument[];
    readonly scopes: any[];
}

export interface IQueryBase {
    readonly provider: IQueryProvider;
    readonly parts: IQueryPart[];
}

export interface InlineCountInfo {
    $inlineCount?: number;
}

interface IQueryDuplicates<T, TAttachedInfo = {}> {
    concat(other: Array<T>): IQuery<T, TAttachedInfo>;
    join<TOther, TResult = any, TKey = any>(other: Array<TOther>, thisKey: Func1<T, TKey>, otherKey: Func1<TOther, TKey>,
        selector: Func2<T, TOther, TResult>, ...scopes): IQuery<TResult, TAttachedInfo>;
    reverse(): IQuery<T, TAttachedInfo>;
}

export interface IQuerySafe<T, TAttachedInfo = {}> extends IQueryBase, Iterable<T>, AsyncIterable<T> {
    aggregate<TAccumulate = number>(func: Func2<TAccumulate, T, TAccumulate>, seed?: TAccumulate, ...scopes): TAccumulate;
    aggregateAsync<TAccumulate = number>(func: Func2<TAccumulate, T, TAccumulate>, seed?: TAccumulate, ...scopes): PromiseLike<TAccumulate>;
    all(predicate: Predicate<T>, ...scopes): boolean;
    allAsync(predicate: Predicate<T>, ...scopes): PromiseLike<boolean>;
    any(predicate?: Predicate<T>, ...scopes): boolean;
    anyAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<boolean>;
    average(selector?: Func1<T, number>, ...scopes): number;
    averageAsync(selector?: Func1<T, number>, ...scopes): PromiseLike<number>;
    cast<TResult>(type: Ctor<TResult>): IQuery<TResult, TAttachedInfo>;
    contains(item: T, comparer?: Func2<T, T, boolean>, ...scopes): boolean;
    containsAsync(item: T, comparer?: Func2<T, T, boolean>, ...scopes): PromiseLike<boolean>;
    count(predicate?: Predicate<T>, ...scopes): number;
    countAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<number>;
    defaultIfEmpty(defaultValue?: T): IQuery<T, TAttachedInfo>;
    distinct(comparer?: Func2<T, T, boolean>, ...scopes): IQuery<T, TAttachedInfo>;
    elementAt(index: number): T & TAttachedInfo;
    elementAtAsync(index: number): PromiseLike<T & TAttachedInfo>;
    elementAtOrDefault(index: number): T & TAttachedInfo;
    elementAtOrDefaultAsync(index: number): PromiseLike<T & TAttachedInfo>;
    except(other: Array<T>, comparer?: Func2<T, T, boolean>, ...scopes): IQuery<T, TAttachedInfo>;
    first(predicate?: Predicate<T>, ...scopes): T & TAttachedInfo;
    firstAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<T & TAttachedInfo>;
    firstOrDefault(predicate?: Predicate<T>, ...scopes): T & TAttachedInfo;
    firstOrDefaultAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<T & TAttachedInfo>;
    groupBy<TResult = IGrouping<TKey, T>, TKey = any>(keySelector: Func1<T, TKey>, 
        elementSelector?: Func2<TKey, Array<T>, TResult>, ...scopes): IQuery<TResult, TAttachedInfo>;
    groupJoin<TOther, TKey = any, TResult = any>(other: Array<TOther>, thisKey: Func1<T, TKey>, otherKey: Func1<TOther, TKey>,
        selector: Func2<T, Array<TOther>, TResult>, ...scopes): IQuery<TResult, TAttachedInfo>;
    inlineCount(value?: boolean): IQuery<T, TAttachedInfo>;
    intersect(other: Array<T>, comparer?: Func2<T, T, boolean>, ...scopes): IQuery<T, TAttachedInfo>;
    last(predicate?: Predicate<T>, ...scopes): T & TAttachedInfo;
    lastAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<T & TAttachedInfo>;
    lastOrDefault(predicate?: Predicate<T>, ...scopes): T & TAttachedInfo;
    lastOrDefaultAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<T & TAttachedInfo>;
    max<TResult = T>(selector?: Func1<T, TResult>, ...scopes): TResult;
    maxAsync<TResult = T>(selector?: Func1<T, TResult>, ...scopes): PromiseLike<TResult>;
    min<TResult = T>(selector?: Func1<T, TResult>, ...scopes): TResult;
    minAsync<TResult = T>(selector?: Func1<T, TResult>, ...scopes): PromiseLike<TResult>;
    ofType<TResult extends T>(type: Ctor<TResult>): IQuery<TResult, TAttachedInfo>;
    orderBy(keySelector: Func1<T>, ...scopes): IOrderedQuery<T, TAttachedInfo>;
    orderByDescending(keySelector: Func1<T>, ...scopes): IOrderedQuery<T, TAttachedInfo>;
    select<TResult = any>(selector: Func1<T, TResult>, ...scopes): IQuery<TResult, TAttachedInfo>;
    selectMany<TResult>(selector: Func1<T, Array<TResult>>, ...scopes): IQuery<TResult, TAttachedInfo>;
    sequenceEqual(other: Array<T>, comparer?: Func2<T, T, boolean>, ...scopes): boolean;
    sequenceEqualAsync(other: Array<T>, comparer?: Func2<T, T, boolean>, ...scopes): PromiseLike<boolean>;
    single(predicate?: Predicate<T>, ...scopes): T & TAttachedInfo;
    singleAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<T & TAttachedInfo>;
    singleOrDefault(predicate?: Predicate<T>, ...scopes): T & TAttachedInfo;
    singleOrDefaultAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<T & TAttachedInfo>;
    skip(count: number): IQuery<T, TAttachedInfo>;
    skipWhile(predicate: Predicate<T>, ...scopes): IQuery<T, TAttachedInfo>;
    sum(selector?: Func1<T, number>, ...scopes): number;
    sumAsync(selector?: Func1<T, number>, ...scopes): PromiseLike<number>;
    take(count: number): IQuery<T, TAttachedInfo>;
    takeWhile(predicate: Predicate<T>, ...scopes): IQuery<T, TAttachedInfo>;
    union(other: Array<T>, comparer?: Func2<T, T, boolean>, ...scopes): IQuery<T, TAttachedInfo>;
    where(predicate: Predicate<T>, ...scopes): IQuery<T, TAttachedInfo>;
    zip<TOther, TResult = any>(other: Array<TOther>, selector: Func2<T, TOther, TResult>, ...scopes): IQuery<TResult, TAttachedInfo>;

    toArray(): Array<T> & InlineCountInfo & TAttachedInfo;
    toArrayAsync(): PromiseLike<Array<T> & InlineCountInfo & TAttachedInfo>;
}

export type IQuery<T, TAttachedInfo = {}> = IQuerySafe<T, TAttachedInfo> & IQueryDuplicates<T, TAttachedInfo>;

export interface IOrderedQuery<T, TAttachedInfo = {}> extends IQuery<T, TAttachedInfo> {
    thenBy(selector: Func1<T>, ...scopes): IOrderedQuery<T, TAttachedInfo>;
    thenByDescending(keySelector: Func1<T>, ...scopes): IOrderedQuery<T, TAttachedInfo>;
}

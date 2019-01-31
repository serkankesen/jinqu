import { Expression } from "jokenizer";

export type Ctor<T> = new (...args) => T;

export type Func1<T1, T2 = any> = ((p1: T1) => T2) | string;
export type Func2<T1, T2, T3 = any> = ((p1: T1, p2: T2) => T3) | string;
export type Predicate<T> = Func1<T, boolean>;
export type TypePredicate<T> = (t: any) => t is T

export interface IGrouping<T, TKey> extends Array<T> {
    key: TKey;
}

export interface IQueryProvider {
    createQuery(parts?: IQueryPart[]): IQueryBase;
    execute<TResult = any[]>(parts: IQueryPart[]): TResult;
    executeAsync<TResult = any[]>(parts: IQueryPart[]): PromiseLike<TResult>;
}

export interface IPartArgument {
    readonly func: Function;
    readonly exp: Expression;
    readonly literal: any;
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

interface IQueryDuplicates<T, TExtra = {}> {
    concat(other: Array<T>): IQuery<T, TExtra>;
    join<TOther, TResult = any, TKey = any>(other: Array<TOther>, thisKey: Func1<T, TKey>, otherKey: Func1<TOther, TKey>,
        selector: Func2<T, TOther, TResult>, ...scopes): IQuery<TResult, TExtra>;
    join<TOther, TResult = any, TKey = any>(other: Array<TOther>, thisKey: Func1<T, TKey>, otherKey: Func1<TOther, TKey>,
        selector: Func2<T, TOther, TResult>, ctor: Ctor<TResult>, ...scopes): IQuery<TResult, TExtra>;
    reverse(): IQuery<T, TExtra>;
}

export interface IQuerySafe<T, TExtra = {}> extends IQueryBase, Iterable<T> {
    aggregate<TAccumulate = number>(func: Func2<TAccumulate, T, TAccumulate>, seed?: TAccumulate, ...scopes): TAccumulate;
    aggregateAsync<TAccumulate = number>(func: Func2<TAccumulate, T, TAccumulate>, seed?: TAccumulate, ...scopes): PromiseLike<TAccumulate>;
    all(predicate: Predicate<T>, ...scopes): boolean;
    allAsync(predicate: Predicate<T>, ...scopes): PromiseLike<boolean>;
    any(predicate?: Predicate<T>, ...scopes): boolean;
    anyAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<boolean>;
    average(selector?: Func1<T, number>, ...scopes): number;
    averageAsync(selector?: Func1<T, number>, ...scopes): PromiseLike<number>;
    cast<TResult>(type: Ctor<TResult>): IQuery<TResult, TExtra>;
    contains(item: T, comparer?: Func2<T, T, boolean>, ...scopes): boolean;
    containsAsync(item: T, comparer?: Func2<T, T, boolean>, ...scopes): PromiseLike<boolean>;
    count(predicate?: Predicate<T>, ...scopes): number;
    countAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<number>;
    defaultIfEmpty(defaultValue?: T): IQuery<T, TExtra>;
    distinct(comparer?: Func2<T, T, boolean>, ...scopes): IQuery<T, TExtra>;
    elementAt(index: number): T & TExtra;
    elementAtAsync(index: number): PromiseLike<T & TExtra>;
    elementAtOrDefault(index: number): T & TExtra;
    elementAtOrDefaultAsync(index: number): PromiseLike<T & TExtra>;
    except(other: Array<T>, comparer?: Func2<T, T, boolean>, ...scopes): IQuery<T, TExtra>;
    first(predicate?: Predicate<T>, ...scopes): T & TExtra;
    firstAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<T & TExtra>;
    firstOrDefault(predicate?: Predicate<T>, ...scopes): T & TExtra;
    firstOrDefaultAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<T & TExtra>;
    groupBy<TResult = IGrouping<TKey, T>, TKey = any>(keySelector: Func1<T, TKey>,
        elementSelector?: Func2<TKey, Array<T>, TResult>, ...scopes): IQuery<TResult, TExtra>;
    groupBy<TResult = IGrouping<TKey, T>, TKey = any>(keySelector: Func1<T, TKey>,
        elementSelector?: Func2<TKey, Array<T>, TResult>, ctor?: Ctor<TResult>, ...scopes): IQuery<TResult, TExtra>;
    groupJoin<TOther, TKey = any, TResult = any>(other: Array<TOther>, thisKey: Func1<T, TKey>, otherKey: Func1<TOther, TKey>,
        selector: Func2<T, Array<TOther>, TResult>, ...scopes): IQuery<TResult, TExtra>;
    groupJoin<TOther, TKey = any, TResult = any>(other: Array<TOther>, thisKey: Func1<T, TKey>, otherKey: Func1<TOther, TKey>,
        selector: Func2<T, Array<TOther>, TResult>, ctor?: Ctor<TResult>, ...scopes): IQuery<TResult, TExtra>;
    inlineCount(value?: boolean): IQuery<T, TExtra & InlineCountInfo>;
    intersect(other: Array<T>, comparer?: Func2<T, T, boolean>, ...scopes): IQuery<T, TExtra>;
    last(predicate?: Predicate<T>, ...scopes): T & TExtra;
    lastAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<T & TExtra>;
    lastOrDefault(predicate?: Predicate<T>, ...scopes): T & TExtra;
    lastOrDefaultAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<T & TExtra>;
    max<TResult = T>(selector?: Func1<T, TResult>, ...scopes): TResult;
    maxAsync<TResult = T>(selector?: Func1<T, TResult>, ...scopes): PromiseLike<TResult>;
    min<TResult = T>(selector?: Func1<T, TResult>, ...scopes): TResult;
    minAsync<TResult = T>(selector?: Func1<T, TResult>, ...scopes): PromiseLike<TResult>;
    ofGuardedType<TResult>(checker: TypePredicate<TResult>): IQuery<TResult, TExtra>;
    ofType<TResult extends T>(type: Ctor<TResult> | TResult): IQuery<TResult, TExtra>;
    orderBy(keySelector: Func1<T>, ...scopes): IOrderedQuery<T, TExtra>;
    orderByDescending(keySelector: Func1<T>, ...scopes): IOrderedQuery<T, TExtra>;
    select<TResult = any>(selector: Func1<T, TResult>, ...scopes): IQuery<TResult, TExtra>;
    select<TResult = any>(selector: Func1<T, TResult>, ctor: Ctor<T>, ...scopes): IQuery<TResult, TExtra>;
    selectMany<TResult>(selector: Func1<T, Array<TResult>>, ...scopes): IQuery<TResult, TExtra>;
    selectMany<TResult>(selector: Func1<T, Array<TResult>>, ctor: Ctor<T>, ...scopes): IQuery<TResult, TExtra>;
    sequenceEqual(other: Array<T>, comparer?: Func2<T, T, boolean>, ...scopes): boolean;
    sequenceEqualAsync(other: Array<T>, comparer?: Func2<T, T, boolean>, ...scopes): PromiseLike<boolean>;
    single(predicate?: Predicate<T>, ...scopes): T & TExtra;
    singleAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<T & TExtra>;
    singleOrDefault(predicate?: Predicate<T>, ...scopes): T & TExtra;
    singleOrDefaultAsync(predicate?: Predicate<T>, ...scopes): PromiseLike<T & TExtra>;
    skip(count: number): IQuery<T, TExtra>;
    skipWhile(predicate: Predicate<T>, ...scopes): IQuery<T, TExtra>;
    sum(selector?: Func1<T, number>, ...scopes): number;
    sumAsync(selector?: Func1<T, number>, ...scopes): PromiseLike<number>;
    take(count: number): IQuery<T, TExtra>;
    takeWhile(predicate: Predicate<T>, ...scopes): IQuery<T, TExtra>;
    union(other: Array<T>, comparer?: Func2<T, T, boolean>, ...scopes): IQuery<T, TExtra>;
    where(predicate: Predicate<T>, ...scopes): IQuery<T, TExtra>;
    zip<TOther, TResult = any>(other: Array<TOther>, selector: Func2<T, TOther, TResult>, ...scopes): IQuery<TResult, TExtra>;
    zip<TOther, TResult = any>(other: Array<TOther>, selector: Func2<T, TOther, TResult>, ctor: Ctor<T>, ...scopes): IQuery<TResult, TExtra>;

    toArray(ctor?: Ctor<T>): Array<T> & TExtra;
    toArrayAsync(ctor?: Ctor<T>): PromiseLike<Array<T> & TExtra>;
}

export type IQuery<T, TExtra = {}> = IQuerySafe<T, TExtra> & IQueryDuplicates<T, TExtra>;

export interface IOrderedQuery<T, TExtra = {}> extends IQuery<T, TExtra> {
    thenBy(selector: Func1<T>, ...scopes): IOrderedQuery<T, TExtra>;
    thenByDescending(keySelector: Func1<T>, ...scopes): IOrderedQuery<T, TExtra>;
}

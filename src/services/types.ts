export interface QueryResponse<TData = never> {
    succeeded: boolean;
    message?: string;
    data: TData;
}

export interface CommandResponse<TCommand = never, TData = never> {
    succeeded: boolean;
    data: TData;
    message?: string;
    errors?: Partial<TCommand>;
}
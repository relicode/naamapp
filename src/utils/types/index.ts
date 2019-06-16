// export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type KeysMatching<T, V> = {[K in keyof T]: T[K] extends V ? K : never}[keyof T]

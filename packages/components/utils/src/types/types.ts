/**
 *  Allows creating a literal string union type with auto-completion in IDEs
 */
export type LiteralStringUnion<T extends string> = T | (string & {});

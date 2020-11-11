export const filterUndefinedProperties = <T extends object>(
  props: T
): { [key: string]: T[keyof T] } =>
  Object.fromEntries(Object.entries(props).filter(([_, value]) => value));

// Validerar att ett object är av typen [object Object]
export const isObjectObject = (obj: any): boolean =>
  obj &&
  typeof obj === "object" &&
  Object.prototype.toString.call(obj) === "[object Object]";

// Tar 1 eller flera object och mergar ihop dem djupt, dvs att alla barn som
// också är object blir mergade de med.
// Först så tar vi och samlar ihop alla funktions argumenten vi tagit emot i en
// array med hjälp av spread operatorn (`...`) i en variabel vi kallar sources.
// Sen kör vi `array.reduce` funktionen på våra "sources" och skickar med ett
// tomt objekt som initiellt värde.
// Reduce är en funktion som itererar över en arrays värden och anropar en funktion för
// varje iteration, den funktionen får det akumulerade värdet och det nuvarande
// värdet som argument.
//
// export const deepmerge = (
//   ...sources: { [key: string]: any }[]
// ): { [key: string]: any } =>
interface KeyValueObject {
  [key: string]: any;
}

type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

export const deepmerge = <T extends KeyValueObject[]>(
  ...sources: T
): UnionToIntersection<T[number]> =>
  sources.reduce(
    (accumulator, current) => ({
      ...accumulator,
      ...Object.fromEntries(
        Object.entries(current).map(([key, value]) =>
          isObjectObject(accumulator[key]) && isObjectObject(value)
            ? [key, deepmerge(accumulator[key], value)]
            : [key, value]
        )
      ),
    }),
    {} as any
  );

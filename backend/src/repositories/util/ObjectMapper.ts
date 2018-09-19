import _ from "lodash";

export function partialOf<T>(value: Partial<T>): Partial<T> {
    return _.pickBy(value, _.identity) as Partial<T>;
}

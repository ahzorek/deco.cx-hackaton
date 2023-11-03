import { MatchContext } from "deco/blocks/matcher.ts";
import { getCookies } from "std/http/cookie.ts";

/**
 * @title Cookie
 */
export interface Props {
  name: string;
}

/**
 * @title Has Cookie
 */
const HasCookies = (
  { name }: Props,
  { request }: MatchContext,
) => {
  const cookies = getCookies(request.headers);
  if (cookies[name] !== undefined) {
    return true;
  } else {
    return false;
  }
};

export default HasCookies;

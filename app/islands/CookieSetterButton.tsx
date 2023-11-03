import { forwardRef } from "preact/compat";
import type { JSX } from "preact";

export type Props =
  & Omit<JSX.IntrinsicElements["button"], "loading">
  & {
    loading?: boolean;
    cookieData: object;
  };

function setCookie(cname: string, cvalue: string, exhours: number) {
  const d = new Date();
  d.setTime(d.getTime() + (exhours * 60 * 60 * 1000));
  const expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

const CookieSetterButton = forwardRef<HTMLButtonElement, Props>(({
  type = "button",
  class: _class = "",
  loading,
  disabled,
  children,
  cookieData,
  ...props
}, ref) => {
  const { value, cookieName, cookieExpires } = cookieData;
  return (
    <button
      {...props}
      onClick={() => setCookie(cookieName, value, cookieExpires)}
      className={_class}
      disabled={disabled || loading}
      type={type}
      ref={ref}
    >
      {loading ? <span class="loading loading-spinner" /> : children}
    </button>
  );
});

export { CookieSetterButton };

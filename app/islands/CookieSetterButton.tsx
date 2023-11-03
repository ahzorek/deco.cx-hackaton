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
  const expires = exhours ? "expires=" + d.toUTCString() : "";
  const newCookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  console.log("creating new cookie::", newCookie);

  document.cookie = newCookie;
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
  const { value, cookieName, cookieExpires, wrapper } = cookieData;
  return (
    <button
      {...props}
      onClick={() => {
        setCookie(cookieName, value, cookieExpires);
        document.querySelector(`#${wrapper}`).remove(); //pessima pratica
      }}
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

import { CookieSetterButton } from "../islands/CookieSetterButton.tsx";
import type { SectionProps } from "$live/mod.ts";

// Props type that will be configured in deco.cx's Admin
export interface Props {
  title: string;
  cookieName: string;
  cookieExpires?: number;
  option1: {
    description: string;
    icon?: string;
    value: string;
  };
  option2: {
    description: string;
    icon?: string;
    value: string;
  };
}

export function loader(
  { title, option1, option2, cookieName, cookieExpires }: Props,
) {
  return { title, option1, option2, cookieName, cookieExpires };
}

export default function AskUserPreference(
  { title, option1, option2, cookieName, cookieExpires }: SectionProps<
    typeof loader
  >,
) {
  return (
    <div class="p-12 max-w-6xl mx-auto">
      <h2 class="font-bold text-4xl my-6">{title}</h2>
      <section class="grid md:grid-cols-2 gap-6 text-gray-200">
        <CookieSetterButton
          cookieData={{ value: option1.value, cookieName, cookieExpires }}
          class="flex flex-col justify-start items-start gap-4 p-8 bg-emerald-600 rounded-md shadow-lg"
        >
          {option1.icon && <h3 class="text-6xl">{option1.icon}</h3>}
          <p class="text-2xl font-medium">{option1.description}</p>
        </CookieSetterButton>
        <CookieSetterButton
          cookieData={{ value: option2.value, cookieName, cookieExpires }}
          class="flex flex-col justify-start items-start gap-4 p-8 bg-red-500 rounded-md shadow-lg"
        >
          {option2.icon && <h3 class="text-6xl">{option2.icon}</h3>}
          <p class="text-2xl font-medium">{option2.description}</p>
        </CookieSetterButton>
      </section>
    </div>
  );
}

// export default function HowIsUserFeeling(
//   { title }: SectionProps<typeof loader>,
// ) {

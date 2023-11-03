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
    bgColor?: string;
  };
  option2: {
    description: string;
    icon?: string;
    value: string;
    bgColor?: string;
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
  const options = [option1, option2];
  const possibleTailwindBgColors =
    "bg-gray-200 bg-gray-300 bg-gray-400 bg-gray-500 bg-gray-600 bg-red-200 bg-red-300 bg-red-400 bg-red-500 bg-red-600 bg-yellow-200 bg-yellow-300 bg-yellow-400 bg-yellow-500 bg-yellow-600 bg-green-200 bg-green-300 bg-green-400 bg-green-500 bg-green-600 bg-emerald-200 bg-emerald-300 bg-emerald-400 bg-emerald-500 bg-emerald-600 bg-blue-200 bg-blue-300 bg-blue-400 bg-blue-500 bg-blue-600 bg-indigo-200 bg-indigo-300 bg-indigo-400 bg-indigo-500 bg-indigo-600 bg-purple-200 bg-purple-300 bg-purple-400 bg-purple-500 bg-purple-600 bg-pink-200 bg-pink-300 bg-pink-400 bg-pink-500 bg-pink-600";
  return (
    <div id="askUserBox" class="p-12 max-w-6xl mx-auto">
      <h2 class="font-bold text-4xl my-6">{title}</h2>
      <section class="grid md:grid-cols-2 gap-6 text-gray-50">
        {options.map((option) => {
          const { value, icon, description, bgColor = "gray-500" } = option;
          return (
            <CookieSetterButton
              cookieData={{ value, cookieName, cookieExpires }}
              class={`flex flex-col justify-start items-start gap-4 p-8 bg-${bgColor} rounded-md shadow-lg transition hover:bg-${bgColor}/85 hover:scale-105`}
            >
              {icon && <h3 class="text-6xl">{icon}</h3>}
              <p class="text-2xl font-medium">{description}</p>
            </CookieSetterButton>
          );
        })}
      </section>
    </div>
  );
}

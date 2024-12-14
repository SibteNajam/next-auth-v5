import type { SVGProps } from "react";

export const ToggleIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="#797979"
        strokeWidth={1.4}
        d="M18 18h2m2 0h-2m0 0v-2m0 2v2M2 11h18M2 17h12M2 5h18"
      ></path>
    </svg>
  );
};

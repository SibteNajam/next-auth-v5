import type { SVGProps } from "react";

export const NightMode: React.FC<SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeDasharray={4}
        strokeDashoffset={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5">
          <animate
            id="lineMdMoonFilledAltLoop0"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.7s;lineMdMoonFilledAltLoop0.begin+6s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdMoonFilledAltLoop0.begin+2s;lineMdMoonFilledAltLoop0.begin+4s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdMoonFilledAltLoop0.begin+1.2s;lineMdMoonFilledAltLoop0.begin+3.2s;lineMdMoonFilledAltLoop0.begin+5.2s"
            dur="0.4s"
            values="0;4"
          ></animate>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdMoonFilledAltLoop0.begin+1.8s"
            to="M12 5h1.5M12 5h-1.5M12 5v1.5M12 5v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdMoonFilledAltLoop0.begin+3.8s"
            to="M12 4h1.5M12 4h-1.5M12 4v1.5M12 4v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdMoonFilledAltLoop0.begin+5.8s"
            to="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5"
          ></set>
        </path>
        <path d="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5">
          <animate
            id="lineMdMoonFilledAltLoop1"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1.1s;lineMdMoonFilledAltLoop1.begin+6s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdMoonFilledAltLoop1.begin+2s;lineMdMoonFilledAltLoop1.begin+4s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdMoonFilledAltLoop1.begin+1.2s;lineMdMoonFilledAltLoop1.begin+3.2s;lineMdMoonFilledAltLoop1.begin+5.2s"
            dur="0.4s"
            values="0;4"
          ></animate>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdMoonFilledAltLoop1.begin+1.8s"
            to="M17 11h1.5M17 11h-1.5M17 11v1.5M17 11v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdMoonFilledAltLoop1.begin+3.8s"
            to="M18 12h1.5M18 12h-1.5M18 12v1.5M18 12v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdMoonFilledAltLoop1.begin+5.8s"
            to="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5"
          ></set>
        </path>
        <path d="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5">
          <animate
            id="lineMdMoonFilledAltLoop2"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="2s;lineMdMoonFilledAltLoop2.begin+6s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdMoonFilledAltLoop2.begin+2s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdMoonFilledAltLoop2.begin+1.2s;lineMdMoonFilledAltLoop2.begin+3.2s"
            dur="0.4s"
            values="0;4"
          ></animate>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdMoonFilledAltLoop2.begin+1.8s"
            to="M20 5h1.5M20 5h-1.5M20 5v1.5M20 5v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdMoonFilledAltLoop2.begin+5.8s"
            to="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5"
          ></set>
        </path>
      </g>
      <path
        fill="currentColor"
        fillOpacity={0}
        stroke="currentColor"
        strokeDasharray={56}
        strokeDashoffset={56}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
      >
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="1.5s"
          dur="0.5s"
          values="0;1"
        ></animate>
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.6s"
          values="56;0"
        ></animate>
      </path>
    </svg>
  );
};

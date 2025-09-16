// import React from 'react';

// export const Spinner = ({ size = 40, color = 'var(--primary)' }) => {
//   const thickness = Math.round(size * 0.16);

//   return (
//     <>
//       <div
//         className="loader"
//         style={{
//           width: `${size}px`,
//           height: `${size}px`,
//           '--b': `${thickness}px`,
//           '--spinner-color': color,
//         }}
//       ></div>

//       <style>{`
//         .loader {
//           aspect-ratio: 1;
//           border-radius: 50%;
//           padding: 1px;
//           background: conic-gradient(#0000 10%, var(--spinner-color)) content-box;
//           -webkit-mask:
//             repeating-conic-gradient(#0000 0deg, #000 1deg 20deg, #0000 21deg 36deg),
//             radial-gradient(farthest-side, #0000 calc(100% - var(--b) - 1px), #000 calc(100% - var(--b)));
//           -webkit-mask-composite: destination-in;
//           mask-composite: intersect;
//           animation: l4 1s infinite steps(10);
//         }

//         @keyframes l4 {
//           to {
//             transform: rotate(1turn);
//           }
//         }
//       `}</style>
//     </>
//   );
// };



import React from "react";

export const Spinner = ({ size = 35, color = "var(--primary)" }) => {
  return (
    <>
      <style>
        {`
          .loader {
            width: var(--loader-size, 50px);
            aspect-ratio: 1;
            display: grid;
            border-radius: 50%;
            background:
              linear-gradient(0deg, color-mix(in srgb, var(--loader-color) 50%, transparent) 30%, transparent 0 70%, color-mix(in srgb, var(--loader-color) 100%, transparent) 0) 50%/8% 100%,
              linear-gradient(90deg, color-mix(in srgb, var(--loader-color) 25%, transparent) 30%, transparent 0 70%, color-mix(in srgb, var(--loader-color) 75%, transparent) 0) 50%/100% 8%;
            background-repeat: no-repeat;
            animation: l23 1s infinite steps(12);
          }
          .loader::before,
          .loader::after {
            content: "";
            grid-area: 1/1;
            border-radius: 50%;
            background: inherit;
            opacity: 0.915;
            transform: rotate(30deg);
          }
          .loader::after {
            opacity: 0.83;
            transform: rotate(60deg);
          }
          @keyframes l23 {
            100% { transform: rotate(1turn) }
          }
        `}
      </style>

      <div
        className="loader"
        style={{
          "--loader-size": `${size}px`,
          "--loader-color": color,
        }}
      ></div>
    </>
  );
};


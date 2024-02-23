// export svg components in alpha order
// carrot-small
export const CarrotSmall = ({ color }) => (
  <svg
    className="bf-carrot-small"
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
    fill={color}
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M7 10l5 5 5-5z" />
  </svg>
)

// carrot-big
export const CarrotBig = () => (
  <svg
    className="bf-carrot-big"
    width="13"
    height="22"
    viewBox="0 0 13 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.18079 1.18074C2.79027 0.790216 2.1571 0.790215 1.76658 1.18074L0.706337 2.24098C0.316114 2.6312 0.315768 3.26377 0.705565 3.65442L7.33029 10.2936C7.71979 10.684 7.71979 11.3159 7.33029 11.7063L0.705566 18.3455C0.315768 18.7361 0.316113 19.3687 0.706336 19.7589L1.76658 20.8192C2.1571 21.2097 2.79027 21.2097 3.18079 20.8192L12.2929 11.7071C12.6834 11.3165 12.6834 10.6834 12.2929 10.2928L3.18079 1.18074Z"
      fill="#162E51"
    />
  </svg>
)

// close
export const Close = () => (
  <svg
    className="bf-close"
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 13H5v-2h14v2z" fill="#ffffff" />
  </svg>
)

// death
export const Death = () => (
  <svg
    className="bf-death"
    width="223"
    height="268"
    viewBox="0 0 223 268"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="223" height="268" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use
          xlinkHref="#image0_2519_15995"
          transform="scale(0.0044843 0.00373134)"
        />
      </pattern>
      <image
        id="image0_2519_15995"
        width="223"
        height="268"
        xlinkHref="data:image/png;base64,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"
      />
    </defs>
  </svg>
)

// disability
export const Disability = () => (
  <svg
    className="bf-disability"
    width="45"
    height="58"
    viewBox="0 0 45 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0_2881_3177"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="45"
      height="58"
    >
      <path
        d="M15.2503 27.9979V33.8312C10.4378 33.8312 6.50033 37.7688 6.50033 42.5813C6.50033 47.3938 10.4378 51.3312 15.2503 51.3312C20.0628 51.3312 24.0003 47.3938 24.0003 42.5813H29.8337C29.8337 50.6313 23.3003 57.1646 15.2503 57.1646C7.20033 57.1646 0.666992 50.6313 0.666992 42.5813C0.666992 34.5312 7.20033 27.9979 15.2503 27.9979ZM32.6337 13.4146C36.9503 13.4146 39.8087 17.7896 38.0295 21.6688L33.1587 32.3729H38.5837C41.792 32.3729 44.417 34.9979 44.417 38.2062V54.2479H38.5837V39.6646H24.0587C19.8003 39.6646 16.9128 35.0854 18.6628 31.2063L24.0003 19.2479H17.5545L15.6587 23.7104L10.0587 22.1646L12.0128 16.9146C12.9753 14.7854 15.1045 13.4146 17.467 13.4146H32.6337ZM38.5837 0.40625C41.8053 0.40625 44.417 3.01792 44.417 6.23958C44.417 9.46124 41.8053 12.0729 38.5837 12.0729C35.362 12.0729 32.7503 9.46124 32.7503 6.23958C32.7503 3.01792 35.362 0.40625 38.5837 0.40625Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_2881_3177)">
      <path
        d="M15.2501 27.9979V33.8312C10.4376 33.8312 6.50008 37.7688 6.50008 42.5813C6.50008 47.3938 10.4376 51.3312 15.2501 51.3312C20.0626 51.3312 24.0001 47.3938 24.0001 42.5813H29.8334C29.8334 50.6313 23.3001 57.1646 15.2501 57.1646C7.20008 57.1646 0.666748 50.6313 0.666748 42.5813C0.666748 34.5312 7.20008 27.9979 15.2501 27.9979ZM32.6334 13.4146C36.9501 13.4146 39.8084 17.7896 38.0293 21.6688L33.1584 32.3729H38.5834C41.7918 32.3729 44.4168 34.9979 44.4168 38.2062V54.2479H38.5834V39.6646H24.0584C19.8001 39.6646 16.9126 35.0854 18.6626 31.2063L24.0001 19.2479H17.5543L15.6584 23.7104L10.0584 22.1646L12.0126 16.9146C12.9751 14.7854 15.1042 13.4146 17.4668 13.4146H32.6334ZM38.5834 0.40625C41.8051 0.40625 44.4168 3.01792 44.4168 6.23958C44.4168 9.46124 41.8051 12.0729 38.5834 12.0729C35.3618 12.0729 32.7501 9.46124 32.7501 6.23958C32.7501 3.01792 35.3618 0.40625 38.5834 0.40625Z"
        fill="#162E51"
      />
    </g>
  </svg>
)

// green-check
export const GreenCheck = () => (
  <svg
    className="bf-checkmark--green"
    width="24"
    height="20"
    viewBox="0 0 24 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 4.15417C23.9925 4.52794 23.8515 4.88618 23.6033 5.16208L12.2975 16.6522L10.1157 18.8696C9.84423 19.1219 9.49174 19.2651 9.12397 19.2727C8.7562 19.2651 8.40371 19.1219 8.13223 18.8696L5.95041 16.6522L0.396694 11.0079C0.148478 10.732 0.00748054 10.3738 0 10C0.00748054 9.62626 0.148478 9.26802 0.396694 8.99212L2.57851 6.77473C2.84999 6.52246 3.20248 6.37917 3.57025 6.37156C3.93802 6.37917 4.29051 6.52246 4.56198 6.77473L9.12397 11.4111L19.2397 1.13046C19.5111 0.878193 19.8636 0.734897 20.2314 0.727295C20.5992 0.734897 20.9517 0.878193 21.2231 1.13046L23.405 3.34785C23.8017 3.54943 24 3.75101 24 4.15417Z"
      fill="#009831"
    />
  </svg>
)

// modal-close
export const ModalClose = () => (
  <svg
    className="bf-modal-close"
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
)

// open
export const Open = () => (
  <svg
    className="bf-open"
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path fill="#1a4480" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
)

// retirement
export const Retirement = () => (
  <svg
    className="bf-retirement"
    width="57"
    height="58"
    viewBox="0 0 57 58"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25.6584 45.7497V45.7997H25.7084H31.2917H31.3417V45.7497V40.1663V40.1163H31.2917H25.7084H25.6584V40.1663V45.7497ZM17.2834 23.4163V23.4663H17.3334H22.9167H22.9667V23.4163C22.9667 20.3731 25.4568 17.883 28.5 17.883C31.5433 17.883 34.0334 20.3731 34.0334 23.4163C34.0334 24.7972 33.5164 25.789 32.7378 26.6432C32.1456 27.293 31.4046 27.861 30.6231 28.4601C30.3733 28.6516 30.1194 28.8462 29.8648 29.0477C28.8165 29.8776 27.764 30.8199 26.9742 32.1253C26.1839 33.4315 25.6584 35.0982 25.6584 37.3747V37.4247H25.7084H31.2917H31.3417V37.3747C31.3417 34.3398 33.3104 32.6192 35.3516 30.8352C35.4051 30.7885 35.4586 30.7417 35.5121 30.6949C37.6053 28.8634 39.7167 26.9306 39.7167 23.4163C39.7167 17.2191 34.6972 12.1997 28.5 12.1997C22.3028 12.1997 17.2834 17.2191 17.2834 23.4163ZM28.5 1.03301C13.0624 1.03301 0.533374 13.5621 0.533374 28.9997C0.533374 44.4373 13.0624 56.9663 28.5 56.9663C43.9377 56.9663 56.4667 44.4373 56.4667 28.9997C56.4667 13.5621 43.9377 1.03301 28.5 1.03301ZM28.5 51.283C16.2164 51.283 6.21671 41.2833 6.21671 28.9997C6.21671 16.716 16.2164 6.71634 28.5 6.71634C40.7837 6.71634 50.7834 16.716 50.7834 28.9997C50.7834 41.2833 40.7837 51.283 28.5 51.283Z"
      fill="#162E51"
      stroke="#162E51"
      strokeWidth="0.1"
    />
  </svg>
)

export default {
  CarrotBig,
  CarrotSmall,
  Close,
  Death,
  Disability,
  GreenCheck,
  ModalClose,
  Open,
  Retirement,
}

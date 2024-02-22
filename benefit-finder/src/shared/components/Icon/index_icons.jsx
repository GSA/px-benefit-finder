// export svg components in alpha order
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

export const Close = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 13H5v-2h14v2z" fill="#ffffff" />
  </svg>
)

export const GreenCheck = () => (
  <svg
    width="24"
    height="20"
    viewBox="0 0 24 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="bf-checkmark--green"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M24 4.15417C23.9925 4.52794 23.8515 4.88618 23.6033 5.16208L12.2975 16.6522L10.1157 18.8696C9.84423 19.1219 9.49174 19.2651 9.12397 19.2727C8.7562 19.2651 8.40371 19.1219 8.13223 18.8696L5.95041 16.6522L0.396694 11.0079C0.148478 10.732 0.00748054 10.3738 0 10C0.00748054 9.62626 0.148478 9.26802 0.396694 8.99212L2.57851 6.77473C2.84999 6.52246 3.20248 6.37917 3.57025 6.37156C3.93802 6.37917 4.29051 6.52246 4.56198 6.77473L9.12397 11.4111L19.2397 1.13046C19.5111 0.878193 19.8636 0.734897 20.2314 0.727295C20.5992 0.734897 20.9517 0.878193 21.2231 1.13046L23.405 3.34785C23.8017 3.54943 24 3.75101 24 4.15417Z"
      fill="#009831"
    />
  </svg>
)

export const InfoIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g id="USWDS Components">
      <g id="Icons">
        <g id="Fill">
          <path
            id="Vector"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9 5H11V7H9V5ZM9 9H11V15H9V9ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18Z"
            fill="black"
          />
        </g>
      </g>
    </g>
  </svg>
)

export const ModalClose = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
)

export const Open = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height="24"
    viewBox="0 0 24 24"
    width="24"
  >
    <path d="M0 0h24v24H0z" fill="none" />
    <path fill="#1a4480" d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
)

export default {
  CarrotBig,
  CarrotSmall,
  Close,
  GreenCheck,
  InfoIcon,
  ModalClose,
  Open,
}

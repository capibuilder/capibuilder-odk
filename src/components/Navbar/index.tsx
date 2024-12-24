import authStore from "@/context/authStores";
import useToken from "@/hooks/useToken";
import { odkAxios } from "@/utils/useAxios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import { Avatar } from "socialwell-design";
import { ConfirmPopup } from "..";
import {
  LeftItems,
  Logo,
  NavbarContainer,
  NavItem,
  NavItems,
  Profile,
  ProfileModel,
  RightItems,
  Wrapper,
} from "./styles";

const Navbar = () => {
  const { asPath, query, push } = useRouter();
  const [openModel, setOpenModel] = useState(false);
  const { logout, checkAuth, isLoggedIn, getDisplayName } = authStore();
  const { token } = useToken();
  const [logoutConfirm, setlogoutConfirm] = useState(false);
  const projectId = query.projectid as string;

  const [menuOpen, setMenuOpen] = useState(true);

  useEffect(() => {
    if (window.innerWidth < 900) {
      setMenuOpen(false);
    }
  }, []);

  const handleLogout = () => {
    odkAxios
      .delete(`/v1/sessions/${token}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        localStorage.removeItem("auth");
        logout();
        window.location.href = "/";
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("click", () => {
      setOpenModel(false);
    });
  }, []);

  if (
    asPath.includes("/login") ||
    asPath.includes("/sign-up") ||
    asPath.includes("/reset-password") ||
    asPath.includes("/auth/reset") ||
    asPath.includes("/dashboard/create") ||
    asPath.includes("/survey/design-survey") ||
    asPath.includes("/survey/email-survey") ||
    asPath === "/design-survey" ||
    (asPath.includes("/r/") && query.formId)
  ) {
    return null;
  }

  return (
    <>
      {logoutConfirm && (
        <ConfirmPopup
          onClose={() => {
            setlogoutConfirm(false);
          }}
          onConfirm={handleLogout}
          title="Logout"
          description="Are you sure you want to logout ?"
        />
      )}
      <NavbarContainer
        style={{
          background: asPath === "/" ? "transparent" : "#fff",
          width: asPath === "/" ? "98%" : "100%",
        }}
      >
        <Wrapper>
          <LeftItems>
            <Logo href={"/"}>
              <img
                src={"/images/logoCapibara.svg"}
                style={{ width: 40, height: 40, transform: "scaleX(-1)" }}
                alt="CAPIBuilder logo"
              />
              <span className="text-logo">
                <span className="light">CAPI</span>Builder
              </span>
            </Logo>
          </LeftItems>
          <button
            onClick={() => {
              setMenuOpen(prev => !prev);
            }}
            className="menu-btn"
          >
            {menuOpen ? <IoCloseSharp size={28} /> : <FiMenu size={28} />}
          </button>

          {menuOpen && (
            <NavItems>
              <NavItem
                onClick={() => {
                  window.innerWidth < 900 && setMenuOpen(false);
                }}
                href={"/projects"}
                active={(asPath === "/projects").toString()}
              >
                Projects
              </NavItem>

              <NavItem
                onClick={() => {
                  window.innerWidth < 900 && setMenuOpen(false);
                }}
                href={"/tags"}
                active={(asPath === "/tags").toString()}
              >
                Keywords
              </NavItem>
              <NavItem
                onClick={() => {
                  window.innerWidth < 900 && setMenuOpen(false);
                }}
                href={"/templates"}
                active={(asPath === "/templates").toString()}
              >
                Templates
              </NavItem>

              <NavItem
                className="sm"
                active=""
                href={"/"}
                onClick={() => {
                  setlogoutConfirm(true);
                }}
              >
                Logout
              </NavItem>
            </NavItems>
          )}

          <RightItems className="bmd">
            {!isLoggedIn && (
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => {
                    push("/");
                  }}
                  className="gs-btn lightbtn"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    push("/sign-up");
                  }}
                  className="gs-btn darkbtn"
                >
                  Try for free
                </button>
              </div>
            )}

            <>
              {isLoggedIn && (
                <Profile
                  onClick={e => {
                    e.stopPropagation();
                    setOpenModel(v => !v);
                  }}
                >
                  <Avatar useName={getDisplayName()} size="md" />
                  {/* <span>profile</span> */}
                  {openModel && (
                    <ProfileModel
                      onClick={e => {
                        e.stopPropagation();
                      }}
                    >
                      {!isLoggedIn && (
                        <>
                          <button onClick={() => push("/login")}>login</button>
                          <button onClick={() => push("/sign-up")}>
                            signup
                          </button>
                        </>
                      )}
                      {localStorage.getItem("auth") && (
                        <>
                          <button
                            onClick={() => {
                              push("/account");
                            }}
                          >
                            Edit Profile
                          </button>
                          <button
                            onClick={() => {
                              setlogoutConfirm(true);
                            }}
                          >
                            logout
                          </button>
                        </>
                      )}
                    </ProfileModel>
                  )}
                </Profile>
              )}
            </>
          </RightItems>
        </Wrapper>
      </NavbarContainer>
    </>
  );
};

export default Navbar;

const NavbBTN = (
  <svg
    width="65"
    height="55"
    viewBox="0 0 98 92"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_248_6897)">
      <g filter="url(#filter0_d_248_6897)">
        <path
          d="M27.0949 44.2843H54.5949L43.7616 33.451L45.9949 30.951L60.9949 45.951L45.9949 60.951L43.7616 58.451L54.5949 47.6177H27.0949V44.2843ZM77.0949 45.951C77.0949 63.451 62.9283 77.6177 45.4283 77.6177C27.9616 77.6177 13.7616 63.451 13.7616 45.951C13.7616 28.451 27.9283 14.2843 45.4283 14.2843C62.9283 14.2843 77.0949 28.451 77.0949 45.951ZM73.7616 45.951C73.7616 30.3177 61.0616 17.6177 45.4283 17.6177C29.7949 17.6177 17.0949 30.3177 17.0949 45.951C17.0949 61.5843 29.7949 74.2843 45.4283 74.2843C61.0949 74.2843 73.7616 61.5843 73.7616 45.951Z"
          fill="#4F0FFF"
        />
      </g>
      <path
        d="M26.5919 83.5674C27.6947 82.3243 28.0391 80.7151 28.8504 79.3227C29.0403 79.1636 29.1715 78.9457 29.2232 78.7035C29.2749 78.4612 29.244 78.2087 29.1357 77.986C29.0273 77.7633 28.8475 77.5833 28.625 77.4745C28.4025 77.3658 28.15 77.3346 27.9077 77.3859C26.3258 77.8316 25.6208 78.7551 24.7033 80.065C24.2759 80.6925 23.7195 81.2217 23.0714 81.6173C22.2351 81.9569 21.4742 82.4585 20.8324 83.0933C20.6551 83.3069 20.5508 83.5717 20.5348 83.8489C20.5189 84.1261 20.5921 84.4012 20.7438 84.6337C22.301 86.8869 25.2137 85.1614 26.5948 83.6073"
        fill="#D9D9D9"
      />
    </g>
    <path
      d="M76.8749 22.3558C77.3206 19.6564 83.0664 17.0434 80.7672 13.9619C80.6513 13.7964 80.4991 13.6595 80.3223 13.5617C80.1456 13.4638 79.9488 13.4075 79.7471 13.397C79.5453 13.3865 79.3437 13.4221 79.1578 13.5012C78.9718 13.5802 78.8063 13.7006 78.6739 13.8532C77.7939 14.9779 76.9786 16.1518 76.2321 17.3692C75.3766 18.7484 74.8515 20.3066 74.6978 21.9223C74.6075 23.3025 76.6279 23.7874 76.8749 22.3558Z"
      fill="#D9D9D9"
    />
    <path
      d="M64.1186 12.3539C64.5107 10.1597 65.7259 8.11633 65.4874 5.79752C65.4757 5.4634 65.3971 5.13502 65.2562 4.83182C65.1154 4.52861 64.9151 4.25674 64.6674 4.03227C64.5634 3.95967 64.4548 3.89388 64.3423 3.8353C64.1459 3.70502 63.9363 3.59588 63.717 3.50971C63.5327 3.44427 63.3359 3.4213 63.1414 3.44249C62.9469 3.46368 62.7597 3.52848 62.5937 3.63209C62.4278 3.7357 62.2874 3.87544 62.1829 4.04088C62.0785 4.20631 62.0127 4.3932 61.9906 4.58758C61.4796 5.6975 61.7224 7.38435 61.6838 8.5101C61.5195 9.84308 61.5769 11.1941 61.8538 12.5083C61.9466 12.7412 62.1111 12.9385 62.3236 13.0717C62.5361 13.2048 62.7855 13.2668 63.0355 13.2486C63.2856 13.2304 63.5234 13.1331 63.7144 12.9707C63.9054 12.8083 64.0398 12.5892 64.0979 12.3453"
      fill="#D9D9D9"
    />
    <path
      d="M46.202 9.25115C46.1412 8.11877 45.9891 6.99315 45.7471 5.88526C45.6507 5.19281 45.2922 4.56376 44.7457 4.12775C44.1992 3.69175 43.5062 3.48203 42.8097 3.54183C42.4337 3.57511 42.0782 3.72771 41.7951 3.97735C41.512 4.22698 41.3161 4.56058 41.236 4.92944C41.1682 5.3332 41.2457 5.74795 41.4548 6.09994C41.664 6.45192 41.9912 6.71832 42.3782 6.85177L42.3891 7.00137C42.4414 7.13212 42.4847 7.26634 42.5185 7.40305C42.7905 8.25052 43.1866 9.05296 43.6941 9.78418C44.2101 10.5388 44.5255 11.0172 45.4825 11.0781C45.7301 11.1744 46.0059 11.1685 46.2492 11.0615C46.4924 10.9545 46.6832 10.7553 46.7796 10.5076C46.8759 10.26 46.87 9.9842 46.763 9.74094C46.656 9.49769 46.4568 9.3069 46.2091 9.21054"
      fill="#D9D9D9"
    />
    <path
      d="M26.1963 15.0018C26.5511 14.5877 26.7656 14.0719 26.809 13.5283C26.8524 12.9848 26.7225 12.4415 26.4378 11.9764C26.3041 11.7571 26.1376 11.5595 25.9441 11.3906C25.868 11.3427 25.7879 11.3015 25.7046 11.2676L25.586 11.0155L25.3032 10.4345C24.3684 8.60736 21.5552 7.6987 20.3536 9.79122C20.2232 10.0709 20.1861 10.3851 20.2477 10.6875C20.3094 10.9899 20.4666 11.2645 20.6962 11.4708C20.9919 11.7429 21.3505 11.9373 21.7399 12.0367C21.8695 12.0273 22.0135 12.077 22.1553 12.0968L22.515 12.6322C22.8626 13.1383 23.3137 13.8275 23.9558 13.9713L24.1472 14.3986C24.2436 14.5962 24.3719 14.7766 24.5269 14.9325C24.5989 15.0847 24.712 15.2136 24.8536 15.3046C24.9951 15.3957 25.1594 15.4452 25.3277 15.4476C25.496 15.45 25.6616 15.4052 25.8057 15.3182C25.9497 15.2312 26.0665 15.1056 26.1428 14.9555"
      fill="#D9D9D9"
    />
    <path
      d="M16.522 28.2259C16.3594 27.3969 16.0288 26.61 15.5506 25.9136C15.0724 25.2173 14.4567 24.6261 13.7414 24.1766C12.4123 23.2705 9.95553 21.8848 8.5808 23.3883C8.31647 23.7047 8.18542 24.1115 8.21528 24.5227C8.24514 24.934 8.43357 25.3175 8.74084 25.5925C9.21877 25.9439 9.78122 26.1625 10.371 26.2261C10.8948 26.3856 11.3985 26.6047 11.8723 26.8791C12.4554 27.1776 13.0108 27.5083 13.5677 27.8589C13.8514 28.0388 14.5236 28.3209 14.6259 28.6243C15.0586 29.4751 16.6872 29.397 16.4721 28.2295"
      fill="#D9D9D9"
    />
    <path
      d="M11.5079 43.6026C9.48072 42.1957 7.00282 39.829 4.30471 41.0576C4.00228 41.1747 3.73992 41.3763 3.54895 41.6384C3.35797 41.9005 3.24644 42.212 3.22767 42.5358C3.2089 42.8596 3.28367 43.1819 3.44307 43.4643C3.60247 43.7467 3.83977 43.9773 4.12664 44.1286C4.39187 44.2718 4.67632 44.3761 4.97127 44.4382C5.17107 44.4841 5.37443 44.513 5.57912 44.5244C5.7025 44.5108 5.82111 44.4691 5.92579 44.4024C6.03047 44.3357 6.11841 44.2458 6.18283 44.1397C6.63624 44.1338 7.08608 44.2205 7.50477 44.3946C8.37977 44.7942 9.21402 45.2776 9.99584 45.838C11.2785 46.6573 12.7351 44.4861 11.478 43.6048"
      fill="#D9D9D9"
    />
    <path
      d="M93.3579 34.2142C94.784 32.1755 93.0523 30.0053 90.8931 29.6808C89.8717 29.5342 88.8307 29.6097 87.8412 29.9024C87.1866 30.2209 86.5139 30.5008 85.8266 30.7405C85.6256 30.7775 85.4453 30.8874 85.3203 31.0491C85.1953 31.2108 85.1344 31.413 85.1492 31.6168C85.164 31.8207 85.2535 32.0119 85.4005 32.1538C85.5476 32.2958 85.7418 32.3785 85.9461 32.3861C87.0466 32.506 88.1385 32.6946 89.2155 32.9508C89.7029 33.0197 90.1837 33.129 90.653 33.2776C90.7178 33.3093 90.7807 33.3449 90.8412 33.3843C90.954 33.5565 91.0776 33.8784 91.2161 34.1291C91.3347 34.2983 91.4901 34.4385 91.6706 34.5391C91.851 34.6398 92.0519 34.6983 92.2582 34.7103C92.4645 34.7224 92.6708 34.6876 92.8618 34.6086C93.0527 34.5295 93.2233 34.4084 93.3608 34.2541"
      fill="#D9D9D9"
    />
    <path
      d="M95.0987 48.3853C94.9384 47.6589 94.6246 46.9751 94.1785 46.3798C93.7324 45.7845 93.1641 45.2914 92.5119 44.9336C91.3175 44.0879 89.8263 43.4341 88.3786 44.0707C88.1457 44.1694 87.9544 44.3459 87.8375 44.5702C87.7205 44.7944 87.6852 45.0524 87.7375 45.2998C87.7899 45.5472 87.9266 45.7687 88.1243 45.9264C88.3221 46.0841 88.5685 46.1681 88.8213 46.1641L88.9111 46.1576C88.9813 46.1784 89.0501 46.2035 89.1171 46.2329C89.3198 46.3678 89.5146 46.5143 89.7004 46.6718C90.1577 47.0405 90.5946 47.4339 91.0092 47.8501C91.3755 48.3328 91.8375 48.7349 92.3662 49.0312C92.8949 49.3275 93.4789 49.5116 94.0819 49.5721C94.3736 49.5483 94.6441 49.4102 94.8345 49.1879C95.0249 48.9657 95.1199 48.6772 95.0987 48.3853Z"
      fill="#D9D9D9"
    />
    <path
      d="M91.2446 65.7299C91.2488 64.315 90.849 62.9283 90.0921 61.7329C89.7544 61.0461 89.334 60.4032 88.8402 59.8185C88.6114 59.549 88.3407 59.3181 88.0385 59.1348C87.923 59.063 87.57 58.7577 87.7163 58.9777C87.0654 58.0223 85.205 58.4983 85.4573 59.7634C85.7914 60.867 86.2384 61.9332 86.7912 62.9451C87.2664 64.1037 87.7002 65.2453 88.107 66.429C88.734 68.2985 91.191 67.4784 91.2475 65.7698"
      fill="#D9D9D9"
    />
    <path
      d="M78.2669 80.4401C78.6206 78.9595 78.5078 77.4058 77.9439 75.9918C77.6859 75.4256 77.3471 74.8997 76.9382 74.4306L76.453 73.8241C76.453 73.8241 75.8478 72.9457 76.0179 73.3544C75.9266 73.1211 75.7703 72.9189 75.5676 72.7717C75.3648 72.6245 75.1242 72.5385 74.8741 72.524C74.624 72.5094 74.3749 72.5669 74.1565 72.6896C73.938 72.8123 73.7594 72.995 73.6416 73.2161C72.9328 74.5008 73.2716 75.4388 73.8951 76.7069C74.5186 77.9751 74.3392 79.3718 74.8031 80.6515C74.9452 81.0194 75.2016 81.3318 75.5346 81.5429C75.8676 81.754 76.2597 81.8526 76.6529 81.824C77.0462 81.7955 77.4199 81.6413 77.7189 81.3843C78.0179 81.1273 78.2265 80.7811 78.3139 80.3966"
      fill="#D9D9D9"
    />
    <path
      d="M10.2996 66.8385C11.4922 65.9544 12.7568 65.1716 14.0801 64.4985C14.2491 64.4336 14.3957 64.3213 14.5024 64.175C14.609 64.0287 14.6712 63.8547 14.6814 63.674C14.6915 63.4932 14.6493 63.3134 14.5597 63.156C14.4701 62.9987 14.337 62.8706 14.1764 62.7871C12.6545 62.1256 11.1502 62.5356 9.63835 63.1166C8.90854 63.441 8.1529 63.7038 7.37931 63.9023C6.28164 64.1123 5.38892 64.1069 4.66906 65.1017C4.41845 65.4084 4.29479 65.7995 4.32348 66.1946C4.35216 66.5897 4.53102 66.9588 4.82332 67.2261C6.28347 68.6942 8.76248 67.7622 10.2989 66.8285"
      fill="#D9D9D9"
    />
    <path
      d="M53.087 90.8407C53.9837 89.382 53.6564 87.3604 53.4486 85.7412C53.2876 84.0588 52.829 82.4185 52.0942 80.8965C51.9838 80.7406 51.835 80.6158 51.6622 80.5342C51.4894 80.4526 51.2985 80.417 51.1079 80.4308C50.9173 80.4447 50.7335 80.5075 50.5743 80.6132C50.4151 80.7189 50.2859 80.8639 50.1992 81.0341C49.6959 82.6471 49.4792 84.3358 49.5589 86.0236C49.5871 87.6558 49.5753 89.7021 50.6634 91.0167C50.802 91.2099 50.9879 91.3643 51.2032 91.4651C51.4185 91.5659 51.6561 91.6098 51.8933 91.5926C52.1304 91.5754 52.3592 91.4976 52.5577 91.3667C52.7562 91.2359 52.9179 91.0563 53.0271 90.8451"
      fill="#D9D9D9"
    />
    <defs>
      <filter
        id="filter0_d_248_6897"
        x="3.7616"
        y="8.28433"
        width="83.3334"
        height="83.3333"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="5" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="effect1_dropShadow_248_6897"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_248_6897"
          result="shape"
        />
      </filter>
      <clipPath id="clip0_248_6897">
        <rect
          width="80"
          height="80"
          fill="white"
          transform="translate(7.09497 4.28433)"
        />
      </clipPath>
    </defs>
  </svg>
);

import { useRouter } from 'next/router';





import { HeroWrapper } from "./styles";

export default function Index() {

const router = useRouter();
  const { query, push } = useRouter();
  
  return (
    <HeroWrapper>
      <div className="inWrap">
        <h1>Form builder for the social impact data collection, using ODK</h1>
        <p className="text">
          The fastest, simplest, and most cost-effective way for the social impact initiatives
          to design, test, iterate, and translate forms for survey and data
          collection for any app that uses open source Open Data Kit (ODK).
        </p>
        <div className="flex">
          <button className="darkbtn" onClick={() => {
                    push("/sign-up");
                  }}
                  
                >Try for free</button>

          <button className="lightbtn">
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.33333 10L10 7L5.33333 4V10ZM7 13.6667C6.07777 13.6667 5.21111 13.4916 4.4 13.1413C3.58888 12.7911 2.88333 12.3162 2.28333 11.7167C1.68333 11.1167 1.20844 10.4111 0.858662 9.6C0.508884 8.78889 0.333773 7.92222 0.333328 7C0.333328 6.07778 0.508439 5.21111 0.858662 4.4C1.20888 3.58889 1.68377 2.88333 2.28333 2.28333C2.88333 1.68333 3.58888 1.20844 4.4 0.858665C5.21111 0.508888 6.07777 0.333777 7 0.333332C7.92222 0.333332 8.78888 0.508443 9.59999 0.858665C10.4111 1.20889 11.1167 1.68378 11.7167 2.28333C12.3167 2.88333 12.7918 3.58889 13.142 4.4C13.4922 5.21111 13.6671 6.07778 13.6667 7C13.6667 7.92222 13.4916 8.78889 13.1413 9.6C12.7911 10.4111 12.3162 11.1167 11.7167 11.7167C11.1167 12.3167 10.4111 12.7918 9.59999 13.142C8.78888 13.4922 7.92222 13.6671 7 13.6667Z"
                fill="#6F47EB"
              />
            </svg>
            Deploy CAPIBuilder Open Source
          </button>
        </div>
        <div className="btmText flex">
          <p>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.8 8.3L9.325 4.775L8.625 4.075L5.8 6.9L4.375 5.475L3.675 6.175L5.8 8.3ZM6.5 11C5.80833 11 5.15833 10.8687 4.55 10.606C3.94167 10.3433 3.4125 9.98717 2.9625 9.5375C2.5125 9.0875 2.15633 8.55833 1.894 7.95C1.63167 7.34167 1.50033 6.69167 1.5 6C1.5 5.30833 1.63133 4.65833 1.894 4.05C2.15667 3.44167 2.51283 2.9125 2.9625 2.4625C3.4125 2.0125 3.94167 1.65633 4.55 1.394C5.15833 1.13167 5.80833 1.00033 6.5 1C7.19167 1 7.84167 1.13133 8.45 1.394C9.05833 1.65667 9.5875 2.01283 10.0375 2.4625C10.4875 2.9125 10.8438 3.44167 11.1065 4.05C11.3692 4.65833 11.5003 5.30833 11.5 6C11.5 6.69167 11.3687 7.34167 11.106 7.95C10.8433 8.55833 10.4872 9.0875 10.0375 9.5375C9.5875 9.9875 9.05833 10.3438 8.45 10.6065C7.84167 10.8692 7.19167 11.0003 6.5 11Z"
                fill="#6F47EB"
              />
            </svg>
            No credit card required
          </p>
          <p>
            <svg
              width="13"
              height="12"
              viewBox="0 0 13 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.8 8.3L9.325 4.775L8.625 4.075L5.8 6.9L4.375 5.475L3.675 6.175L5.8 8.3ZM6.5 11C5.80833 11 5.15833 10.8687 4.55 10.606C3.94167 10.3433 3.4125 9.98717 2.9625 9.5375C2.5125 9.0875 2.15633 8.55833 1.894 7.95C1.63167 7.34167 1.50033 6.69167 1.5 6C1.5 5.30833 1.63133 4.65833 1.894 4.05C2.15667 3.44167 2.51283 2.9125 2.9625 2.4625C3.4125 2.0125 3.94167 1.65633 4.55 1.394C5.15833 1.13167 5.80833 1.00033 6.5 1C7.19167 1 7.84167 1.13133 8.45 1.394C9.05833 1.65667 9.5875 2.01283 10.0375 2.4625C10.4875 2.9125 10.8438 3.44167 11.1065 4.05C11.3692 4.65833 11.5003 5.30833 11.5 6C11.5 6.69167 11.3687 7.34167 11.106 7.95C10.8433 8.55833 10.4872 9.0875 10.0375 9.5375C9.5875 9.9875 9.05833 10.3438 8.45 10.6065C7.84167 10.8692 7.19167 11.0003 6.5 11Z"
                fill="#6F47EB"
              />
            </svg>
            14-day free trial
          </p>
        </div>
      </div>
    </HeroWrapper>
  );
}

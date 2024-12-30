# CAPIBuilder for Open Data Kit (ODK)

`CAPIBuilder` is an open-source web application built with Next.js, TypeScript, and Styled-Component CSS. CAPIBuilder solves an important problem in the data collection process by providing a user-friendly interface for creating and managing survey forms, collecting responses, and reviewing data for Open Data Kit (ODK) API.

## Before you begin

CAPIBuilder provides only the web application. To use it, you will need to run the ODK Central server, which is available here:
https://github.com/getodk/central

### Environment Variables (.env)

First, copy the example environment file to create your own `.env` file:

```sh
cp .env.example .env
```

Then edit the `.env` file in the root directory of the project and update the following environment variables:

```
NEXT_PUBLIC_ODK_CENTRAL_REST_API (The URL of the ODK Central REST API)
NEXT_PUBLIC_ODK_ADMIN_EMAIL (The email of the ODK Central admin user)
NEXT_PUBLIC_ODK_ADMIN_PASSWORD (The password of the ODK Central admin user)
NEXT_PUBLIC_GOOGLE_MEASUREMENT_ID (The Google Measurement ID)
NEXT_PUBLIC_DOCS_URL (The URL of the documentation, optional)
NEXT_PUBLIC_KEYWORDS_REST_API (The URL of the Keywords REST API)
NEXT_PUBLIC_TRANSLATIONS_REST_API (The URL of the Translations REST API)
NEXT_PUBLIC_TEMPLATE_REST_API (The URL of the Template REST API)
NEXT_PUBLIC_API_KEY (The API key for the API)
```

## Installation

The deployment can be done by running the command or docker.

### Clone the repository to your local machine

```sh
git clone https://github.com/capibuilder/capibuilder-odk
```

### Navigate to the project directory

```sh
cd capibuilder-odk
```

### Install the dependencies

You can install the dependencies using either **Yarn** or **NPM**:

- **Yarn**:

  ```sh
  yarn
  ```

- **NPM**:

  ```sh
  npm install
  ```

---

## Running the Project

To start the development server, you can use either **Yarn** or **NPM**:

- **Yarn**:

  ```sh
  yarn dev
  ```

- **NPM**:

  ```sh
  npm run dev
  ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the project.

---

## Build and Running in Production

### Build the project

- **Yarn**:

  ```sh
  yarn build
  ```

- **NPM**:

  ```sh
  npm run build
  ```

### Start the production server

- **Yarn**:

  ```sh
  yarn start
  ```

- **NPM**:

  ```sh
  npm run start
  ```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the production build.

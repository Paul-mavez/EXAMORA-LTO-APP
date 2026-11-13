# Examora LTO Reviewer

Examora is an LTO reviewer available as a browser-based React app and as a native Android app. Choose the version you want to run below.

## Web app

### Requirements

- Node.js 20.19+ or 22.12+
- npm

### Start the development server

From the repository root:

```bash
npm install
npm run dev
```

Open the URL printed by Vite (by default, <http://localhost:3000>).

Useful commands:

```bash
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build locally
npm run lint     # Type-check the TypeScript project
```

## Android app

### Requirements

- Android Studio
- JDK 17
- Android SDK 35

### Run on an emulator or device

1. Open the repository's `android/` directory in Android Studio.
2. Allow Gradle to sync and install any requested Android SDK components.
3. Start an Android emulator or connect a device with USB debugging enabled.
4. Select the `app` run configuration and click **Run**.

The Android project is a native Jetpack Compose app and is separate from the web app. It requires Android 8.0 (API 26) or newer. The repository does not include a Gradle wrapper, so use Android Studio's bundled Gradle integration to sync and run it.

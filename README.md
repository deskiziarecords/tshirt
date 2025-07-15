# T-Shirt Design Application with React - TypeScript & Fabric

## Before start

**IMPORTANT:** You need to add your Google Fonts API key to `src/config.json` before running the application.

### Getting a Google Fonts API Key:
1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Fonts Developer API
4. Go to "Credentials" and create an API key
5. Copy your API key and replace `YOUR_GOOGLE_FONTS_API_KEY_HERE` in `src/config.json`
## Install using yarn or npm

### Configure the API Key:
Edit `src/config.json` and replace the placeholder with your actual API key:
```json
{
  "google_access_key": "your_actual_api_key_here"
}
```
```
yarn install
yarn start
```
import { Config } from "@remotion/cli/config";

// Screenshots and the logo come straight from the app's public/ folder.
Config.setPublicDir("../public");
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setChromiumOpenGlRenderer("angle");

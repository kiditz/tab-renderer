import "vuetify/styles";
import "@mdi/font/css/materialdesignicons.css";

import { createVuetify } from "vuetify";

export default createVuetify({
  theme: {
    defaultTheme: "studio",

    themes: {
      light: {
        dark: false,
        colors: {
          primary: "#1976D2",
        },
      },

      dark: {
        dark: true,
        colors: {
          primary: "#90CAF9",
        },
      },
      studio: {
        dark: true,
        colors: {
          primary: "#FFB300",
          surface: "#181818",
          background: "#121212",
        },
      },
    },
  },
});

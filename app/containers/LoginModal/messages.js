import {defineMessages} from "react-intl";

export default defineMessages({
  login: {
    id: "LoginModal.login",
    defaultMessage: "Login",
  },
  hint: {
    id: "LoginModal.hint",
    defaultMessage: `Connect mazenger to your facebook account. Your login data will be transferred to the facebook 
    server once and discarded right after. We only save your session inside the local storage.`,
  },
  email: {
    id: "LoginModal.email",
    defaultMessage: "Email",
  },
  password: {
    id: "LoginModal.password",
    defaultMessage: "Password",
  },
});

import * as yup from "yup";

let login = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email(),
  password: yup.string().min(4).max(7).password(),
});

export default login;

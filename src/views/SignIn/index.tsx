import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import { Form, Formik, Field } from "formik";
import APP_PATHS from "@/paths.constants";
import useAuthentication from "@/store/authentication";
import { signInValidation } from "@/utils/validations/auth";
import LoadingButton from "@mui/lab/LoadingButton";
import { FormValues } from "./types";

const SignIn = () => {
  const { state = {} } = useLocation();
  const from =
    (state as unknown as { from?: string })?.from || APP_PATHS.DASHBOARD;
  const navigate = useNavigate();
  const [store] = useAuthentication();
  const { isAuthenticated } = store;
  
  const handleSubmit = async (
    values: FormValues,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setSubmitting(true);

    try {
    //  const data = await mockFirebaseLogin(values);
      //   addUser(user);
      //   addToken(token);

      navigate(from);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  //navigate to intended url if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from);
    }
  }, [isAuthenticated]);

  return (
    <>
      <Card className="max-w-[450px] bg-white w-full bg-transparent px-0 mt-6 py-10">
        <div className="text-center space-y-1">
          <h1 className="h3 !font-heroNew text-gray-700">Sign In</h1>
          <p className="text-[#746C6A]">Sign in to your account</p>
        </div>
        <Card className="bg-white">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={signInValidation}
            onSubmit={(values, { setSubmitting }) =>
              handleSubmit(values, setSubmitting)
            }
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form className="flex flex-col gap-5 my-4 lg:px-6">
                <Field type="email" name="email" placeholder="Email" />
                <Field type="password" name="password" placeholder="Password" />
                <LoadingButton
                  loading={isSubmitting}
                  type="submit"
                  disabled={!(isValid && dirty)}
                >
                  Continue
                </LoadingButton>
              </Form>
            )}
          </Formik>
        </Card>
      </Card>
    </>
  );
};

export default SignIn;

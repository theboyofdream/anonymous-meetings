"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { object, string } from "yup";

const JOINING_MEET_FORM_SCHEMA = object({
  joining_code: string()
    .min(6, "Invalid Joining code")
    .max(6, "Invalid Joining code")
    .required("Joining code is required."),
});

export default function Home() {
  const router = useRouter();

  const meetJoinForm = useFormik({
    initialValues: {
      joining_code: "",
    },
    validationSchema: JOINING_MEET_FORM_SCHEMA,
    onSubmit: async (values, formikHelpers) => {
      console.log(values);

      formikHelpers.setSubmitting(true);
      let isJoiningCodeValid = false;

      const requestHeaders = new Headers();
      requestHeaders.append("Content-Type", "application/json");

      // Delay request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await fetch("http://localhost:4000/is-joining-code-valid", {
        method: "POST",
        headers: requestHeaders,
        body: JSON.stringify({ joiningCode: values.joining_code }),
        redirect: "follow",
      })
        .then((res) => res.json())
        .then((res) => {
          isJoiningCodeValid = res.data?.isJoiningCodeValid ?? false;
          if (!res.data?.isJoiningCodeValid) {
            formikHelpers.setFieldError("joining_code", res.message);
          }
        });

      formikHelpers.setSubmitting(false);

      if (isJoiningCodeValid) {
        router.push(`/meet/${values.joining_code}`);
      }
    },
  });

  const createNewMeet = useFormik({
    initialValues: { dummyField: "" },
    onSubmit: async (values, formikHelpers) => {
      formikHelpers.setSubmitting(true);

      // Delay request
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await fetch("http://localhost:4000/new-meet", {
        method: "POST",
        redirect: "follow",
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.data?.meetID) {
            router.push(`/meet/${res.data.meetID}`);
          }
        });

      formikHelpers.setSubmitting(false);
    },
  });

  return (
    <div className="flex flex-col min-h-screen p-8 gap-8 justify-center items-center sm:p-20 font-[family-name:var(--font-helvetica)]">
      <div className="flex justify-center items-center gap-2">
        <span className="text-sm">300 site visits</span>
        <span className="text-sm opacity-25">|</span>
        <span className="text-sm">12 online</span>
      </div>
      <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
        Anonymous meet
      </h1>
      <div className="flex flex-col gap-4 p-4">
        <span>
          <form className="flex gap-2" onSubmit={meetJoinForm.handleSubmit}>
            <Input
              id="input"
              name="joining_code"
              className="border-current border-b-2"
              placeholder="Enter joining Code"
              type="text"
              maxLength={6}
              minLength={6}
              autoCorrect="none"
              autoCapitalize="none"
              autoComplete="none"
              aria-autocomplete="none"
              required
              onChange={meetJoinForm.handleChange("joining_code")}
              onBlur={meetJoinForm.handleBlur("joining_code")}
              enterKeyHint="done"
            />
            <Button
              type="submit"
              onClick={() => meetJoinForm.handleSubmit()}
              disabled={meetJoinForm.isSubmitting || !meetJoinForm.isValid}
            >
              {meetJoinForm.isSubmitting ? "Joining..." : "Join"}
            </Button>
          </form>
          {meetJoinForm.errors.joining_code && (
            <span className="flex gap-0.5 items-center text-sm text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="text-sm w-4 h-4 fill-red-500"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
              </svg>
              {meetJoinForm.errors.joining_code}
            </span>
          )}
          {/* </span> */}
        </span>

        <div className="flex justify-center items-center gap-2">
          <h4>or</h4>
        </div>

        <form onSubmit={createNewMeet.handleSubmit} className="w-full">
          <Button
            className="w-full"
            disabled={createNewMeet.isSubmitting || meetJoinForm.isSubmitting}
            onClick={() => createNewMeet.handleSubmit()}
            type="submit"
          >
            {createNewMeet.isSubmitting
              ? "Creating new meet..."
              : "Create new meet"}
          </Button>
        </form>

        <Button
          //   variant={"link"}
          variant={"ghost"}
          size={"lg"}
          onClick={() => {
            window.open(
              "https://github.com/theboyofdream/anonymous-meetings",
              "_blank"
            );
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="bi bi-github w-6 aspect-square"
            viewBox="0 0 16 16"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
          </svg>
          Github
        </Button>
      </div>
    </div>
  );
}

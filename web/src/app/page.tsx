"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
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
        <form
          className="flex gap-2"
          onSubmit={(e) => {
            e.preventDefault();

            const joiningCode = e.target?.joining_code.value || "";
            if (joiningCode.length == 6) {
              window.open(
                `${window.location.href}/meet/${joiningCode}`,
                "_self"
              );
            }
          }}
        >
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
          />
          <Button>Join</Button>
        </form>

        <div className="flex justify-center items-center gap-2">
          <h4>or</h4>
        </div>

        <Button>Create new meet</Button>

        <Button
          //   variant={"link"}
          variant={"ghost"}
          size={"lg"}
          onClick={() => {
            window.open("https://github.com/theboyofdream", "_blank");
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

import { define } from "../utils.ts";
import { headerTitle } from "../utils/model.ts";
import { Head } from "fresh/runtime";
import IsOneThousandNineHundredAndNinetyNineForm from "../islands/IsOneThousandNineHundredAndNinetyNineForm.tsx";

export default define.page(function IsOneThousandNineHundredAndNinetyNine() {
  return (
    <div class="w-full h-full max-w-3xl mx-auto py-12 px-4 pt-24">
      <Head>
        <title>{headerTitle({ title: "1999" })}</title>
      </Head>

      <div class="justify-center flex flex-col items-center relative mx-auto max-w-3xl px-4">
        <h1 class="text-center text-2xl font-display font-bold text-text-primary mb-6">
          Is one thousand nine hundred and ninety nine ?
        </h1>
        <p class="text-center text-text-secondary mb-6 max-w-md">
          Comment je fais pour savoir ? C'est simple, j'utilise{` `}
          <a
            href="https://github.com/HorebZ/is-one-thousand-nine-hundred-and-ninety-nine"
            target="_blank"
            class="text-text-primary hover:text-link-hover transition-colors text-decoration: underline text-underline-offset-3px text-decoration-thickness-2px transition-background-color-05s-ease-in-out"
          >
            ce super petit package
          </a>
          . n'oublie pas de star le repo pour soutenir son créateur (et l'open
          source :p) !
        </p>

        <IsOneThousandNineHundredAndNinetyNineForm />
      </div>
    </div>
  );
});

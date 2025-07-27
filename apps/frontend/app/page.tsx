'use client'

import Appbar from "@/components/Appbar";
import Prompt from "@/components/Prompt";
import TemplateButtons from "@/components/TemplateButtons";

export default function Home() {
  return (
    <div className="min-h-screen w-full text-white">
        <Appbar />
        <div className=" max-w-2xl mx-auto pt-32">
          <div className="text-2xl font-bold text-center">
            What Do You Want To Build?
          </div>
          <div className="text-center text-sm p-2 text-muted-foreground">
            Promt, click generate and watch your app come to life
          </div>
          <div className="pt-4">
            <Prompt />
          </div>
        </div>
        <div className="max-w-2xl mx-auto pt-4">
          <TemplateButtons />
        </div>
    </div>
  );
}

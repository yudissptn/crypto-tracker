import { MainPage } from "@/components/main-page";
import { TypographyH2 } from "@/components/ui/typography";


export default async function Home() {
  return (
    <>
      <header>
        <nav className="border-b bg-slate-50">
          <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <TypographyH2>Crypto Price</TypographyH2>
            </div>
          </div>
        </nav>
      </header>
      <MainPage />
    </>
  );
}

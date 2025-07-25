"use client";
import Link from "next/link";
import { TypographyH2 } from "../ui/typography";
import { ConnectWalletButton } from "./connect-wallet";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { Button } from "../ui/button";

const NavBar: React.FC<{}> = () => {
  const host =
    typeof window !== "undefined" ? window.location.host : "defaultHost";

  const sdkOptions = {
    logging: { developerMode: false },
    checkInstallationImmediately: false,
    dappMetadata: {
      name: "Next-Metamask-Boilerplate",
      url: host, // using the host constant defined above
    },
  };
  return (
    <header>
      <nav className="border-b bg-slate-800">
        <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
          <div className="mx-auto max-w-5xl px-2 sm:px-6 lg:px-8">
            <div className="relative text-white flex h-12 items-center justify-between">
              <div className="flex items-baseline gap-3">
                <Link href={"/"}>
                  <TypographyH2>Crypto Price</TypographyH2>
                </Link>
                <Link href={"/crypto"}>
                  <Button
                    variant="ghost"
                    className="hover:bg-primary/80 hover:text-primary-foreground"
                  >
                    Overview
                  </Button>
                </Link>
              </div>
              <ConnectWalletButton />
            </div>
          </div>
        </MetaMaskProvider>
      </nav>
    </header>
  );
};

export default NavBar;

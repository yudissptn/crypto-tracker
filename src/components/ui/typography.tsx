import { ReactNode } from "react";

export function TypographyH2(props: { children: ReactNode }) {
    return (
        <h2 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight first:mt-0">
            {props.children}
        </h2>
    )
}

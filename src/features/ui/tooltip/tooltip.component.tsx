import {FC, ReactNode, useRef} from "react";

interface Props {
    children: ReactNode;
    tooltip?: string;
    additionalClass?: string;
}

export const ToolTip: FC<Props> = (
    {
        children,
        tooltip,
        additionalClass
    }) => {
    const tooltipRef = useRef<HTMLSpanElement>(null);
    const container = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={container}
            onMouseEnter={({clientX}) => {
                if (!tooltipRef.current || !container.current) return;
                const {left} = container.current.getBoundingClientRect();
                tooltipRef.current.style.left = clientX - left + "px";
            }}
            className={`group relative inline-block my-auto h-fit z-50 ${additionalClass}`}
        >
            {children}
            {tooltip ? (
                <span
                    ref={tooltipRef}
                    className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-zinc-500 text-white p-1 rounded absolute top-full mt-2 whitespace-wrap"
                >
            {tooltip}
        </span>
            ) : null}
        </div>
    );
};
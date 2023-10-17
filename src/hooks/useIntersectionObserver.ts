import { DependencyList, useCallback, useRef } from "react";

export default function useIntersectionObserver<T extends HTMLElement>(
    callback: (node: T | null) => void,
    deps: DependencyList
) {
    const observer = useRef<IntersectionObserver | null>(null);
    const ref = useCallback(
        (node: T | null) => {
            if (deps.every(Boolean)) {
                observer.current?.disconnect();
                observer.current = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) callback(node);
                });
                if (node) observer.current.observe(node);
            }
        },
        [deps, callback]
    );
    return ref;
}

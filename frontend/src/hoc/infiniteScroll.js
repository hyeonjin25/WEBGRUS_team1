/*
무한 스크롤 구현을 위한 Intersection Observer API를 이용한 훅
https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
https://y0c.github.io/2019/06/30/react-infinite-scroll/
*/

import { useEffect } from 'react';

export default function useInfinteScroll({
    root = null,
    target,
    onIntersect,
    threshold = 1.0,
    rootMargin = '0px',
}) {
    useEffect(() => {
        const observer = new IntersectionObserver(onIntersect, { root, rootMargin, threshold, });
        if (!target) return;
        observer.observe(target);
        return () => { observer.unobserve(target); };
    }, [target, root, rootMargin, onIntersect, threshold]);
};
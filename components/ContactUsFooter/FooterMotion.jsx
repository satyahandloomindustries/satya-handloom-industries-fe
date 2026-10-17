'use client';

import { useEffect, useRef } from 'react';
import styles from './index.module.css';

const FooterMotion = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      el.dataset.shown = 'true';
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.shown = 'true';
          observer.disconnect();
          return;
        }
        el.dataset.ready = 'true';
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={ref}
      className={`${styles.footer} mt-16 bg-[#f4eadc] text-[#2a2118]`}
    >
      <span className={styles.thread} aria-hidden="true" />
      {children}
    </footer>
  );
};

export default FooterMotion;

import React from 'react';
import styles from './index.module.css';
import clsx from 'clsx';

const BlogsWindow = () => {
  return (
    <div className="flex-1 h-full bg-gray-100 relative">
      <div
        className="pt-8 px-10 overflow-y-scroll"
        style={{ height: 'calc(100%  - 100px)' }}
      >
        <h1 className="text-center text-2xl">BlogsWindow</h1>
        <div className="py-6">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto itaque
          doloremque, corporis, consectetur ipsa voluptates nisi magni,
          voluptatum sed deleniti officiis fugiat provident beatae nulla dolores
          voluptatibus esse nobis asperiores? Cumque quo soluta asperiores
          laudantium culpa consequuntur cum porro eius id, cupiditate expedita
          praesentium iure. Aliquid minus sed distinctio cumque hic unde
          exercitationem expedita id facere obcaecati necessitatibus a labore
          error eaque autem eligendi accusamus odit, ipsum ut corrupti placeat
          harum tenetur dolorem! Cumque vero, dolore possimus molestiae a ipsa
          illum quibusdam consectetur pariatur ullam provident illo nam ducimus
          aperiam minus tempore quae dicta soluta natus vel cum atque. Tenetur?
        </div>

        <div className="mt-6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti,
          sit eum repudiandae voluptates quo porro tenetur modi molestiae
          corporis similique.
        </div>

        <div className="mt-6">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti,
          sit eum repudiandae voluptates quo porro tenetur modi molestiae
          corporis similique.
        </div>
      </div>
      <div className="bg-gray-200 w-full h-[100px] absolute bottom-0">
        <div className="relative w-full h-full">
          <div className={clsx(styles.wave, styles.wave1)}></div>
          <div className={clsx(styles.wave, styles.wave2)}></div>
        </div>
      </div>
    </div>
  );
};

export default BlogsWindow;

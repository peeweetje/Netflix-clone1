'use client';

import type { CastMemberProps } from '../../utils/types/types';

export const CastMember= ({ actor, src, alt }: CastMemberProps) => {
  return (
    <div className="flex flex-col items-center text-center p-4 rounded-xl bg-hover transition-transform duration-200 hover:scale-105">
      {src && src !== '' ? (
        <img
          src={src}
          alt={alt}
          className="w-28 h-42 object-cover rounded-xl mb-2"
        />
      ) : (
        <div className="w-28 h-42 bg-border rounded-xl mb-2 flex items-center justify-center text-muted text-xs">
          N/A
        </div>
      )}
      <h3 className="text-md font-bold mb-1 text-white">
        {actor.name}
      </h3>
      <p className="text-primary-light text-md m-0">
        {actor.character}
      </p>
    </div>
  );
};

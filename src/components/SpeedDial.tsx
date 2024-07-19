// SpeedDial.tsx
import { PlusIcon } from "@heroicons/react/20/solid";
import React, { useEffect, useRef, useState } from "react";

interface SpeedDialProps {
  actions: { icon: React.ReactNode; name: string; onClick: () => void }[];
}

const SpeedDial: React.FC<SpeedDialProps> = ({ actions }) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen(!open)}
        className={`btn btn-circle btn-primary fixed bottom-6 right-6 transition-transform ${
          open ? "rotate-45" : ""
        }`}
      >
        <span className="absolute h-[35px] w-[35px] animate-ping rounded-full bg-primary"></span>
        <PlusIcon className="h-6 w-6" />
      </button>
      <div
        className={`absolute bottom-20 right-6 flex flex-col items-end space-y-2 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {actions.map((action, index) => (
          <div
            key={index}
            className={`flex transform items-center space-x-2 transition-all duration-300 ${
              open ? "scale-100" : "scale-75 opacity-0"
            }`}
          >
            {" "}
            <p>{action.name}</p>
            <button
              onClick={action.onClick}
              className=" btn btn-circle btn-secondary"
              aria-label={action.name}
            >
              {action.icon}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeedDial;

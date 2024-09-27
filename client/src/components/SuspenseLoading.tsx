import { LoaderCircle } from "lucide-react";
import { useEffect, useState, FC } from "react";

function SuspenseLoading() {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <LoaderCircle size={40} className="animate-spin" />
      <p>loading...</p>
    </div>
  );
}

export interface LazyLoaderProps {
  delay?: number;
}

const LazyLoader: FC<LazyLoaderProps> = ({ delay = 250, ...props }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return show ? <SuspenseLoading {...props} /> : null;
};

export { LazyLoader as default };

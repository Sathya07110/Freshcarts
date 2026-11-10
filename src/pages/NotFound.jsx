
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <main className="mx-auto my-[35px] flex min-h-[70vh] w-[calc(100%-64px)] max-w-[1600px] flex-col items-center justify-center text-center max-[600px]:w-[calc(100%-30px)] max-[480px]:mt-[22px]">

      <h1 className="m-0 text-[100px] text-[#176b39] max-[480px]:text-[75px]">
        404
      </h1>

      <h2 className="my-[5px]">Page Not Found</h2>

      <p className="text-[#68776c]">
        Sorry! The page you are looking for does not exist.
      </p>

      <Link to="/" className="my-[10px] inline-block font-bold text-[#176b39] no-underline">
        Back to Home
      </Link>

    </main>
  );
}

export default NotFound;

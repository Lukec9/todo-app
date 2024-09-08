import NavLinks from "@/components/home-page/nav-links";

export default function Home() {
  return (
    <div
      className="flex justify-center items-center h-screen bg-gradient-to-br 
    from-gray-900 via-green-900
     to-emerald-900"
    >
      <div className="text-center max-w-lg p-5 text-white">
        <h1 className="text-4xl mb-5">Welcome to the Todo App!</h1>
        <p className="text-lg mb-8">
          This is a simple Todo application. Easily manage your tasks and stay
          organized. Once logged in, you can manage your todos, add new ones, edit
          existing ones, and mark them as completed.
        </p>
        <div className="flex justify-center">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}

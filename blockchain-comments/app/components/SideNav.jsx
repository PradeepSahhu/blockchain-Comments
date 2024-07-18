import Link from "next/link";

export default function SideNav() {
  return (
    <div className="w-36 h-screen bg-gray-800 text-white p-4">
      <div>
        <div href="/" className="block p-2 hover:bg-gray-700 rounded">
          Home
        </div>
      </div>
      <div className="bg-gray-900 rounded-lg ">
        <div href="/about" className="block p-2 hover:bg-gray-700 rounded">
          About
        </div>
      </div>
      <div>
        <div className="group relative">
          <div href="/services" className="block p-2 hover:bg-gray-700 rounded">
            Services
          </div>
          <div className="hidden group-hover:block absolute left-[6rem] -top-20 mt-2 w-48 bg-gray-600 text-white shadow-lg rounded-xl">
            <div className="block my-1 px-8 hover:bg-gray-900 rounded-md">
              Service 1
            </div>
            <div className="block my-1 px-8 hover:bg-gray-900 rounded-md">
              Service 2
            </div>
            <div className="block my-1 px-8 hover:bg-gray-900 rounded-md">
              Service 3
            </div>
            <div className="block my-1 px-8 hover:bg-gray-900 rounded-md">
              Service 4
            </div>
            <div className="block my-1 px-8 hover:bg-gray-900 rounded-md">
              Service 5
            </div>
            <div className="block my-1 px-8 hover:bg-gray-900 rounded-md">
              Service 6
            </div>
          </div>
        </div>
      </div>
      <div>
        <div href="/contact" className="block p-2 hover:bg-gray-700 rounded">
          Contact
        </div>
      </div>
    </div>
  );
}

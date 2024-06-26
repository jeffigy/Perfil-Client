import { FunnelIcon } from "@heroicons/react/24/outline";

const TopBar = () => {
  return (
    <div className="flex items-center justify-center gap-2 lg:justify-end">
      <input
        type="text"
        placeholder="Find Patient"
        className="input input-bordered "
      />
      <div className="dropdown dropdown-end dropdown-bottom">
        <div tabIndex={0} role="button" className="btn btn-outline btn-sm">
          <FunnelIcon className=" mx-auto w-5" />
          <p className="hidden sm:block">Filter</p>
        </div>
        <ul
          tabIndex={0}
          className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
        >
          <li>
            <a>Newest</a>
          </li>
          <li>
            <a>Oldest</a>
          </li>
          <li>
            <a>A - Z</a>
          </li>
          <li>
            <a>Z - A</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TopBar;

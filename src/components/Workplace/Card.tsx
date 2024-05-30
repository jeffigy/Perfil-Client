import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";

const Card = () => {
  return (
    <div className=" card w-full bg-base-100 shadow transition-all hover:scale-[1.02]">
      <div className="card-body">
        <h2 className="card-title">Workplace name</h2>
        <p className="mb-5">workplace address</p>
        <div className="card-actions justify-between">
          <button className="btn btn-outline btn-primary btn-sm">
            Details
          </button>

          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-square btn-ghost btn-sm"
            >
              <EllipsisVerticalIcon />
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
              <li>
                <a>Item 2</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

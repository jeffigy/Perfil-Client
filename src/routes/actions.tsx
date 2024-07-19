import { PencilIcon, ShareIcon, TrashIcon } from "@heroicons/react/24/outline";

const actions = [
  {
    icon: <PencilIcon className="h-5 w-5" />,
    name: "Edit",
    onClick: () => alert("Edit action clicked"),
  },
  {
    icon: <TrashIcon className="h-5 w-5" />,
    name: "Delete",
    onClick: () => alert("Delete action clicked"),
  },
  {
    icon: <ShareIcon className="h-5 w-5" />,
    name: "Share",
    onClick: () => alert("Share action clicked"),
  },
];

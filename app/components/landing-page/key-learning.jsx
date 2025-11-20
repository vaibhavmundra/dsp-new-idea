import { CheckCircleIcon } from "@heroicons/react/24/outline";

export default function KeyLearnings({ learnings }) {
  return (
    <ul className="grid grid-cols-2 grid-rows-3">
      {learnings &&
        learnings.map((item) => {
          return (
            <li
              className="flex items-center p-5 border border-borderGrey/25"
              key={item.id}
            >
              <CheckCircleIcon className="w-6 text-orange" />
              {item.property}
            </li>
          );
        })}
    </ul>
  );
}

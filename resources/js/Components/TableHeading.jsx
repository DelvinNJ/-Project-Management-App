import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaFilterCircleXmark } from "react-icons/fa6";

export default function TableHeading({
    sortChange = () => { },
    filed_name,
    sortList = [],
    children
}) {
    return (
        <th scope="col" className="px-6 py-3 text-nowrap"
            onClick={(e) => sortChange(filed_name)}>
            <div className="flex items-center justify-around cursor-pointer">
                {children}
                <div>
                    <TiArrowSortedUp className={sortList.includes(filed_name) && 'text-neutral-600 dark:text-neutral-800'} />
                    <TiArrowSortedDown className={"-mt-1 " + (sortList.includes('-' + filed_name) && 'text-neutral-500 dark:text-neutral-800')} />
                </div>
            </div>

        </th>
    );
}
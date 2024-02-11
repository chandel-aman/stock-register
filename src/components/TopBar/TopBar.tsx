import { useSelector } from "react-redux";

import CaretDownFilledIcon from "../../assets/icons/CaretDownFilledIcon.icon";
import HelpIcon from "../../assets/icons/HelpIcon.icon";
import NotificationIcon from "../../assets/icons/NotificationIcon.icon";
import SearchIcon from "../../assets/icons/SearchIcon.icon";
import { RootState } from "../../redux/store";

const TopBar = () => {
  const activePage = useSelector((state: RootState) => state.page.activePage);

  return (
    <div className="px-8 py-3 flex justify-between items-center w-full border-b-2 absolute top-0 left-0 right-0">
      <div className="flex gap-4 items-center">
        <span className="text-sm">{activePage}</span>
        <span className="flex items-center gap-1 text-xs font-thin cursor-pointer">
          <HelpIcon />
          How it works
        </span>
      </div>
      <div className="bg-black bg-opacity-10 rounded-md flex gap-2 w-[400px] h-10 items-center px-4">
        <SearchIcon />
        <input
          type="text"
          className="bg-transparent outline-none border-none text-slate-500 text-sm w-full"
          placeholder="Search features, tutorials, etc."
        />
      </div>
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-black bg-opacity-10 flex items-center justify-center cursor-pointer">
          <NotificationIcon />
        </div>
        <div className="w-10 h-10 rounded-full bg-black bg-opacity-10 flex items-center justify-center cursor-pointer">
          <CaretDownFilledIcon />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

import SearchBar from "./SearchBar";
import Notifications from "./Notifications";
import AccountDropdownButton from "./AccountDropdownButton";

const SecondaryNavigationBar = ({ className }: { className?: string }) => {
  return (
    <div className={`flex items-center h-[30px] gap-2.5 ${className ?? ""}`}>
      <SearchBar />
      <Notifications />
      <AccountDropdownButton />
    </div>
  );
};

export default SecondaryNavigationBar;
